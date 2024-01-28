import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "@/src/constants/Colors";
import { useRouter } from "expo-router";
import { defaultStyles } from "@/src/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { textField } from "@/src/constants/TaildwindStyles";
import * as ImagePicker from "expo-image-picker";

const ProfileTabScreen = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [firstName, setFirstName] = useState<string | undefined | null>(
    user?.firstName
  );
  const [lastName, setLastName] = useState<string | undefined | null>(
    user?.lastName
  );
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!user || !isSignedIn) return;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  const onSaveUserInfo = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  const onUpdateImage = async () => {
    const imagePicked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!imagePicked.canceled) {
      const base64 = `data:image/png;base64,${imagePicked.assets[0].base64}`;
      user?.setProfileImage({ file: base64 });
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View className="flex flex-row items-center justify-between mt-16 px-3 bg-white">
        <Text className="font-[mon-bold] text-3xl">Profile</Text>
        {isSignedIn && <Ionicons name="notifications-outline" size={28} />}
      </View>
      {/* card without tailwind org */}
      {/* {user && (
        <View style={styles.card}>
          <TouchableOpacity onPress={onUpdateImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {!edit && (
              <View style={styles.editRow}>
                <Text style={{ fontFamily: "mon-bold", fontSize: 22 }}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </View>
            )}
            {edit && (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First Name"
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ""}
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TouchableOpacity onPress={onSaveUserInfo}>
                  <Ionicons
                    name="checkmark-outline"
                    size={24}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text>{email}</Text>
          <Text>Since {user?.createdAt!.toLocaleDateString()}</Text>
        </View>
      )} */}

      {/* card with tailwind (min version) */}
      {user && (
        <View className="rounded-2xl bg-white py-6 mx-6 shadow-md shadow-black flex items-center mt-6">
          <TouchableOpacity className="mb-4" onPress={onUpdateImage}>
            <Image
              source={{ uri: user.imageUrl }}
              className="w-[100px] h-[100px] rounded-full bg-primary-grey"
            />
          </TouchableOpacity>

          <View className="flex-row gap-6">
            {edit ? (
              <View className="flex-row items-center justify-center gap-2">
                <TextInput
                  placeholder={"Firstname"}
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  className={`${textField} w-[100px] font-[mon-medium]`}
                />
                <TextInput
                  placeholder={"Lastname"}
                  value={lastName || ""}
                  onChangeText={setLastName}
                  className={`${textField} w-[100px] font-[mon-medium]`}
                />
                <TouchableOpacity onPress={onSaveUserInfo}>
                  <Ionicons
                    name="save-outline"
                    size={24}
                    color={Colors["primary-blue"]}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row items-center justify-center gap-2">
                <Text className="font-[mon-bold] text-2xl">
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color={Colors["primary-blue"]}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View className="mt-4">
            <Text className="font-[mon-semi-bold]">{email}</Text>
            <Text className="font-[mon-semi-bold] mt-2">
              Since {user?.createdAt!.toLocaleDateString()}
            </Text>
          </View>
        </View>
      )}

      <View className="mt-10 px-36">
        {!isSignedIn ? (
          <Button
            title="Login"
            onPress={() => router.push("/(modals)/(public)/LoginModal")}
            color={Colors["primary-medium-black"]}
          />
        ) : (
          <Button
            title="Log out"
            onPress={() => signOut()}
            color={Colors["primary-red"]}
            accessibilityLabel="Logout btn"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileTabScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    paddingVertical: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors["primary-grey"],
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
  },
  header: {
    fontFamily: "mon-bold",
    fontSize: 24,
  },
  editRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
