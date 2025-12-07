import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { registerAnonymous } from "api/user";
import { FONTS } from "../constants/fonts";

// 스플래시 스크린을 명시적으로 관리
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts(FONTS);

  useEffect(() => {
    const initializeApp = async () => {
      if (!fontsLoaded && !fontError) {
        return;
      }

      try {
        // 사용자 초기화
        let anonymousId = await SecureStore.getItemAsync("anonymousId");

        if (!anonymousId) {
          anonymousId = uuidv4();
          await SecureStore.setItemAsync("anonymousId", anonymousId);
        }

        await registerAnonymous(anonymousId);

        await SplashScreen.hideAsync();
        if (!router.canGoBack()) {
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.error("Initialization failed:", error);
        await SplashScreen.hideAsync();
        if (!router.canGoBack()) {
          router.replace("/(tabs)/home");
        }
      }
    };

    initializeApp();
  }, [fontsLoaded, fontError, router]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16 }}>폰트 로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 16 }}>초기화 중...</Text>
    </View>
  );
}
