import {
  View,
  Text,
  ListRenderItem,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
// import { Rental } from "@/src/interfaces/rental";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { defaultStyles } from "@/src/constants/Styles";

type RentalsProps = {
  rentalList: any[];
  category: string;
  refresh: number;
};

const Rentals: React.FC<RentalsProps> = ({ rentalList, category, refresh }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const listRef = useRef<FlatList>(null);
  const [saveForLater, setSaveForLater] = useState<boolean>(false);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  useEffect(() => {
    // console.log("Reload:", listOfRentals.length);
    setLoading(true);
    //false loading, no backend implemented. just timingout for 20 sec.
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const changeHeartIcon = () => {
    setSaveForLater(!saveForLater);
  };

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/rental/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          entering={FadeInRight}
          exiting={FadeOutLeft}
          style={styles.listing}
        >
          <Image
            source={{ uri: item.xl_picture_url }}
            className="w-[100%] h-[300px] rounded-xl"
          />
          <View className="absolute right-7 top-8">
            <TouchableOpacity onPress={changeHeartIcon}>
              <Ionicons
                name={saveForLater ? "heart" : "heart-outline"}
                size={24}
                color={Colors["primary-red"]}
              />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-start font-[mon-semi-bold]">
              {item.city}, {item.country}
            </Text>
            <View className="flex flex-row right-1 items-center gap-1">
              <Ionicons name="star" size={16} />
              <Text className="font-[mon-semi-bold]">
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>
          <Text className="text-start">{item.name}</Text>
          <Text className="text-start">{item.room_type}</Text>
          <View className="flex flex-row items-center">
            <Text className="text-start font-[mon-bold]">
              {item.price} DKK/kr
            </Text>
            <Text className="font-[mon-normal] ml-1">night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
  return (
    <View>
      <FlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : rentalList}
        ListHeaderComponent={
          <Text className="items-center text-center font-[mon-semi-bold]">
            {rentalList.length} {category}
          </Text>
        }
      />
    </View>
  );
};

export default Rentals;

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: "center",
    fontFamily: "mon-semi-bold",
    fontSize: 16,
    marginTop: 4,
  },
});
