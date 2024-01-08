import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import ExploreHeader from "@/src/components/generic/headers/ExploreHeader";
import Rentals from "@/src/components/rentals/Rentals";
import rentalsDummyData from "@/src/utils/data/airbnb-listings-cph92.json";
// Explore/Home/Index-Tab
const ExploreTabScreen = () => {
  const [category, setCategory] = useState<string>("Design");
  const dummyItems = useMemo(() => rentalsDummyData as any, []);
  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  return (
    // onclick views
    <View>
      <ExploreHeader onCategoryChanged={onDataChanged} />
      {/* <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      /> */}
      <View className="">
        <Rentals listOfRentals={dummyItems} category={category} />
      </View>
    </View>
  );
};

export default ExploreTabScreen;
