import {
  View,
  Text,
  StyleSheet,
  // TouchableOpacity,
  // ScrollView,
  LayoutChangeEvent,
} from "react-native";
import React, { useRef, useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/src/constants/Colors";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native";

type ExploreHeaderProps = {
  onCategoryChanged: (category: string) => void;
};

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
    icon: "fire",
  },
  {
    name: "Castles",
    icon: "castle",
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
    icon: "greenhouse",
  },
  {
    name: "Beach",
    icon: "beach",
  },
  {
    name: "Camper vans",
    icon: "caravan",
  },
  {
    name: "Arctic",
    icon: "snowflake",
  },
  {
    name: "Tropical",
    icon: "palm-tree",
  },
];

const ExploreHeader: React.FC<ExploreHeaderProps> = ({ onCategoryChanged }) => {
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);
  const categoryWidth = 86; // Set the width of each category item
  const [scrollViewWidth, setScrollViewWidth] = useState<number>(0);

  const handleContentLayout = (event: LayoutChangeEvent) => {
    setScrollViewWidth(event.nativeEvent.layout.width);
  };

  const selectedCategory = (categoryIndex: number) => {
    setActiveCategory(categoryIndex);

    let offsetX =
      categoryIndex * categoryWidth - scrollViewWidth / 2 + categoryWidth / 2;
    offsetX = Math.max(
      0,
      Math.min(
        offsetX,
        headerCategories.length * categoryWidth - scrollViewWidth
      )
    );

    scrollRef.current?.scrollTo({ x: offsetX, y: 0, animated: true });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onCategoryChanged(headerCategories[categoryIndex].name);
  };

  return (
    <SafeAreaView className="bg-white">
      <View className="h-[150px] mt-10 bg-white">
        <View className=" bg-white mt-3 flex flex-row items-center justify-between px-5 border border-gray-100 rounded-full py-2 mx-5 shadow-lg shadow-gray-500">
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
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 28,
            paddingHorizontal: 16,
          }}
          onLayout={handleContentLayout}
        >
          {headerCategories.map((category, index) => (
            <TouchableOpacity
              onPress={() => selectedCategory(index)}
              className={`py-4 flex-[1px] items-center justify-center pb-[8px] ${
                activeCategory === index
                  ? "border-b-2 border-primary-black"
                  : ""
              }`}
              key={index}
              ref={(categoryElements) =>
                (itemsRef.current[index] = categoryElements)
              }
            >
              <MaterialCommunityIcons
                size={30}
                name={category.icon as any}
                color={
                  activeCategory === index ? Colors["primary-black"] : "#9CA3AF"
                }
              />
              <Text
                style={
                  activeCategory === index
                    ? styles.categoryTextActive
                    : styles.categoryText
                }
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExploreHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 130,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "mon-bold",
    color: "#9CA3AF",
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "mon-bold",
    color: Colors["primary-black"],
  },
});
