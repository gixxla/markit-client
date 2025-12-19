import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "../store/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { LargeButton } from "components/LargeButton";

export default function Index() {
  const router = useRouter();

  const { checkLoginStatus, loginAsGuest, isLoading } = useUserStore();

  useEffect(() => {
    const init = async () => {
      const isLoggedIn = await checkLoginStatus();
      if (isLoggedIn) {
        console.log("자동 로그인 성공 - 홈으로 이동");
        router.replace("/(tabs)/home");
      }
    };
    init();
  }, []);

  const handleGuestLogin = async () => {
    try {
      await loginAsGuest();
      console.log("게스트 로그인 - 홈으로 이동");
      router.replace("/(tabs)/home");
    } catch (e) {
      console.error("게스트 로그인 에러", e);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <View className="items-center gap-4">
          <Text className="text-2xl font-bold text-mark-it">Mark-it!</Text>
          <ActivityIndicator size="large" color="#AF282F" />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center p-6 bg-white">
      {/* 로고 및 슬로건 영역 */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-4xl font-bold text-mark-it mb-2">Mark-it!</Text>
        <Text className="text-gray-500 font-h1-font">나만의 북마크 관리자</Text>
      </View>

      {/* 버튼 영역 */}
      <View className="w-full gap-4">
        <LargeButton
          title="회원가입"
          bgColor="bg-white"
          textColor="text-mark-it"
          borderColor="border-mark-it"
          onPress={() => router.push("/auth/signup")}
        />
        <LargeButton
          title="로그인"
          bgColor="bg-mark-it"
          textColor="text-white"
          onPress={() => router.push("/auth/login")}
        />

        <TouchableOpacity className="items-center" onPress={handleGuestLogin}>
          <Text className="text-mark-it text-lg font-h2-bold-font">로그인 없이 사용할게요</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
