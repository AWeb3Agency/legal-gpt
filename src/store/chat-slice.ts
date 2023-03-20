import { StoreSlice } from './store';
import { ChatInterface, MessageInterface } from '@type/chat';

export interface ChatSlice {
  messages: MessageInterface[];
  chats?: ChatInterface[];
  currentChatIndex: number;
  generating: boolean;
  currentmodel: any;
  error: string;
  setMessages: (messages: MessageInterface[]) => void;
  setChats: (chats: ChatInterface[]) => void;
  setCurrentChatIndex: (currentChatIndex: number) => void;
  setCurrentModel: (currentmodel: any) => void;
  setGenerating: (generating: boolean) => void;
  setError: (error: string) => void;
}

export const createChatSlice: StoreSlice<ChatSlice> = (set, get) => ({
  messages: [],
  currentmodel: '',
  currentChatIndex: -1,
  generating: false,
  error: '',
  setMessages: (messages: MessageInterface[]) => {
    set((prev: ChatSlice) => ({
      ...prev,
      messages: messages,
    }));
  },
  setChats: (chats: ChatInterface[]) => {
    set((prev: ChatSlice) => ({
      ...prev,
      chats: chats,
    }));
  },
  setCurrentModel: (currentmodel: number) => {
    set((prev: ChatSlice) => ({
      ...prev,
      currentmodel: currentmodel
    }));
  },
  setCurrentChatIndex: (currentChatIndex: number) => {
    set((prev: ChatSlice) => ({
      ...prev,
      currentChatIndex: currentChatIndex,
    }));
  },
  setGenerating: (generating: boolean) => {
    set((prev: ChatSlice) => ({
      ...prev,
      generating: generating,
    }));
  },
  setError: (error: string) => {
    set((prev: ChatSlice) => ({
      ...prev,
      error: error,
    }));
  },
});
