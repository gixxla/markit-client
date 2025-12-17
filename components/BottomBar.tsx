import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import BookmarksIcon from "../assets/bookmarks-icon.svg";
import OfflineIcon from "../assets/offline-icon.svg";
// import AddBtn from "../assets/add-btn.svg";
// import AiBtn from "../assets/ai-btn.svg";

const CONTAINER_WIDTH = 216;
const MARGIN = 6;

export function BottomBar({ state, navigation }: BottomTabBarProps) {
  const TAB_WIDTH = CONTAINER_WIDTH / state.routes.length;
  const translateX = useRef(new Animated.Value(state.index * TAB_WIDTH)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      damping: 25,
      stiffness: 150,
      mass: 1,
    }).start();
  }, [state.index, TAB_WIDTH]);

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Animated.View
          style={[
            styles.activeBackground,
            {
              width: TAB_WIDTH - MARGIN * 2,
              transform: [{ translateX }],
            },
          ]}
        />
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const renderIcon = () => {
            if (route.name === "home") {
              return (
                <View className="items-center">
                  <BookmarksIcon width={32} height={32} color={isFocused ? "#AF282F" : "white"} />
                  <Text
                    className={`text-sm font-h1-font self-center mt-1 ${isFocused ? "text-mark-it" : "text-white"}`}
                  >
                    bookmarks
                  </Text>
                </View>
              );
            } else if (route.name === "offline") {
              return (
                <View className="items-center">
                  <OfflineIcon width={32} height={32} color={isFocused ? "#AF282F" : "white"} />
                  <Text className={`text-sm font-h1-font mt-1 ${isFocused ? "text-mark-it" : "text-white"}`}>
                    offline
                  </Text>
                </View>
              );
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
              style={[styles.tabItem, { width: TAB_WIDTH }]}
            >
              {renderIcon()}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 0,
    alignItems: "flex-start",
  },
  toggleContainer: {
    flexDirection: "row",
    width: CONTAINER_WIDTH,
    height: 72,
    backgroundColor: "#E8C999",
    borderRadius: 999,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  activeBackground: {
    position: "absolute",
    left: 0,
    height: 60,
    marginHorizontal: MARGIN,
    backgroundColor: "white",
    borderRadius: 999,
  },
  tabItem: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
