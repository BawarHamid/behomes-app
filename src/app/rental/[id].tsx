import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import rentalsDummyData from "@/src/utils/data/airbnb-listings-cph92.json";
import Colors from "@/src/constants/Colors";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/src/constants/Styles";
import { btn, btnText } from "@/src/constants/TaildwindStyles";

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

const RentalsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const rental = (rentalsDummyData as any[]).find((place) => place.id === id);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const navigaton = useNavigation();
  useLayoutEffect(() => {
    navigaton.setOptions({
      headerBackground: () => (
        <Animated.View
          className="bg-white h-[100px] border-b border-[primary-grey]"
          style={headerAnimatedStyle}
        />
      ),

      headerRight: () => (
        <View className="flex flex-row items-center justify-center gap-[10px]">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center">
            <Ionicons
              name="share-social"
              color={Colors["primary-black"]}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white items-center justify-center">
            <Ionicons
              name="heart-outline"
              color={Colors["primary-black"]}
              size={24}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
          onPress={navigaton.goBack}
        >
          <Ionicons
            name="chevron-back"
            color={Colors["primary-black"]}
            size={24}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  return (
    <View className="bg-white flex-1">
      <Animated.ScrollView
        scrollEventThrottle={16}
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 95 }}
      >
        <Animated.Image
          source={{ uri: rental.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />
        {/* Info view start */}
        <View className="p-6 bg-white">
          <Text className="text-2xl font-[mon-bold]">{rental.name}</Text>
          <View className="mt-2 font-[mon-normal] text-gray-600">
            <Text className="text-lg font-[mon-semi-bold]">
              {rental.room_type} in {rental.smart_location}
            </Text>
          </View>
          <View className="mt-1">
            <Text className="text-sm font-[mon-light]">
              {rental.guests_included} guest(s) · {rental.bedrooms} bedroom(s) ·{" "}
              {rental.beds} bed(s) · {rental.bathrooms} bathroom(s)
            </Text>
          </View>
          <View className="flex flex-row right-1 items-center gap-1 mt-2 font-[mon-normal] text-gray-600">
            <Ionicons name="star" size={16} />
            <Text className="font-[mon-semi-bold]">
              {rental.review_scores_rating / 20} · {""}
              <Text className="underline">
                {rental.number_of_reviews} reviews
              </Text>
            </Text>
          </View>
          {/* divider start*/}
          <View style={styles.divider} />
          {/* Host info */}
          <View className="flex flex-row items-center gap-2">
            <Image
              source={{ uri: rental.host_picture_url }}
              className="w-[50px] h-[50px] rounded-full items-end"
            />
            <View>
              <Text className="font-[mon-bold] text-lg">
                Host: {rental.host_name}
              </Text>
              <Text className="font-[mon-semi-bold] text-base text-gray-400">
                hosting since: {rental.host_since}
              </Text>
            </View>
          </View>
          {/* divider slut*/}
          <View style={styles.divider} />

          <View>
            <Text className="font-[mon-bold]">About the accommodation:</Text>
            <Text className="mt-2 font-[mon-normal] text-gray-600 ">
              {rental.description}
            </Text>
          </View>
          {/* divider start*/}
          <View style={styles.divider} />
          <View className="flex flex-col gap-1">
            <View className="items-center">
              <Text className="font-[mon-bold] text-lg">
                This accommodation offers:
              </Text>
            </View>
            <View>
              {rental.amenities.map((features: any) => (
                <View
                  key={features}
                  className="p-1 border rounded-xl text-white border-primary-blue py-4 items-center my-1 mx-16"
                >
                  <Text className="font-[mon-semi-bold] ml-1">{features}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* divider slut*/}
          <View style={styles.divider} />

          <View>
            <Text className="font-[mon-bold] text-center text-base">
              Things to know:
            </Text>
            <View className="gap-4">
              <View>
                <Text className="mt-1 font-[mon-semi-bold]">House rules:</Text>
                <Text className="mt-2 font-[mon-normal] text-gray-600">
                  {rental.house_rules}
                </Text>
              </View>
              <View>
                <Text className="mt-1 font-[mon-semi-bold]">
                  What can you use?
                </Text>
                <Text className="mt-2 font-[mon-normal] text-gray-600">
                  {rental.access}
                </Text>
              </View>
              <View>
                <Text className="mt-1 font-[mon-semi-bold]">
                  Host availability:
                </Text>
                <Text className="mt-2 font-[mon-normal] text-gray-600">
                  {rental.interaction}
                </Text>
              </View>
              <View>
                <Text className="mt-1 font-[mon-semi-bold]">
                  Cancellation policy:
                </Text>
                <Text className="mt-2 font-[mon-normal] text-gray-600">
                  {rental.cancellation_policy}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center mt-1">
            <Text className="text-start font-[mon-bold] text-base">
              {rental.price} DKK/kr
            </Text>
            <Text className="font-[mon-normal] ml-1">night</Text>
          </View>
          <View className="items-center pr-5">
            <TouchableOpacity className={`${btn} bg-primary-blue px-5`}>
              <Text className={`${btnText}`}>Reserve</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default RentalsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "mon-sb",
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "mon-sb",
  },
  rooms: {
    fontSize: 16,
    color: Colors["primary-grey"],
    marginVertical: 4,
    fontFamily: "mon",
  },
  ratings: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors["primary-grey"],
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors["primary-grey"],
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors["primary-blue"],
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors["primary-grey"],
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
  },
});
