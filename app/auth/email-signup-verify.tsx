import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  LayoutAnimation,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { InputField } from "../../components/InputField";
import { useUserStore } from "../../store/userStore";
import { client } from "../../api/client";
import { AuthHeader } from "components/AuthHeader";
import { LargeButton } from "components/LargeButton";
import Toast from "react-native-toast-message";

export default function EmailSignupVerifyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setToken } = useUserStore();
  const { email, password } = useLocalSearchParams<{ email: string; password: string }>();

  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(false);

  const [codeError, setCodeError] = useState("");

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

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!codeError) setCodeError("인증 시간이 초과되었습니다. 인증 메일을 다시 요청해주세요.");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setCodeError("인증 시간이 초과되었습니다. 인증 메일을 다시 요청해주세요.");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleComplete = async () => {
    try {
      setLoading(true);

      const response = await client.post("/user/register", {
        email,
        password,
        verificationCode: code,
      });

      if (response.data.accessToken) {
        await setToken(response.data.accessToken);
        router.push("/auth/email-signup-success");
      }
    } catch (e) {
      console.error("인증 에러", e);
      setCodeError("인증 코드가 일치하지 않습니다. 다시 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setCodeError("");
      setTimeLeft(300);
      setCode("");
      // TODO: 인증번호 재전송 API
      // await client.post("/auth/resend-code", { email });
      Toast.show({
        type: "success",
        text1: "메일이 다시 발송되었습니다.",
        position: "bottom",
        visibilityTime: 2000,
        bottomOffset: 90,
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "잠시 후 다시 시도해주세요.",
        position: "bottom",
        visibilityTime: 2000,
        bottomOffset: 90,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 items-strech px-6 gap-10 bg-white" edges={["top", "left", "right"]}>
        <AuthHeader type="back" />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, gap: 40, paddingBottom: Math.max(insets.bottom + 12, 32) }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="gap-4">
              <Text className="text-4xl font-btn-font">인증 메일이 발송되었습니다.</Text>
              <Text className="text-grey-1 text-lg">메일에 포함된 인증 코드 6자리를 입력해주세요.</Text>
            </View>

            <View className="flex-1 relative">
              <InputField
                label="인증번호"
                placeholder="인증번호 입력"
                value={code}
                onChangeText={(text) => {
                  setCode(text);
                  if (timeLeft > 0) setCodeError("");
                }}
                error={codeError}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
                returnKeyType="done"
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
              />
              {/* 타이머 */}
              <View className="absolute right-2 top-10">
                <Text className={`text-xl font-h2-font ${timeLeft === 0 ? "text-mark-it" : "text-grey-1"}`}>
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                </Text>
              </View>
            </View>
            <View className="w-full items-center p-2 gap-4">
              <TouchableOpacity onPress={handleResend} className="mt-6">
                <Text className="text-mark-it text-lg font-h2-bold-font">이메일이 도착하지 않았나요?</Text>
              </TouchableOpacity>
              <LargeButton
                title="계속하기"
                bgColor={code.length === 6 ? "bg-mark-it" : "bg-grey-3"}
                textColor="text-white"
                onPress={handleComplete}
                disabled={code.length !== 6 || loading}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
