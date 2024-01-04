import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useWarmUpBrowser } from "@/src/hooks/useWarmUpBrowser";
import { TextInput } from "react-native-gesture-handler";
import RegularInput from "@/src/components/generic/regular-styled/input/RegularInput";
import { defaultStyles, stylesLoginModal } from "@/src/constants/Styles";
import {
  btn,
  btnIcon,
  btnOutline,
  btnOutlineText,
  btnText,
  textField,
} from "@/src/constants/TaildwindStyles";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginModal = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const [getMail] = useState<string>();

  enum Strategy {
    Google = "oauth_google",
    Apple = "oauth_apple",
    Facebook = "oauth_facebook",
    Microsoft = "oauth_microsoft",
  }

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });
  const { startOAuthFlow: microsoftAuth } = useOAuth({
    strategy: "oauth_microsoft",
  });

  const onSelectSocialAuth = async (strategy: Strategy) => {
    const selectedAuthType = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
      [Strategy.Microsoft]: microsoftAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuthType();
      console.log("onauthselect:", createdSessionId);
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  // const checkingEmail = async () => {
  //   try {
  //     const existingEmail = await AsyncStorage.getItem("loggedInEmail");
  //     console.log("Existing email:", existingEmail);

  //     if (existingEmail) {
  //       if (existingEmail === getMail) {
  //         // Email is already taken
  //         console.log("Email is already taken");
  //         router.push("/(modals)/(public)/LoginModal");
  //       }
  //     }
  //     // Email is available
  //     console.log("Email is available");
  //     router.push("/(modals)/(public)/RegisterModal");
  //   } catch (error) {
  //     console.error("Error checking email existence:", error);
  //     // Handle error as needed
  //     alert(error);
  //   }
  // };

  return (
    // <View style={stylesLoginModal.container}>
    <View className="mt-[26px] px-[26px]">
      {/* <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      /> */}
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        className={`mb-[30px] ${textField}`}
      />
      {/* <TouchableOpacity style={defaultStyles.btn}> */}
      <TouchableOpacity
        className={`${btn} bg-primary-red`}
        onPress={() => {
          router.replace("/(modals)/(public)/LoginModal");
          // checkingEmail();
        }}
      >
        <Text className={`${btnText}`}>Continue</Text>
      </TouchableOpacity>

      {/* Parent View/div for separator */}
      <View
        style={stylesLoginModal.viewSeparator}
        // className="flex items-center gap-[10px] my-[20px]"
      >
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        {/* <View className="flex border-b border-black" /> */}
        <Text style={stylesLoginModal.textSeparator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View className="gap-4">
        {/* btn for login with Phone */}
        <TouchableOpacity className={`${btnOutline}`}>
          <Text className={`${btnOutlineText}`}>Continue with Phone</Text>
          <Ionicons
            name="md-phone-portrait-outline"
            size={24}
            style={defaultStyles.btnIcon}
          />
        </TouchableOpacity>
        {/* btn for login with Apple-account */}
        <TouchableOpacity
          className={`${btnOutline}`}
          onPress={() => onSelectSocialAuth(Strategy.Apple)}
        >
          <Text className={`${btnOutlineText}`}>Continue with Apple</Text>
          <Ionicons
            name="md-logo-apple"
            size={24}
            style={defaultStyles.btnIcon}
            color="#000000"
          />
        </TouchableOpacity>
        {/* btn for login with Google-account */}
        <TouchableOpacity
          className={`${btnOutline}`}
          onPress={() => onSelectSocialAuth(Strategy.Google)}
        >
          <Text className={`${btnOutlineText}`}>Continue with Google</Text>
          <Ionicons
            name="md-logo-google"
            size={24}
            style={defaultStyles.btnIcon}
            color="#4285F4"
          />
        </TouchableOpacity>
        {/* btn for login with Microsoft-account */}
        <TouchableOpacity
          className={`${btnOutline}`}
          onPress={() => onSelectSocialAuth(Strategy.Microsoft)}
        >
          <Text className={`${btnOutlineText}`}>Continue with Microsoft</Text>
          <Ionicons
            name="md-logo-windows"
            size={24}
            style={defaultStyles.btnIcon}
            color="#0078D4" // Set the color to the blue hex code used in Microsoft's logo
          />
        </TouchableOpacity>
        {/* btn for login with Facebook-account */}
        <TouchableOpacity
          className={`${btnOutline}`}
          onPress={() => onSelectSocialAuth(Strategy.Facebook)}
        >
          <Text className={`${btnOutlineText}`}>Continue with Facebook</Text>
          <Ionicons
            name="md-logo-facebook"
            size={24}
            style={defaultStyles.btnIcon}
            color="#0866FF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginModal;
