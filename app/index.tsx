import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { registerAnonymous } from "api/user";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        let anonymousId = await SecureStore.getItemAsync("anonymousId");

        if (!anonymousId) {
          anonymousId = uuidv4();
          await SecureStore.getItemAsync("anonymousId");
        } else {
          await registerAnonymous(anonymousId);
        }

        router.replace("/(tab)/home");
      } catch (error) {
        console.error("Initialization failed:", error);
        router.replace("/(main)/home");
      }
    };

    initializeUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Expo Router 시작</Text>
    </View>
  );
}
