import { View, Text, Button } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import Colors from "@/src/constants/Colors";
import { useRouter } from "expo-router";

const ProfileTabScreen = () => {
  const { signOut, isSignedIn } = useAuth();
  const router = useRouter();
  return (
    <View>
      <Button
        title="Log out"
        onPress={() => signOut()}
        color={Colors["primary-red"]}
        accessibilityLabel="Logout btn"
      />
      {!isSignedIn && (
        <Link href={"/(modals)/LoginModal"}>
          <Text className="text-primary-blue font-bold">Login</Text>
        </Link>

        // <View className="my-6 px-40">
        //   <Button
        //     title="Login"
        //     onPress={() => router.push("/(modals)/LoginModal")}
        //     color={Colors["primary-blue"]}
        //   />
        // </View>
      )}
    </View>
  );
};

export default ProfileTabScreen;
