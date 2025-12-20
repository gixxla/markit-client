import React from "react";
import { View, Text } from "react-native";
import type { ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  success: ({ text1 }) => (
    <View className="w-fit max-w-[90%] bg-white/80 px-5 py-4 rounded-full flex-row items-center shadow-lg shadow-gray-300">
      <View className="w-4 h-4 bg-green-300 rounded-full mr-4" />

      <View className="w-fit">
        <Text className="font-h2-bold-font text-lg leading-tight">{text1}</Text>
      </View>
    </View>
  ),

  error: ({ text1 }) => (
    <View className="w-fit max-w-[90%] bg-white/70 px-5 py-4 rounded-full flex-row items-center shadow-lg border border-red-100">
      <View className="w-4 h-4 bg-mark-it rounded-full mr-4" />

      <View className="w-fit">
        <Text className="font-h2-bold-font text-lg leading-tight">{text1}</Text>
      </View>
    </View>
  ),

  info: ({ text1 }) => (
    <View className="w-fit max-w-[90%] bg-white/70 px-5 py-4 rounded-full flex-row items-center shadow-lg border border-gray-100">
      <View className="w-4 h-4 bg-blue-400 rounded-full mr-4" />

      <View className="w-fit">
        <Text className="font-h2-bold-font text-lg leading-tight">{text1}</Text>
      </View>
    </View>
  ),
};
