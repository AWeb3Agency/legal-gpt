import { defaultAPIEndpoint } from '@constants/auth';
import { StoreSlice } from './store';

export interface AuthSlice {
  user?: {},
  apiKey?: string;
  apiFree: boolean;
  apiEndpoint: string;
  setApiKey: (apiKey: string) => void;
  setApiFree: (apiFree: boolean) => void;
  setApiEndpoint: (apiEndpoint: string) => void;
}

export const createAuthSlice: StoreSlice<AuthSlice> = (set, get) => ({
  user: {},
  apiFree: true,
  apiEndpoint: defaultAPIEndpoint,
  setApiKey: (apiKey: string) => {
    set((prev: AuthSlice) => ({
      ...prev,
      apiKey: apiKey,
    }));
  },
  setApiFree: (apiFree: boolean) => {
    set((prev: AuthSlice) => ({
      ...prev,
      apiFree: apiFree,
    }));
  },
  setApiEndpoint: (apiEndpoint: string) => {
    set((prev: AuthSlice) => ({
      ...prev,
      apiEndpoint: apiEndpoint,
    }));
  },
  setUser: (user: {}) => {
    set((prev: AuthSlice) => ({
      ...prev,
      user: user,
    }));
  },
});
