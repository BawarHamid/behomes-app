import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const HomeTabScreen = () => {
  return (
    <View>
      <Text className="my-6 text-center text-primary-medium-black">faggot</Text>
      <Link href={"/(modals)/LoginModal"}>Login</Link>
      <Link href={"/(modals)/RegisterModal"}>Create Account</Link>
      <Link href={"/(modals)/BookingModal"}>Book Your Trips here</Link>
      <Link href={"/rentals/122"}>Listings info</Link>
    </View>
  );
};

export default HomeTabScreen;
