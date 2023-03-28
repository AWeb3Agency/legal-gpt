import { ConfigInterface, MessageInterface } from '@type/chat';

export const endpoint_embedding = 'https://api.openai.com/v1/embeddings';

export const getChatCompletion = async (
  endpoint: string,
  messages: MessageInterface[],
  config: ConfigInterface
) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      ...config,
    }),
  });
  if (!response.ok) throw new Error(await response.text());

  const data = await response.json();
  return data;
};

export const getChatCompletionStream = async (
  endpoint: string,
  messages: MessageInterface[],
  config: ConfigInterface
) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      ...config,
      stream: true,
    }),
  });
  if (response.status === 404 || response.status === 405)
    throw new Error(
      'Message from freechatgpt.chat:\nInvalid API endpoint! We recommend you to check your free API endpoint.'
    );

  if (response.status === 429 || !response.ok) {
    const text = await response.text();
    let error = text;
    if (text.includes('insufficient_quota')) {
      error +=
        '\nMessage from freechatgpt.chat:\nToo many request! We recommend changing your API endpoint or API key';
    }
    throw new Error(error);
  }

  const stream = response.body;
  return stream;
};

export const getChatEmbedding = async (
  apiKey: string,
  input: string
) => {
  const response = await fetch(endpoint_embedding, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-embedding-ada-002",
      input
    }),
  });
  if (!response.ok) throw new Error(await response.text());

  const data = await response.json();
  return data;
};