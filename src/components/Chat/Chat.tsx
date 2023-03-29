import React, { useEffect, useState } from 'react';
import useStore from '@store/store';

import ChatContent from './ChatContent';
import MobileBar from '../MobileBar';
import StopGeneratingButton from '@components/StopGeneratingButton/StopGeneratingButton';
import useInitialiseNewChat from '@hooks/useInitialiseNewChat';
import useSaveToLocalStorage from '@hooks/useSaveToLocalStorage';
import { ChatInterface } from '@type/chat';
import { Theme } from '@type/theme';

const Chat = (model: any, subscription: any, docs: any) => {
  // here we have all the model's configuration
  const setCurrentModel = useStore((state) => state.setCurrentModel);
  
  // TODO: fix object
  setCurrentModel(model.model);
  // console.log(model);
  useSaveToLocalStorage();
  
  const initialiseNewChat = useInitialiseNewChat();
  const setChats = useStore((state) => state.setChats);
  const setTheme = useStore((state) => state.setTheme);
  const setApiKey = useStore((state) => state.setApiKey);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  // clean up chats before initializing
  // TODO: figure out how to handle multiple rooms

  useEffect(() => {
    // legacy local storage
    const oldChats = localStorage.getItem(`chats_${model.model.id}`) as any;
    const apiKey = localStorage.getItem('apiKey');
    const theme = localStorage.getItem('theme');

    if (apiKey) {
      // legacy local storage
      setApiKey(apiKey);
      localStorage.removeItem('apiKey');
    }

    if (theme) {
      // legacy local storage
      setTheme(theme as Theme);
      localStorage.removeItem('theme');
    }

    // legacy local storage
    try {
      const chats: ChatInterface[] = JSON.parse(oldChats);
      if (chats?.length > 0) {
        setChats(chats);
        setCurrentChatIndex(0);
      } else {
        initialiseNewChat();
      }
    } catch (e: unknown) {
      console.log(e);
      initialiseNewChat();
    }
  }, []);

  return (
    <div className='flex h-full flex-1 flex-col md:pl-[260px]'>
      <MobileBar />
      <main className='relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1'>
        <ChatContent />
        <StopGeneratingButton />
      </main>
    </div>
  );
};

export default Chat;
