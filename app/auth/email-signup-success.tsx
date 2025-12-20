import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthHeader } from "../../components/AuthHeader";
import { LargeButton } from "components/LargeButton";

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 items-strech px-6 gap-10 bg-white" edges={["top", "left", "right"]}>
      <AuthHeader type="close" />
      <View style={{ flexGrow: 1, paddingBottom: Math.max(insets.bottom + 12, 32) }}>
        <View className="flex-1 gap-4">
          <Text className="text-5xl font-btn-font leading-tight">회원가입이 {"\n"}완료되었습니다.</Text>
          <Text className="text-grey-1 text-lg">버튼을 눌러 시작해보세요.</Text>
        </View>
        <View className="w-full p-2">
          <LargeButton
            title="시작하기"
            bgColor="bg-mark-it"
            textColor="text-white"
            onPress={() => router.replace("/(tabs)/home")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
