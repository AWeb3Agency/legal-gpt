import { ChatInterface, ConfigInterface } from '@type/chat';
import useStore from '@store/store';

const date = new Date();
const dateString =
  date.getFullYear() +
  '-' +
  ('0' + (date.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + date.getDate()).slice(-2);


export const defaultChatConfig = (): ConfigInterface => {
  const currentmodel = useStore.getState().currentmodel;
  return {
    temperature: currentmodel.temperature,
    presence_penalty: currentmodel.presence_penalty,
    top_p: currentmodel.top_p,
    frequency_penalty: currentmodel.frequency_penalty
  };
};

export const generateDefaultChat = (title?: string): ChatInterface => {
  const currentmodel = useStore.getState().currentmodel;
  
  return {
    title: title ? title : 'New Chat',
    messages: currentmodel.model_messages,
    config: { ...defaultChatConfig() },
    titleSet: false,
  }
};

export const codeLanguageSubset = [
  'python',
  'javascript',
  'java',
  'go',
  'bash',
  'c',
  'cpp',
  'csharp',
  'css',
  'diff',
  'graphql',
  'json',
  'kotlin',
  'less',
  'lua',
  'makefile',
  'markdown',
  'objectivec',
  'perl',
  'php',
  'php-template',
  'plaintext',
  'python-repl',
  'r',
  'ruby',
  'rust',
  'scss',
  'shell',
  'sql',
  'swift',
  'typescript',
  'vbnet',
  'wasm',
  'xml',
  'yaml',
];
