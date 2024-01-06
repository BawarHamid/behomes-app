import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { btnText, unAuthBtn } from "@/src/constants/TaildwindStyles";
import { useRouter } from "expo-router";

const WishlistsTabScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleRouteToLogin = () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      router.push("/(modals)/(public)/LoginModal");
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="mt-[20px]">
      <Spinner visible={loading} />
      {!isSignedIn && (
        <>
          <View className="items-start ml-2">
            <Text className="font-[mon-bold] mt-4 text-lg">
              Unfortunately, you are unauthorized
            </Text>
            <Text className="font-[mon-semi-bold] mt-4">
              Please login to view your wishlists
            </Text>
          </View>

          <View className="items-start">
            <TouchableOpacity
              onPress={handleRouteToLogin}
              className={`${unAuthBtn} bg-primary-red mt-4 active:bg-red-600 active:opacity-90`}
            >
              <Text className={`${btnText}`}>Login</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {isSignedIn && (
        <>
          <View className="items-start ml-2">
            <Text className="font-[mon-bold] mt-4 text-lg">
              This is your wishlist {user?.firstName}
            </Text>
            <Text className="font-[mon-semi-bold] mt-4 text-base">
              Please take a look!
            </Text>
          </View>

          <View className="items-start mt-10">
            <Text>LIST.. LIST.. LIST..</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default WishlistsTabScreen;
