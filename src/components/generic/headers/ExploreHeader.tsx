import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const headerCategories = [
  {
    name: "Design",
    icon: "home-modern",
  },
  {
    name: "City",
    icon: "city",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Castles",
    icon: "fort-awesome",
  },
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Islands",
    icon: "island",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Beach",
    icon: "umbrella-beach",
  },
  {
    name: "Camper vans",
    icon: "caravan",
  },
  {
    name: "Arctic",
    icon: "snowflake-o",
  },
  {
    name: "Tropical",
    icon: "palm-tree",
  },
];

const ExploreHeader = () => {
  const itemsRef = useRef<Array<TouchableOpacity>>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <View className="bg-white h-[138px]">
      <View className="flex flex-row items-center justify-between px-5 my-2 border border-gray-100 rounded-full py-3 mx-5 shadow-lg shadow-gray-500 bg-white">
        <View>
          <Link href={"/(modals)/(auth)/BookingModal"}>
            <TouchableOpacity>
              <View className="rounded-full">
                <Ionicons name="search" size={26} color={"black"} />
              </View>
            </TouchableOpacity>
            <View className="px-4">
              <Text className="font-[mon-bold] text-xs text-primary-black">
                Where to?
              </Text>
              <Text className="font-[mon-semi-bold] text-xs text-primary-grey">
                Anywhere · Any week · Add guests
              </Text>
            </View>
          </Link>
        </View>
        <TouchableOpacity className="rounded-full py-2 border border-gray-200 px-2">
          <Ionicons name="options-outline" size={22} color={"black"} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          gap: 20,
          paddingHorizontal: 14,
        }}
      >
        {headerCategories.map((cat, key) => (
          <TouchableOpacity key={key} className="items-center">
            <MaterialIcons size={24} name={cat.icon as any} />
            {/* <MaterialCommunityIcons size={24} name={cat.icon as any} />
            <FontAwesome size={24} name={cat.icon as any} />
            <Ionicons size={24} name={cat.icon as any} />
            <Fontisto size={24} name={cat.icon as any} />
            <FontAwesome5 size={24} name={cat.icon as any} /> */}
            <Text>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ExploreHeader;
