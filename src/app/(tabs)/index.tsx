import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
// Explore/Home/Index-Tab
const ExploreTabScreen = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  return (
    // onclick views
    <View>
      <Text className="my-6 text-center text-primary-medium-black">
        {!isSignedIn
          ? " Abdo's Fitness-App not authorized"
          : "Abdo's Fitness-App logged in as" +
            " " +
            user?.emailAddresses[0].emailAddress}
      </Text>
      {/* <Link href={"/(modals)/(public)/SelectAuthModal"}>
        Select How to login
      </Link> */}
      {/* <Link href={"/(modals)/(public)/LoginModal"}>Login</Link>
      <Link href={"/(modals)/(public)/RegisterModal"}>Create Account</Link> */}
      <Link href={"/(modals)/(public)/ResetPasswordModal"}>Reset Pipi</Link>
      <Link href={"/(modals)/(auth)/BookingModal"}>Your Bookings</Link>
      <Link href={"/rental/122"}>Explore a place for rent</Link>
    </View>
  );
};

export default ExploreTabScreen;
