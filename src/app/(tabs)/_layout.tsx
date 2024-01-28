import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/src/constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarItemStyle: {
          paddingVertical: 2,
        },
        tabBarActiveTintColor: Colors["primary-blue"],
        tabBarLabelStyle: {
          fontFamily: "mon-semi-bold",
        },
      }}
    >
      {/* Def for Explore/Index-tab */}
      <Tabs.Screen
        name="index"
        options={{
          // headerStatusBarHeight: -25,
          headerTitleAlign: "center",
          tabBarLabel: "Explore",
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      {/* Def for wishlists-tab */}
      <Tabs.Screen
        name="wishlists"
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Wishlists",
          headerTitle: "Wishlists",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      {/* Def for trips-tab */}
      <Tabs.Screen
        name="trips"
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Trips",
          headerTitle: "Trips",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="earth" color={color} size={size} />
          ),
        }}
      />
      {/* Def for inbox-tab */}
      <Tabs.Screen
        name="inbox"
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Inbox",
          headerTitle: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" color={color} size={size} />
          ),
        }}
      />
      {/* Def for profile-tab */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
