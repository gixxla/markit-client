import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { registerAsGuest } from "../api/user";

interface UserState {
  accessToken: string | null;
  isGuest: boolean;
  isLoading: boolean;

  checkLoginStatus: () => Promise<boolean>;
  loginAsGuest: () => Promise<void>;
  setToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  accessToken: null,
  isGuest: false,
  isLoading: true,

  checkLoginStatus: async () => {
    try {
      set({ isLoading: true });
      const token = await SecureStore.getItemAsync("accessToken");

      if (token) {
        set({ accessToken: token, isGuest: false, isLoading: false });
        return true;
      }

      const guestId = await SecureStore.getItemAsync("guestId");
      if (guestId) {
        set({ accessToken: null, isGuest: true, isLoading: false });
        registerAsGuest(guestId).catch(() => {});
        return true;
      }

      set({ accessToken: null, isGuest: false, isLoading: false });
      return false;
    } catch (e) {
      set({ accessToken: null, isLoading: false });
      return false;
    }
  },

  loginAsGuest: async () => {
    try {
      set({ isLoading: true });

      let guestId = await SecureStore.getItemAsync("guestId");
      if (!guestId) {
        guestId = uuidv4();
        await SecureStore.setItemAsync("guestId", guestId);
      }

      await registerAsGuest(guestId);

      set({ isGuest: true, accessToken: null, isLoading: false });
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  setToken: async (token: string) => {
    await SecureStore.setItemAsync("accessToken", token);
    await SecureStore.deleteItemAsync("guestId");
    set({ accessToken: token, isGuest: false });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("guestId");
    set({ accessToken: null, isGuest: false });
  },
}));
