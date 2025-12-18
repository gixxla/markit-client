import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AddBtn from "../assets/add-btn.svg";
import AIBtn from "../assets/ai-btn.svg";

export function ActionButtons() {
  return (
    <View style={styles.container}>
      {/* 1. 위쪽: Add 버튼 (메인) */}
      <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("Add Pressed")} style={styles.buttonWrapper}>
        <AddBtn width={72} height={72} />
      </TouchableOpacity>

      {/* 2. 아래쪽: AI 버튼 */}
      <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("AI Pressed")} style={styles.buttonWrapper}>
        <AIBtn width={72} height={72} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
  },
  buttonWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
});
