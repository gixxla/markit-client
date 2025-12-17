import React from "react";
import { Tabs } from "expo-router";
import { BottomBar } from "../../components/BottomBar";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <BottomBar {...props} />}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="offline" />
    </Tabs>
  );
}
