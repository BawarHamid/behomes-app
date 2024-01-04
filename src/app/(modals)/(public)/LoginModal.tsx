import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import {
  btnAuth,
  btnText,
  textFieldAuth,
} from "@/src/constants/TaildwindStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginModal = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn, setActive, isLoaded } = useSignIn();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignIn = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      // Save the logged-in email to AsyncStorage upon successful sign-in
      // await AsyncStorage.setItem("loggedInEmail", email);
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
      <Spinner visible={loading} />

      {/* title - paragraph area */}
      <View className="items-center">
        <Ionicons
          name="md-logo-no-smoking"
          size={45}
          color={Colors["primary-blue"]}
          style={styles.iconTop}
        />
        <Text className="font-[mon-bold] text-2xl">Welcome Back</Text>
        <Text className="font-[mon-medium] text-lg whitespace-nowrap mt-1">
          Login to continue
        </Text>
      </View>
      {/* form-view start */}
      <View className="px-[20px] mt-20">
        {/* input for email */}
        <View className="relative mt-3">
          <Ionicons
            name="mail"
            size={20}
            color={Colors["primary-blue"]}
            style={styles.leftSideIcon}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Email@behomes.com"
            className={`${textFieldAuth} pl-10`}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {/* input for password with on/off-hide */}
        <View className="relative mt-3">
          <Ionicons
            name="lock-closed"
            size={20}
            color={Colors["primary-blue"]}
            style={styles.leftSideIcon}
          />
          <TextInput
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            className={`${textFieldAuth} pl-10`}
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
        <View className="mt-1 ml-4 items-start">
          <Link href={"/(modals)/(public)/ResetPasswordModal"}>
            <Text className="font-[mon-semi-bold] text-xs underline">
              Reset password
            </Text>
          </Link>
        </View>
        <View className="mt-10">
          <TouchableOpacity
            disabled={!email || !password || (!email && !password)}
            className={`${btnAuth} bg-primary-medium-black active:bg-primary-medium-black active:opacity-80`}
            onPress={handleSignIn}
          >
            <Text className={`${btnText}`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row justify-center mt-1">
        <Text className="font-[mon-medium]">Don't have a account? </Text>
        <Link
          className="font-[mon-medium] underline"
          href={"/(modals)/(public)/RegisterModal"}
        >
          Register here
        </Link>
      </View>
    </View>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  iconTop: {
    marginBottom: 10,
  },
  leftSideIcon: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    left: 12,
  },
  eyeIcon: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    right: 12,
  },

  // leftSideIcon: {
  //   position: "absolute",
  //   zIndex: 1,
  //   top: 12,
  //   left: 12,
  // },
  // eyeIcon: {
  //   position: "absolute",
  //   top: 11,
  //   right: 12,
  //   zIndex: 1,
  // },
});
