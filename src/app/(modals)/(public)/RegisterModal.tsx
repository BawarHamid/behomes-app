import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { TextInput } from "react-native-gesture-handler";
import {
  btnAuth,
  btnText,
  authTextInput,
} from "@/src/constants/TaildwindStyles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import Spinner from "react-native-loading-spinner-overlay";
import { Link, useRouter } from "expo-router";

const RegisterModal = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        Alert.alert("Error", "The passwords do not match, try again!", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        return;
      }

      await signUp.create({
        emailAddress: email,
        password: password,
        username: username,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
      // router.replace("/(tabs)/");
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

  const toggleShowConfirmedPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View className="mt-[26px]">
      {/* <Stack.Screen options={{ headerBackVisible: !pendingVerification }} /> */}
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          {/* title - paragraph area */}
          <View className="items-center">
            <Ionicons
              name="md-logo-github"
              size={45}
              color={Colors["primary-blue"]}
              style={styles.iconTop}
            />
            <Text className="font-[mon-bold] text-2xl">Create Account</Text>
            <Text className="font-[mon-medium] text-lg whitespace-nowrap mt-1">
              Enter all the requried information
            </Text>
          </View>
          {/* form-view start */}
          <View className="mt-20 px-[22px]">
            {/* input for username */}
            <View className="mt-3">
              <TextInput
                autoCapitalize="none"
                placeholder="Username"
                className={`${authTextInput} pl-4`}
                value={username}
                onChangeText={setUsername}
              />
            </View>
            {/* input for email */}
            <View className="mt-3">
              <TextInput
                autoCapitalize="none"
                placeholder="Email address"
                className={`${authTextInput} pl-4`}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            {/* input for password with on/off-hide */}
            <View className="mt-3">
              <TextInput
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                className={`${authTextInput} pl-4`}
                placeholder="Password"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color={Colors["primary-blue"]}
                onPress={toggleShowPassword}
                style={styles.eyeIcon}
              />
            </View>
            {/* input for confirm password with on/off-hide */}
            <View className="mt-3">
              <TextInput
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className={`${authTextInput} pl-4`}
                placeholder="Confirm password"
              />
              <MaterialCommunityIcons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={24}
                color={Colors["primary-blue"]}
                onPress={toggleShowConfirmedPassword}
                style={styles.eyeIcon}
              />
            </View>
            <View className="mt-6">
              <TouchableOpacity
                className={`${btnAuth} bg-primary-medium-black active:bg-primary-medium-black active:opacity-80`}
                onPress={handleSignUp}
                disabled={
                  !email ||
                  !password ||
                  !confirmPassword ||
                  !username ||
                  (!email && !password && !confirmPassword && !username)
                }
              >
                <Text className={`${btnText}`}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-2">
            <TouchableOpacity
              onPress={() => router.push("/(modals)/(public)/LoginModal")}
              className="flex flex-row justify-center"
            >
              <Text className="font-[mon-semi-bold] mr-1">
                Already have an account?
              </Text>
              <Text className="font-[mon-bold] underline">Login here</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={verificationCode}
              placeholder="Enter verfication code...."
              className={`${authTextInput} pl-5`}
              onChangeText={setVerificationCode}
            />
          </View>
          <View className="mt-6">
            <TouchableOpacity
              className={`${btnAuth} bg-primary-blue`}
              onPress={handleEmailVerification}
            >
              <Text className={`${btnText}`}>Verify Email</Text>
            </TouchableOpacity>
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
  eyeIcon: {
    position: "absolute",
    top: 11,
    right: 12,
    zIndex: 1,
  },
});
