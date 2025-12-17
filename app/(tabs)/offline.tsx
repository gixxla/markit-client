import React, { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopBar } from "components/TopBar";
import type { TabType } from "components/TopBar";

export default function OfflineScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("tags");
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <SafeAreaView className="flex-1 items-strech bg-white">
      {/* 상단 네비게이션 */}
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} isScrolled={isScrolled} />
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-500">Offline Page</Text>
      </View>
    </SafeAreaView>
  );
}
