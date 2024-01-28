import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const BookingModalHeaderText = () => {
  const [active, setActive] = useState<number>(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          className={`font-[mon-semi-bold] text-lg ${
            active === 0
              ? "underline decoration-black text-black"
              : "text-primary-grey"
          }`}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          className={`font-[mon-semi-bold] text-lg ${
            active === 1
              ? "underline decoration-black text-black"
              : "text-primary-grey"
          }`}
        >
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});

export default BookingModalHeaderText;
