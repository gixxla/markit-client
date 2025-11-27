import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000/api" : "http://localhost:3000/api";

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

export default client;
