import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useWarmUpBrowser } from "@/src/hooks/useWarmUpBrowser";
import { TextInput } from "react-native-gesture-handler";
import RegularInput from "@/src/components/generic/regular-styled/input/RegularInput";
import { defaultStyles } from "@/src/constants/Styles";
import {
  btn,
  btnIcon,
  btnText,
  seperatorText,
  seperatorView,
  textField,
} from "@/src/constants/TaildwindStyles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";

const LoginModal = () => {
  useWarmUpBrowser();

  return (
    <View className="mt-[26px] px-6">
      {/* <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={defaultStyles.inputField}
        className="mb-[30px]"
      /> */}
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        className={`mb-[30px] ${textField}`}
      />
      <TouchableOpacity className={`btn ${btn}`}>
        <Ionicons
          name="person"
          color={Colors["primary-blue"]}
          size={24}
          style={defaultStyles.btnIcon}
        />
        <Text className={`${btnText} font-[mon-bold] text-base`}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
    padding: 26,
  },
});

export default LoginModal;
