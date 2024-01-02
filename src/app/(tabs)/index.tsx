import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
// Explore/Home/Index-Tab
const ExploreTabScreen = () => {
  return (
    // onclick views
    <View>
      <Text className="my-6 text-center text-primary-medium-black">
        Abdo's Fitness-App
      </Text>
      <Link href={"/(modals)/(public)/SelectAuthModal"}>
        Select How to login
      </Link>
      <Link href={"/(modals)/(public)/LoginModal"}>Login</Link>
      <Link href={"/(modals)/(public)/RegisterModal"}>Create Account</Link>
      <Link href={"/(modals)/(public)/ResetPasswordModal"}>Reset Pipi</Link>
      <Link href={"/(modals)/(auth)/BookingModal"}>Your Bookings</Link>
      <Link href={"/rental/122"}>Explore a place for rent</Link>
    </View>
  );
};

export default ExploreTabScreen;
