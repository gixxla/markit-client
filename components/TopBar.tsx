import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

import SettingIcon from "../assets/setting-icon.svg";
import TagIcon from "../assets/tag-icon.svg";
import CategoryIcon from "../assets/category-icon.svg";

export type TabType = "tags" | "categories";

interface TopBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isScrolled: boolean;
}

const CONTAINER_WIDTH = 160;
const TAB_WIDTH = CONTAINER_WIDTH / 2;

export function TopBar({ activeTab, onTabChange, isScrolled }: TopBarProps) {
  const translateX = useRef(new Animated.Value(activeTab === "tags" ? 0 : TAB_WIDTH)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeTab === "tags" ? 0 : TAB_WIDTH,
      useNativeDriver: true,
      damping: 50,
      stiffness: 150,
      mass: 1,
    }).start();
  }, [activeTab]);

  return (
    <View className="px-5 pt-5 pb-2 bg-white z-10" style={[isScrolled && styles.borderBottom]}>
      <View className="flex-row items-center justify-center ">
        {/* 토글 버튼 그룹 */}
        <View style={styles.toggleContainer}>
          <Animated.View
            style={[
              styles.activeBackground,
              {
                transform: [{ translateX }],
              },
            ]}
          />
          {/* Tags 버튼 */}
          <TouchableOpacity
            onPress={() => onTabChange("tags")}
            activeOpacity={0.8}
            style={[styles.tabButton, activeTab === "tags" && styles.activeTab]}
          >
            <TagIcon width={18} height={18} color={activeTab === "tags" ? "#AF282F" : "#858585"} />
            {activeTab === "tags" && (
              <Text className={`text-lg font-h0-font ${activeTab === "tags" ? "text-mark-it" : "text-gray-400"}`}>
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
            <CategoryIcon width={18} height={18} color={activeTab === "categories" ? "#AF282F" : "#858585"} />
            {activeTab === "categories" && (
              <Text className={`text-lg font-h0-font ${activeTab === "categories" ? "text-mark-it" : "text-gray-400"}`}>
                Categories
              </Text>
            )}
          </TouchableOpacity>
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
  toggleContainer: {
    flexDirection: "row",
    width: CONTAINER_WIDTH,
    height: 40,
    backgroundColor: "white",
    borderRadius: 999,
    position: "relative",
  },
  activeBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: TAB_WIDTH,
    backgroundColor: "#F7EAEA",
    borderRadius: 999,
  },
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
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
});
