import React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../components/ToastConfig";

export default function AuthLayout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
        {/* 회원가입 */}
        <Stack.Screen name="email-signup" />
        <Stack.Screen name="email-signup-verify" />
        <Stack.Screen name="email-signup-success" />
        {/* 로그인 입력 */}
        <Stack.Screen name="email-login" />
      </Stack>
      <Toast config={toastConfig} />
    </View>
  );
}
