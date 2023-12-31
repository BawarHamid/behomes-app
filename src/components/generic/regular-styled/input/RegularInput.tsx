import { View, Text, TextInput, TextStyle } from "react-native";
import React from "react";

export type RegularInputTypes = {
  value?: string;
  placeholder?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  styles?: TextStyle;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
};

const RegularInput: React.FC<RegularInputTypes> = ({
  value,
  placeholder,
  onChange,
  styles,
  autoCapitalize,
}) => {
  return (
    <View>
      <TextInput
        className="h-11 border border-[#ABABAB] rounded-lg p-[10px] bg-white"
        style={styles}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
};

export default RegularInput;
