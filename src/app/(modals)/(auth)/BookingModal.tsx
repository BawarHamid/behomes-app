import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { defaultStyles } from "@/src/constants/Styles";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { btn, unAuthBtn } from "@/src/constants/TaildwindStyles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { places } from "@/src/static/assets/dummy-data/places";
import DatePicker from "react-native-modern-datepicker";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const guestsGroups = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

const BookingModal = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState<number>(0);
  const [selectedPlace, setSelectedPlace] = useState<number>(0);
  const currentDate = new Date().toISOString().substring(0, 10);
  const [groups, setGroups] = useState(guestsGroups);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
  };

  return (
    <BlurView intensity={60} style={styles.container} tint="light">
      {/* Where? */}
      <View className="rounded-2xl bg-white shadow-md shadow-black m-[10px]">
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            style={styles.cardPreview}
            onPress={() => setOpenCard(0)}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text className="font-[mon-semi-bold] text-sm text-primary-grey">
              Where
            </Text>
            <Text className="font-[mon-semi-bold] text-sm text-primary-medium-black">
              I'm flexible
            </Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard == 0 && (
          <>
            <Animated.Text
              entering={FadeIn}
              className="font-[mon-bold] text-2xl p-5"
            >
              Where to?
            </Animated.Text>
            <Animated.View className="px-5 pb-5">
              <View style={styles.searchSection}>
                <Ionicons
                  style={styles.searchIcon}
                  name="ios-search"
                  size={20}
                  color="#000000"
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search destinations"
                  placeholderTextColor={Colors["primary-grey"]}
                />
              </View>
            </Animated.View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 20,
                paddingLeft: 20,
                marginBottom: 30,
              }}
            >
              {places.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedPlace(index)}
                  key={index}
                >
                  <Image
                    source={item.img}
                    style={
                      selectedPlace == index
                        ? styles.placeSelected
                        : styles.place
                    }
                  />
                  <Text
                    className={`font-[mon-medium] mt-[6px] ${
                      selectedPlace == index ? "font-[mon-bold]" : ""
                    }`}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      {/* When? */}
      <View className="rounded-2xl bg-white shadow-md shadow-black m-[10px]">
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            className="flex-row justify-between p-5"
            onPress={() => setOpenCard(1)}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text className="font-[mon-semi-bold] text-sm text-primary-grey">
              When
            </Text>
            <Text className="font-[mon-semi-bold] text-sm text-primary-medium-black">
              Any week
            </Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 1 && (
          <>
            <Animated.Text
              entering={FadeIn}
              className="font-[mon-bold] text-2xl p-5"
            >
              When are you traveling?
            </Animated.Text>
            <Animated.View className="px-5 pb-5">
              <DatePicker
                options={{
                  defaultFont: "mon-medium",
                  headerFont: "mon-semi-bold",
                  borderColor: "transparent",
                  mainColor: Colors["primary-red"],
                }}
                current={currentDate}
                selected={currentDate}
                mode="calendar"
              />
            </Animated.View>
          </>
        )}
      </View>

      {/* Who? */}
      <View className="rounded-2xl bg-white shadow-md shadow-black m-[10px]">
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            className="flex-row justify-between p-5"
            onPress={() => setOpenCard(2)}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text className="font-[mon-semi-bold] text-sm text-primary-grey">
              Who
            </Text>
            <Text className="font-[mon-semi-bold] text-sm text-primary-medium-black">
              Add guests
            </Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 2 && (
          <>
            <Animated.Text
              entering={FadeIn}
              className="font-[mon-bold] text-2xl p-5"
            >
              Who's coming?
            </Animated.Text>
            <Animated.View className="px-5 pb-5">
              {groups.map((group, index) => (
                <View
                  key={index}
                  className={`flex-row justify-between items-center py-4 border-b border-gray-300 ${
                    index === groups.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <View>
                    <Text className="font-[mon-bold] text-sm">
                      {group.name}
                    </Text>
                    <Text className="font-[mon-medium] text-sm text-primary-grey">
                      {group.text}
                    </Text>
                  </View>
                  <View className="flex-row gap-[10px] items-center justify-center">
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[index].count =
                          newGroups[index].count > 0
                            ? newGroups[index].count - 1
                            : 0;
                        setGroups(newGroups);
                      }}
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={26}
                        color={
                          groups[index].count > 0
                            ? Colors["primary-medium-black"]
                            : "#E5E7EB"
                        }
                      />
                    </TouchableOpacity>
                    <Text className="font-[mon-bold] text-base items-center text-center min-w-[18px]">
                      {group.count}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...groups];
                        newGroups[index].count++;
                        setGroups(newGroups);
                      }}
                    >
                      <Ionicons
                        name="add-circle-outline"
                        size={26}
                        color={
                          groups[index].count > 0
                            ? Colors["primary-medium-black"]
                            : "#E5E7EB"
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          </>
        )}
      </View>

      {/* Footer with buttons */}
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={onClearAll}>
            <Text className="underline text-lg font-[mon-semi-bold]">
              Clear all
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`${unAuthBtn} bg-primary-red flex-row`}
            onPress={router.back}
          >
            <Ionicons
              name={"search"}
              color={"#ffffff"}
              size={20}
              style={{ paddingRight: 8 }}
            />
            <Text className="text-white font-[mon-medium]">Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default BookingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  cardHeader: {
    fontFamily: "mon-bold",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },

  searchSection: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  placesContainer: {
    flexDirection: "row",
    gap: 25,
  },
  place: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  placeSelected: {
    borderColor: Colors["primary-grey"],
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  previewText: {
    fontFamily: "mon-semi-bold",
    fontSize: 14,
    color: Colors["primary-grey"],
  },
  previewdData: {
    fontFamily: "mon-semi-bold",
    fontSize: 14,
    color: Colors.dark,
  },

  guestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors["primary-grey"],
  },
});
