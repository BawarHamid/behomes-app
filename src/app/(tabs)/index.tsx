import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import ExploreHeader from "@/src/components/generic/headers/ExploreHeader";
import Rentals from "@/src/components/rentals/Rentals";
import rentalsDummyData from "@/src/utils/data/airbnb-listings-cph92.json";
import RentalGeoData from "@/src/utils/data/airbnb-listings.geo.json";
import RentalsMap from "@/src/components/rentals/RentalsMap";
import RentalBottomSheet from "@/src/components/rentals/RentalBottomSheet";
// Explore/Home/Index-Tab
const ExploreTabScreen = () => {
  const [category, setCategory] = useState<string>("Design");
  const geoData = useMemo(() => RentalGeoData, []);
  const dummyItems = useMemo(() => rentalsDummyData as any, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    // onclick views
    <View className="bg-white">
      {/* <ExploreHeader onCategoryChanged={onDataChanged} /> */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Rentals rentalList={dummyItems} category={category} refresh={0} />
      {/* <RentalsMap rentals={geoData} /> */}
      {/* <RentalBottomSheet rentals={dummyItems} category={category} /> */}
    </View>

    // <View style={{ flex: 1, marginTop: 80 }}>
    //   {/* Define pour custom header */}
    //   <Stack.Screen
    //     options={{
    //       header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
    //     }}
    //   />
    //   <RentalsMap rentals={geoData} />
    //   <RentalBottomSheet rentals={dummyItems} category={category} />
    // </View>
  );
};

export default ExploreTabScreen;
