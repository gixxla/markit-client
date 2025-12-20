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
} from "react-native";
import { useRouter } from "expo-router";
import { InputField } from "../../components/InputField";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthHeader } from "../../components/AuthHeader";
import { LargeButton } from "components/LargeButton";
import client from "api/client";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

export default function EmailSignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

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

  const validateInputs = () => {
    let isValid = true;

    // 1. 이메일 주소 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 주소를 입력해주세요.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // 2. 비밀번호 유효성 검사
    // 조건: 영문, 숫자, 특수문자 중 2가지 이상 포함 + 8~16자리
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>\/\[\]\\;='`~_\-+]/.test(password);

    const combinationCount = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;

    const isLengthValid = password.length >= 8 && password.length <= 16;

    if (!isLengthValid || combinationCount < 2) {
      setPasswordError("영문, 숫자, 특수문자 중 2가지를 포함한 8~16자리로 이루어져야 합니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // 3. 비밀번호 확인 검사
    if (password !== confirmPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setConfirmError("");
    }

    return isValid;
  };

  const handleNext = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);

      await client.post("/user/check-email", { email });

      await client.post("/auth/send-code", { email });
      console.log("인증번호 발송 요청 성공 -> 다음 화면 이동");

      router.push({
        pathname: "/auth/email-signup-verify",
        params: { email, password },
      });
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError && e.response?.status === 409) {
        setEmailError("이미 가입된 이메일입니다.");
      } else {
        Toast.show({
          type: "error",
          text1: "잠시 후 다시 시도해주세요.",
          position: "bottom",
          visibilityTime: 2000,
          bottomOffset: 90,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const isButtonEnabled = email.length > 0 && password.length > 0 && confirmPassword.length > 0;

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
            <Text className="text-4xl font-btn-font">계정 생성하기</Text>
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
                returnKeyType="next"
                textContentType="none"
                autoComplete="off"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />
              <InputField
                ref={confirmPasswordInputRef}
                label="비밀번호 확인"
                placeholder="여기에 입력"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setConfirmError("");
                }}
                error={confirmError}
                keyboardType="default"
                secureTextEntry
                returnKeyType="done"
                textContentType="none"
                autoComplete="off"
                onSubmitEditing={handleNext}
              />
            </View>

            <View className="p-2">
              <LargeButton
                title="계속하기"
                bgColor={isButtonEnabled ? "bg-mark-it" : "bg-grey-3"}
                textColor="text-white"
                onPress={handleNext}
                disabled={!isButtonEnabled || loading}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
