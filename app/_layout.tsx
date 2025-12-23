import "../global.css";
import React, { useCallback } from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FONTS } from "constants/fonts";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/ToastConfig";
import { useUserStore } from "../store/userStore";
import client from "../api/client";
import { AxiosError } from "axios";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts(FONTS);
  const { accessToken, setToken, logout } = useUserStore();

  const refreshSession = useCallback(async () => {
    if (!accessToken) return;

    try {
      const response = await client.post("/auth/refresh");

      if (response.data.accessToken) {
        await setToken(response.data.accessToken);
        console.log("세션이 성공적으로 연장되었습니다.");
      }
    } catch (e) {
      console.error("세션 갱신 실패", e);

      if (e instanceof AxiosError && e.response?.status === 401) {
        console.log("유효하지 않은 토큰입니다. 로그아웃 처리합니다.");
        logout();
      } else {
        console.log("네트워크 오류 등. 기존 세션을 유지하고 오프라인 모드로 진입합니다.");
      }
    }
  }, [accessToken, setToken, logout]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      refreshSession();
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, refreshSession]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View className="flex-1" onLayout={onLayoutRootView}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />

          <Stack.Screen
            name="auth"
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />
        </Stack>
        <Toast config={toastConfig} />
      </View>
    </SafeAreaProvider>
  );
}
