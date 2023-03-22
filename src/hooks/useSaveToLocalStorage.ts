import React, { useEffect, useRef } from 'react';
import useStore from '@store/store';
import { useParams } from 'react-router-dom';

const useSaveToLocalStorage = () => {
  const chatsRef = useRef(useStore.getState().chats);
  let { chatId } = useParams();

  useEffect(() => {
    const unsubscribe = useStore.subscribe((state) => {
      if (chatsRef && chatsRef.current !== state.chats) {
        chatsRef.current = state.chats; 
        localStorage.setItem(`chats_${chatId}`, JSON.stringify(state.chats));
        // console.log('saving',`chats_${chatId}`);
      }
    });

    return unsubscribe;
  }, []);
};

export default useSaveToLocalStorage;
