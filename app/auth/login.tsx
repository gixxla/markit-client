import { useRouter } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useUserStore } from "../../store/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthHeader } from "components/AuthHeader";
import { LargeButton } from "components/LargeButton";

import AppleIcon from "../../assets/apple-icon.svg";
import GoogleIcon from "../../assets/google-icon.svg";
import EmailIcon from "../../assets/email-icon.svg";

export default function LoginScreen() {
  const router = useRouter();
  const { loginAsGuest } = useUserStore();

  const handleGuestLogin = async () => {
    try {
      await loginAsGuest();
      console.log("게스트 로그인 - 홈으로 이동");
      router.replace("/(tabs)/home");
    } catch (e) {
      console.error("게스트 로그인 에러", e);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center px-6 pb-6 gap-32 bg-white">
      <AuthHeader type="close" />
      <Text className="flex-1 text-5xl font-btn-font leading-tight">돌아오신 걸 환영해요!</Text>
      <View className="w-full px-2 gap-4">
        <LargeButton
          title="Apple로 로그인"
          bgColor="bg-black"
          textColor="text-white"
          Icon={AppleIcon}
          onPress={() => router.push("/auth/email-login")}
        />
        <LargeButton
          title="Google로 로그인"
          bgColor="bg-grey-5"
          textColor="text-black"
          Icon={GoogleIcon}
          onPress={() => router.push("/auth/email-login")}
        />
        <LargeButton
          title="이메일로 로그인"
          bgColor="bg-mark-it"
          textColor="text-white"
          Icon={EmailIcon}
          onPress={() => router.push("/auth/email-login")}
        />
        <TouchableOpacity className="items-center" onPress={handleGuestLogin}>
          <Text className="text-mark-it text-lg font-h2-bold-font">로그인 없이 사용할게요</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
