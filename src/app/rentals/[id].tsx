import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const RentalsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("~ file: [id].tsx:7 ~ RentalsScreen ~ id:", id);
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default RentalsScreen;
