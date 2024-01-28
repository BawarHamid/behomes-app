import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Rentals from "./Rentals";
import Colors from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type BottomSheetProps = {
  rentals: any[];
  category: string;
};

const RentalBottomSheet: React.FC<BottomSheetProps> = ({
  rentals,
  category,
}) => {
  const [refresh, setRefresh] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["15%", "100%"], []);

  const showMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: Colors["primary-grey"] }}
      enablePanDownToClose={false}
      index={1}
      style={styles.bottomSheetContainer}
    >
      <View>
        <Rentals rentalList={rentals} category={category} refresh={refresh} />
        <View style={styles.mapBtn}>
          <TouchableOpacity onPress={showMap} className="" style={styles.btn}>
            <Text className="font-[mon-semi-bold] text-white text-xs">Map</Text>
            <Ionicons name={"map"} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default RentalBottomSheet;

const styles = StyleSheet.create({
  mapBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  bottomSheetContainer: {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    elevation: 4,
    shadowColor: Colors["primary-medium-black"],
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
    gap: 8,
  },
});
