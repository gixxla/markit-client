import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { registerAnonymous } from "../api/user";

interface UserState {
  userToken: string | null;
  isGuest: boolean;
  isLoading: boolean;

  checkLoginStatus: () => Promise<boolean>;
  loginAsGuest: () => Promise<void>;
  setToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  userToken: null,
  isGuest: false,
  isLoading: true,

  checkLoginStatus: async () => {
    try {
      set({ isLoading: true });
      const token = await SecureStore.getItemAsync("accessToken");

      if (token) {
        set({ userToken: token, isGuest: false, isLoading: false });
        return true;
      }

      const anonymousId = await SecureStore.getItemAsync("anonymousId");
      if (anonymousId) {
        set({ userToken: null, isGuest: true, isLoading: false });
        registerAnonymous(anonymousId).catch(() => {});
        return true;
      }

      set({ userToken: null, isGuest: false, isLoading: false });
      return false;
    } catch (e) {
      console.error("Login Check Failed", e);
      set({ userToken: null, isLoading: false });
      return false;
    }
  },

  loginAsGuest: async () => {
    try {
      set({ isLoading: true });

      let anonymousId = await SecureStore.getItemAsync("anonymousId");
      if (!anonymousId) {
        anonymousId = uuidv4();
        await SecureStore.setItemAsync("anonymousId", anonymousId);
      }

      await registerAnonymous(anonymousId);

      set({ isGuest: true, userToken: null, isLoading: false });
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  setToken: async (token: string) => {
    await SecureStore.setItemAsync("accessToken", token);
    await SecureStore.deleteItemAsync("anonymousId");
    set({ userToken: token, isGuest: false });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("anonymousId");
    set({ userToken: null, isGuest: false });
  },
}));
