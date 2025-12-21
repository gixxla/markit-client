import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000/api" : "http://192.168.219.107:3000/api";

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("토큰 만료! 로그아웃 처리합니다.");
      await SecureStore.deleteItemAsync("accessToken");
      router.replace("/");
    }
    return Promise.reject(error);
  },
);

export default client;
