import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { registerAnonymous } from "api/user";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");

      if (token) {
        console.log("기존 유저 확인 - 홈으로 이동");
        router.replace("/(tabs)/home");
        return;
      }

      let anonymousId = await SecureStore.getItemAsync("anonymousId");

      if (!anonymousId) {
        console.log("최초 접속 - 로컬 익명 ID 생성");
        anonymousId = uuidv4();
        await SecureStore.setItemAsync("anonymousId", anonymousId);
        console.log("새로운 익명 ID 발급 완료");
      } else {
        console.log(`재접속 익명 유저(${anonymousId}) - 로컬 모드로 진입`);
      }

      await registerAnonymous(anonymousId);
      router.replace("/(tabs)/home");
    } catch (e) {
      console.error("로그인 실패:", e);
      router.replace("/(tabs)/home");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="items-center gap-4">
        <Text className="text-2xl font-bold text-black">Mark-it!</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </View>
  );
}
