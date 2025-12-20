import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { SvgProps } from "react-native-svg";

interface ButtonProps {
  Icon?: React.FC<SvgProps>;
  title: string;
  onPress: () => void;
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

export const LargeButton = ({
  Icon,
  title,
  onPress,
  disabled = false,
  bgColor = "bg-white",
  textColor = "text-black",
  borderColor = "border-transparent",
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      className={`flex-row items-center justify-center w-full h-16 border-2 rounded-full ${bgColor} ${borderColor}`}
    >
      {Icon && (
        <View className="absolute left-6">
          <Icon width={24} height={24} />
        </View>
      )}
      <Text className={`text-xl font-btn-font ${textColor}`}>{title}</Text>
    </TouchableOpacity>
  );
};
