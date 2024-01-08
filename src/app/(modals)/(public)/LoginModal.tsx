import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  btnText,
  authTextInput,
  btnOutline,
  btnAuth,
  authOutlineBtn,
  authOutlineBtnText,
} from "@/src/constants/TaildwindStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/src/constants/Colors";

const LoginModal = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn, setActive, isLoaded } = useSignIn();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

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
    <View className="mt-[26px]">
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
      <View className="mt-20 px-[22px]">
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
        <View className="mt-6">
          <TouchableOpacity
            disabled={!email || !password || (!email && !password)}
            className={`${btnAuth} bg-primary-medium-black active:bg-primary-medium-black active:opacity-80`}
            onPress={handleSignIn}
          >
            <Text className={`${btnText}`}>Login</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-2 items-center">
          <TouchableOpacity
            onPress={() => router.push("/(modals)/(public)/ResetPasswordModal")}
          >
            <Text className="font-[mon-semi-bold]">
              Did you forget your password?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="justify-center mt-[200px]">
          <TouchableOpacity
            className={`${authOutlineBtn}`}
            onPress={() => router.push("/(modals)/(public)/RegisterModal")}
          >
            <Text className={`${authOutlineBtnText}`}>
              Register new account here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  iconTop: {
    marginBottom: 10,
  },
  eyeIcon: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    right: 12,
  },
});
