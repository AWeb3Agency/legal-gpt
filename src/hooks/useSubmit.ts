import React from 'react';
import useStore from '@store/store';
import { ChatInterface, MessageInterface } from '@type/chat';
import { getChatCompletion, getChatCompletionStream, getChatEmbedding } from '@api/api';
import { parseEventSource } from '@api/helper';
import { limitMessageTokens } from '@utils/messageUtils';
import { defaultChatConfig } from '@constants/chat';
import GPT3Tokenizer from 'gpt3-tokenizer';

// @ts-ignore
import { supabase } from '../utils/supabaseClient'

const useSubmit = () => {
  const error = useStore((state) => state.error);
  const setError = useStore((state) => state.setError);
  const apiFree = useStore((state) => state.apiFree);
  const apiKey = useStore((state) => state.apiKey);
  const setGenerating = useStore((state) => state.setGenerating);
  const generating = useStore((state) => state.generating);
  const currentChatIndex = useStore((state) => state.currentChatIndex);
  const setChats = useStore((state) => state.setChats);
  const currentmodel = useStore((state) => state.currentmodel);
  
  const generateTitle = async (
    message: MessageInterface[]
  ): Promise<string> => {
    let data;
    if (apiFree) {
      data = await getChatCompletion(
        useStore.getState().apiEndpoint,
        message,
        defaultChatConfig()
      );
    } else if (apiKey) {
      data = await getChatCompletion(
        useStore.getState().apiEndpoint,
        message,
        defaultChatConfig(),
        apiKey
      );
    }
    return data.choices[0].message.content;
  };

  function getUniqueValues(array: any, property: any) {
    const uniqueValues = [];
    const seenValues = new Set();
    for (const obj of array) {
      const value = obj[property];
      if (!seenValues.has(value)) {
        seenValues.add(value);
        uniqueValues.push(value);
      }
    }
    return uniqueValues;
  }  

  const handleSubmit = async () => {
    const chats = useStore.getState().chats;
    if (generating || !chats) return;

    const updatedChats: ChatInterface[] = JSON.parse(JSON.stringify(chats));

    updatedChats[currentChatIndex].messages.push({
      role: 'assistant',
      content: '',
    });

    setChats(updatedChats);
    setGenerating(true); 

    try {
      let stream;
      let messages = limitMessageTokens(
        chats[currentChatIndex].messages,
        4000
      ) as any;
      if (messages.length === 0) throw new Error('Message exceed max token!');

      // currentmodel.free: 3
      // currentmodel.basic: 1
      // currentmodel.premium: 2
      if (currentmodel.plan === 1){
        // here we need to get the vectors
        const lastComment = messages.slice(-1).pop()
              
        // Generate a one-time embedding for the query itself
        const embeddingResponse = await getChatEmbedding(apiKey || '', lastComment?.content || '')
        // console.log(embeddingResponse);

        const [{ embedding }] = embeddingResponse.data

        // In production we should handle possible errors
        const { data: documents } = await supabase.rpc("match_documents", {
          query_embedding: embedding,
          similarity_threshold: 0.6, // Choose an appropriate threshold for your data
          match_count: 25, // Choose the number of matches
        })

        console.log(documents);

        const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
        let tokenCount = 0
        let contextText = ''

        // Concat matched documents
        for (let i = 0; i < documents.length; i++) {
          const document = documents[i]
          const content = document.content
          const docRef = document.document
          const encoded = tokenizer.encode(content)
          tokenCount += encoded.text.length

          // Limit context to max 1500 tokens (configurable)
          if (tokenCount > 1500) {
            break
          }

          contextText += `content: ${content.trim()}\n---\ndocument: https://cvggmccajkyxxruselro.supabase.co/storage/v1/object/public/legal-gpt/asistente-legal/${docRef}\n---\n`
        }

        const full_message = `
          ${currentmodel.default_system_message}
          ${contextText}

          Pregunta: """
          ${lastComment?.content}
          """
        `
        const prompt = [{
          role: 'user',
          content: full_message
        }];

        // remove assistant responses
        const cleanAssistentRes = messages.filter((m: any)=> !m.content.includes("Lo siento"))
        
        // remove responses that are the same
        const removeDuplicates = (cleanAssistentRes: any) => Array.from(new Set(cleanAssistentRes.map(JSON.stringify))).map((i:any) => JSON.parse(i));
        
        if (removeDuplicates(cleanAssistentRes).length > 10){
          // limit context to last 5 prompts (due to token limits)
          const limit_context_prompts = 5;
          const firstTrim = (messages:any, limit_context_prompts: number) => messages.length > limit_context_prompts ? messages.slice(0,limit_context_prompts) : messages;
          console.log(messages, messages.slice(0,limit_context_prompts));
          
          const lastTrim = (messages:any, limit_context_prompts: number) => messages.length > limit_context_prompts ? messages.slice(-limit_context_prompts) : messages;
          console.log(firstTrim(messages, limit_context_prompts), lastTrim(messages, limit_context_prompts), messages);
          // override messages
          messages = [
            ...firstTrim(removeDuplicates(cleanAssistentRes), limit_context_prompts), 
            ...lastTrim(removeDuplicates(cleanAssistentRes), limit_context_prompts),
            ...prompt
          ];
        } else {
          // override messages
          messages = [
            ...removeDuplicates(cleanAssistentRes),
            ...prompt
          ]
        }
        console.log(messages);
      }

      if (apiFree) {
        stream = await getChatCompletionStream(
          useStore.getState().apiEndpoint,
          messages,
          chats[currentChatIndex].config
        );
      } else if (apiKey) {
        stream = await getChatCompletionStream(
          useStore.getState().apiEndpoint,
          messages,
          chats[currentChatIndex].config,
          apiKey
        );
      } else {
        throw new Error('No API key supplied! Please check your API settings.');
      }

      if (stream) {
        if (stream.locked)
          throw new Error(
            'Oops, the stream is locked right now. Please try again'
          );
        const reader = stream.getReader();
        let reading = true;
        while (reading && useStore.getState().generating) {
          const { done, value } = await reader.read();

          const result = parseEventSource(new TextDecoder().decode(value));

          if (result === '[DONE]' || done) {
            reading = false;
          } else {
            const resultString = result.reduce((output: string, curr) => {
              if (typeof curr === 'string') return output;
              else {
                const content = curr.choices[0].delta.content;
                if (content) output += content;
                return output;
              }
            }, '');

            const updatedChats: ChatInterface[] = JSON.parse(
              JSON.stringify(useStore.getState().chats)
            );
            const updatedMessages = updatedChats[currentChatIndex].messages;
            updatedMessages[updatedMessages.length - 1].content += resultString;
            setChats(updatedChats);
          }
        }
        if (useStore.getState().generating) {
          reader.cancel('Cancelled by user');
        } else {
          reader.cancel('Generation completed');
        }
        reader.releaseLock();
        stream.cancel();
      }

      // generate title for new chats
      const currChats = useStore.getState().chats;
      if (
        useStore.getState().autoTitle &&
        currChats &&
        !currChats[currentChatIndex]?.titleSet
      ) {
        const messages_length = currChats[currentChatIndex].messages.length;
        const assistant_message =
          currChats[currentChatIndex].messages[messages_length - 1].content;
        const user_message =
          currChats[currentChatIndex].messages[messages_length - 2].content;

        const message: MessageInterface = {
          role: 'user',
          content: `Generate a title in less than 6 words for the following message:\nUser: ${user_message}\nAssistant: ${assistant_message}`,
        };

        let title = (await generateTitle([message])).trim();
        if (title.startsWith('"') && title.endsWith('"')) {
          title = title.slice(1, -1);
        }
        const updatedChats: ChatInterface[] = JSON.parse(
          JSON.stringify(useStore.getState().chats)
        );
        updatedChats[currentChatIndex].title = title;
        updatedChats[currentChatIndex].titleSet = true;
        setChats(updatedChats);
      }
    } catch (e: unknown) {
      const err = (e as Error).message;
      console.log(err);
      setError(err);
    }
    setGenerating(false);
  };

  return { handleSubmit, error };
};


export default useSubmit;
