import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import SettingIcon from "../assets/setting-icon.svg";
import TagIcon from "../assets/tag-icon.svg";
import CategoryIcon from "../assets/category-icon.svg";

export type TabType = "tags" | "categories";

interface TopBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TopBar({ activeTab, onTabChange }: TopBarProps) {
  return (
    <View className="px-5 pt-5 pb-2 border-b border-grey-5 bg-white z-10">
      <View className="flex-row justify-between items-center">
        {/* 토글 버튼 그룹 */}
        <View className="flex-1 flex-row justify-center">
          <View className="flex-row bg-white rounded-full ">
            {/* Tags 버튼 */}
            <TouchableOpacity
              onPress={() => onTabChange("tags")}
              activeOpacity={0.8}
              style={[styles.tabButton, activeTab === "tags" && styles.activeTab]}
            >
              <TagIcon color={activeTab === "tags" ? "#AF282F" : "#858585"} />
              {activeTab === "tags" && (
                <Text className={`text-xl font-btn-font ${activeTab === "tags" ? "text-mark-it" : "text-gray-400"}`}>
                  Tags
                </Text>
              )}
            </TouchableOpacity>

            {/* Categories 버튼 */}
            <TouchableOpacity
              onPress={() => onTabChange("categories")}
              activeOpacity={0.8}
              style={[styles.tabButton, activeTab === "categories" && styles.activeTab]}
            >
              <CategoryIcon color={activeTab === "categories" ? "#AF282F" : "#858585"} />
              {activeTab === "categories" && (
                <Text
                  className={`text-xl font-btn-font ${activeTab === "categories" ? "text-mark-it" : "text-gray-400"}`}
                >
                  Categories
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* 설정 아이콘 (우측 고정) */}
        <TouchableOpacity className="absolute right-2">
          <SettingIcon width={24} height={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 9999,
  },
  activeTab: {
    backgroundColor: "#F7EAEA",
  },
});
