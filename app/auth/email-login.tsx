import React, { useEffect, useRef, useState } from "react";
import type { TextInput } from "react-native";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { InputField } from "../../components/InputField";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthHeader } from "../../components/AuthHeader";
import { LargeButton } from "components/LargeButton";
import client from "api/client";
import { AxiosError } from "axios";
import { useUserStore } from "store/userStore";
import Toast from "react-native-toast-message";

export default function EmailSignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setToken } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const handleKeyboardAnimation = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, handleKeyboardAnimation);
    const hideSubscription = Keyboard.addListener(hideEvent, handleKeyboardAnimation);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const response = await client.post("/auth/login", { email, password });

      if (response.data.accessToken) {
        await setToken(response.data.accessToken);
        console.log("로그인 성공! 홈으로 이동합니다.");

        router.replace("/(tabs)/home");
      }
    } catch (e) {
      console.error("로그인 실패", e);

      if (e instanceof AxiosError) {
        const message = e.response?.data?.message;
        const status = e.response?.status;

        if (status === 400 || status === 401) {
          if (message === "잘못된 이메일입니다." || message?.includes("이메일")) {
            setEmailError("가입되지 않은 이메일입니다.");
            setPasswordError("");
          } else if (message === "비밀번호가 일치하지 않습니다." || message?.includes("비밀번호")) {
            setEmailError("");
            setPasswordError("비밀번호가 일치하지 않습니다.");
          } else {
            setPasswordError("이메일 또는 비밀번호를 확인해주세요.");
          }
        } else {
          Toast.show({
            type: "error",
            text1: "잠시 후 다시 시도해주세요.",
            position: "bottom",
            visibilityTime: 2000,
            bottomOffset: 90,
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const isButtonEnabled = email.length > 0 && password.length > 0;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 items-strech px-6 gap-10 bg-white" edges={["top", "left", "right"]}>
        <AuthHeader type="back" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, gap: 40, paddingBottom: Math.max(insets.bottom + 12, 32) }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text className="text-4xl font-btn-font">기존 계정으로 시작하기</Text>
            <View className="flex-1 gap-4">
              <InputField
                label="이메일"
                placeholder="example@abc.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
                error={emailError}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                autoFocus
                textContentType="emailAddress"
                autoComplete="off"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <InputField
                ref={passwordInputRef}
                label="비밀번호"
                placeholder="여기에 입력"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError("");
                }}
                error={passwordError}
                keyboardType="default"
                secureTextEntry
                returnKeyType="go"
                textContentType="none"
                autoComplete="off"
                onSubmitEditing={handleLogin}
              />
            </View>

            <View className="w-full items-center p-2 gap-4">
              <TouchableOpacity className="mt-6">
                <Text className="text-mark-it text-lg font-h2-bold-font">비밀번호를 잊어버리셨나요?</Text>
              </TouchableOpacity>
              <LargeButton
                title="시작하기"
                bgColor={isButtonEnabled ? "bg-mark-it" : "bg-grey-3"}
                textColor="text-white"
                onPress={handleLogin}
                disabled={!isButtonEnabled || loading}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
