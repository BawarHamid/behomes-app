import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const LoginModal = () => {
  return (
    <View>
      <Text>LoginModal</Text>
      <Link href={"/(modals)/(public)/RegisterModal"}>Create Account</Link>
    </View>
  );
};

export default LoginModal;
