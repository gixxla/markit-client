import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
      <Stack.Screen name="email-signup" />
      <Stack.Screen name="email-login" />
    </Stack>
  );
}
