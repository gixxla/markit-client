import React, { useState } from "react";
import type { TextInputProps } from "react-native";
import { View, Text, TextInput, Platform } from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function InputField({ label, error, className, ...props }: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full gap-1">
      {/* 라벨 */}
      {label && <Text className="text-lg text-grey-1 font-h2-font">{label}</Text>}

      {/* 입력 창 */}
      <View
        className={`
          w-full border-b flex-row items-center
          ${error ? "border-mark-it" : isFocused ? "border-mark-it" : "border-grey-2"}
          ${className} 
        `}
      >
        <TextInput
          placeholderTextColor="#B3B3B3"
          className="
            w-full py-3 text-2xl font-h2-light-font leading-tight"
          style={Platform.OS === "android" ? { includeFontPadding: false, textAlignVertical: "center" } : undefined}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
      </View>

      {/* 에러 메세지 */}
      {error ? <Text className="text-mark-it text-sm font-h2-font mt-1">{error}</Text> : null}
    </View>
  );
}
