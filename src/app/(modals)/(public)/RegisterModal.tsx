import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { TextInput } from "react-native-gesture-handler";
import { btn, btnText, textField } from "@/src/constants/TaildwindStyles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { defaultStyles } from "@/src/constants/Styles";
import Colors from "@/src/constants/Colors";
import Spinner from "react-native-loading-spinner-overlay";
import { Stack } from "expo-router";

const RegisterModal = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerification = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="mt-[26px] px-[26px]">
      {/* <Stack.Screen options={{ headerBackVisible: !pendingVerification }} /> */}
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <View className="items-center">
            <Ionicons
              name="md-logo-github"
              size={45}
              color={Colors["primary-blue"]}
              style={styles.iconTop}
            />

            <Text className="font-[mon-bold] text-2xl">Create Account</Text>
            <Text className="font-[mon-medium] text-lg whitespace-nowrap mt-1">
              Enter your email and password
            </Text>
          </View>
          {/* input for email */}
          <View className="px-[20px] mt-20">
            <View className="relative">
              <Ionicons
                name="mail"
                size={24}
                color={Colors["primary-blue"]}
                style={styles.emailIcon}
              />

              <TextInput
                autoCapitalize="none"
                placeholder="Email@behomes.com"
                className={`${textField} pl-10`}
                value={email}
                onChangeText={setEmailAddress}
              />
              {/* <View className="absolute top-0 left-2 items-center justify-center h-full">
            <Ionicons name="mail" size={24} color={Colors["primary-blue"]} style={styles.inputIcon} />
          </View> */}
            </View>
            {/* input for password with on/off-hide */}
            <View className="mt-3">
              <TextInput
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                className={`${textField}`}
                placeholder="Enter Password"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color={Colors["primary-blue"]}
                onPress={toggleShowPassword}
                style={styles.eyeIcon}
              />
            </View>
            <View className="mt-6">
              <TouchableOpacity
                className={`${btn} bg-primary-medium-black`}
                onPress={handleSignUp}
              >
                <Text className={`${btnText}`}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={verificationCode}
              placeholder="Enter verfication code...."
              className={`${textField}`}
              onChangeText={setVerificationCode}
            />
          </View>
          <View className="mt-6">
            <Button
              onPress={handleEmailVerification}
              title="Verify Email"
              color={Colors["primary-blue"]}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default RegisterModal;

const styles = StyleSheet.create({
  iconTop: {
    marginBottom: 10,
  },
  emailIcon: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    left: 10,
  },
  eyeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
