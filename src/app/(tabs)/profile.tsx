import { View, Text, Button } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import Colors from "@/src/constants/Colors";
import { useRouter } from "expo-router";

const ProfileTabScreen = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  return (
    <>
      <View className="flex flex-row items-center justify-between my-3 px-3">
        {/* <View className="my-6 ml-2"> */}
        <Text className="font-[mon-bold]">
          User: {user?.emailAddresses[0].emailAddress}
        </Text>
        {/* </View> */}
        {!isSignedIn ? (
          // <View>
          <Button
            title="Login"
            onPress={() => router.push("/(modals)/(public)/SelectAuthModal")}
            color={Colors["primary-grey"]}
          />
        ) : (
          // </View>
          // <View>
          <Button
            title="Log out"
            onPress={() => signOut()}
            color={Colors["primary-red"]}
            accessibilityLabel="Logout btn"
          />
          // </View>
        )}
      </View>

      {/* <View
        style={{
          marginHorizontal: 12,
          marginVertical: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontFamily: "mon-bold" }}>
            User: {user?.emailAddresses[0].emailAddress}
          </Text>
        </View>
        {!isSignedIn ? (
          <Button
            title="Login"
            onPress={() => router.push("/(modals)/(public)/SelectAuthModal")}
            color={Colors["primary-blue"]}
          />
        ) : (
          <Button
            title="Log out"
            onPress={() => signOut()}
            color={Colors["primary-red"]}
            accessibilityLabel="Logout btn"
          />
        )}
      </View> */}
    </>
  );
};

export default ProfileTabScreen;
