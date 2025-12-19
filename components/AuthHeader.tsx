import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import BackBtn from "../assets/back-btn.svg";
import CloseBtn from "../assets/close-btn.svg";

interface Props {
  type?: "close" | "back";
}

export function AuthHeader({ type = "back" }: Props) {
  const router = useRouter();

  return (
    <View className="h-20 items-center relative justify-center">
      <View className="absolute top-3 w-16 h-1.5 bg-gray-200 rounded-full" />
      <View className={`flex-1 flex-row w-full items-end ${type === "close" ? "justify-end" : "justify-start"}`}>
        <TouchableOpacity onPress={() => (type === "close" ? router.dismiss() : router.back())} activeOpacity={0.7}>
          {type === "close" ? <CloseBtn width={36} height={36} /> : <BackBtn width={36} height={36} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}
