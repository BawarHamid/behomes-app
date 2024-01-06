import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import {
  btnAuth,
  btnText,
  authTextInput,
} from "@/src/constants/TaildwindStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";

const ResetPasswordModal = () => {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [resetVerificationCode, setResetVerificationCode] =
    useState<string>("");
  const [emailExisting, setEmailExisting] = useState(false);
  const { signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPasswordRequest = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      // Hvis reset_password_email_code bliver sendt, så bliver anden ui-skærm vist.
      setEmailExisting(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  const handleResetOfPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "The passwords do not match, try again!", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        return;
      }

      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: resetVerificationCode,
        password: newPassword,
      });
      console.log(result);
      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically after password is reset.
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="mt-[26px] px-[22px]">
      <Spinner visible={loading} />

      {!emailExisting && (
        <>
          {/* title - paragraph area */}
          <View className="items-center mt-5">
            <Text className="font-[mon-bold] text-2xl">
              Get verification code
            </Text>
            <Text className="font-[mon-medium] text-lg whitespace-nowrap mt-1">
              Enter your e-mail below to reset your password
            </Text>
          </View>
          <View className="mt-6">
            <TextInput
              value={email}
              placeholder="Email address"
              className={`${authTextInput} pl-5`}
              onChangeText={setEmail}
            />
          </View>
          <View className="mt-6">
            <TouchableOpacity
              className={`${btnAuth} bg-primary-blue`}
              onPress={handleResetPasswordRequest}
            >
              <Text className={`${btnText}`}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {emailExisting && (
        <>
          {/* title - paragraph area */}
          <View className="items-center mt-5">
            <Text className="font-[mon-bold] text-2xl">
              Start reset process
            </Text>
            <Text className="font-[mon-medium] text-lg whitespace-nowrap mt-1">
              Enter your new password below and confirm it
            </Text>
          </View>
          {/* form-view start */}
          <View className="mt-16">
            {/* input for verification code */}
            <View>
              <TextInput
                autoCapitalize="none"
                placeholder="Verification code"
                className={`${authTextInput} pl-5`}
                value={resetVerificationCode}
                onChangeText={setResetVerificationCode}
              />
            </View>
            {/* input for password with on/off-hide */}
            <View className="mt-3">
              <TextInput
                secureTextEntry={!showPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                className={`${authTextInput} pl-4`}
                placeholder="Password"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color={Colors["primary-blue"]}
                onPress={toggleShowPassword}
                style={styles.eyeIcon}
              />
            </View>
            {/* input for confirm password with on/off-hide */}
            <View className="mt-3">
              <TextInput
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className={`${authTextInput} pl-4`}
                placeholder="Confirm password"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color={Colors["primary-blue"]}
                onPress={toggleShowPassword}
                style={styles.eyeIcon}
              />
            </View>
            <View className="mt-6">
              <TouchableOpacity
                className={`${btnAuth} bg-primary-yellow active:bg-primary-medium-black active:opacity-80`}
                onPress={handleResetOfPassword}
                disabled={
                  !newPassword ||
                  !confirmPassword ||
                  !resetVerificationCode ||
                  (!newPassword && !confirmPassword && !resetVerificationCode)
                }
              >
                <Text className="text-base font-[mon-bold] text-primary-black">
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ResetPasswordModal;

const styles = StyleSheet.create({
  iconTop: {
    marginBottom: 10,
  },
  eyeIcon: {
    position: "absolute",
    top: 11,
    right: 12,
    zIndex: 1,
  },
});
