import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import ExploreHeader from "@/src/components/generic/headers/ExploreHeader";
// Explore/Home/Index-Tab
const ExploreTabScreen = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  return (
    // onclick views
    <View>
      <ExploreHeader />
    </View>
  );
};

export default ExploreTabScreen;
