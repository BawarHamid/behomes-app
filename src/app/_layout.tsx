import Colors from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, SignedIn, useAuth } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import BookingModalHeaderText from "../components/booking/BookingModalHeaderText";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
// const { isLoaded, isSignedIn } = useAuth();
// const router = useRouter();

// useEffect(() => {
//   console.log("Is The User Logged In?", isSignedIn);
//   if (isLoaded && !isSignedIn) {
//     router.push("/(modals)/(public)/SelectAuthModal");
//   }
// }, [isLoaded]);

// useEffect(() => {
//   if (!isLoaded) return;

//   console.log("User changed: ", isSignedIn);

//   if (isSignedIn) {
//     router.replace("/(tabs)/profile");
//   } else if (!isSignedIn) {
//     router.replace("/(modals)/(public)/SelectAuthModal");
//   }
// }, [isSignedIn]);

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "mon-light": require("../../assets/fonts/Montserrat-Light.ttf"),
    "mon-normal": require("../../assets/fonts/Montserrat-Regular.ttf"),
    "mon-medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "mon-semi-bold": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      {/* tjek med IOS StatusBar - padding vil muligvis ændre sig. safeareaview skal bruges i stedet for view?. */}
      <StatusBar style="dark" />
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  // Automatically open login if user is not authenticated
  // useEffect(() => {
  //   console.log("Is The User Logged In?", isSignedIn);
  //   if (!isSignedIn) {
  //     router.push("/(modals)/(public)/SelectAuthModal");
  //   } else if (isSignedIn) {
  //     router.replace("/(tabs)/profile");
  //   }
  // }, [isLoaded]);

  // useEffect(() => {
  //   console.log("Is The User Logged In?", isSignedIn);
  //   if (isLoaded && !isSignedIn) {
  //     router.push("/(modals)/(public)/SelectAuthModal");
  //   }
  // }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    // console.log("User changed: ", isSignedIn);
    if (isSignedIn) {
      router.replace("/(tabs)/");
    } else if (!isSignedIn) {
      router.push("/(modals)/(public)/SelectAuthModal");
    }
  }, [isSignedIn]);

  return (
    <Stack>
      {/* Stack for the alle the tabs thats grouped */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Stack-Screen for Selecting how to login */}
      <Stack.Screen
        name="(modals)/(public)/SelectAuthModal"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons
                name="close-outline"
                size={28}
                color={Colors["primary-blue"]}
              />
            </TouchableOpacity>
          ),
          title: "Welcome",
          presentation: "modal",
          headerTitleStyle: {
            fontFamily: "mon-semi-bold",
          },
          headerTitleAlign: "center",
        }}
      />
      {/* Stack-Screen for LoginModal */}
      <Stack.Screen
        name="(modals)/(public)/LoginModal"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons
                name="close-outline"
                size={28}
                color={Colors["primary-blue"]}
              />
            </TouchableOpacity>
          ),
          title: "Login",
          presentation: "modal",
          headerTitleStyle: {
            fontFamily: "mon-semi-bold",
          },
          headerTitleAlign: "center",
        }}
      />
      {/* Stack-Screen for RegisterModal/SignUp */}
      <Stack.Screen
        name="(modals)/(public)/RegisterModal"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons
                name="close-outline"
                size={28}
                color={Colors["primary-blue"]}
              />
            </TouchableOpacity>
          ),
          title: "Register",
          presentation: "modal",
          headerTitleStyle: {
            fontFamily: "mon-semi-bold",
          },
          headerTitleAlign: "center",
        }}
      />
      {/* Stack-Screen for ResetPassword */}
      <Stack.Screen
        name="(modals)/(public)/ResetPasswordModal"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons
                name="close-outline"
                size={28}
                color={Colors["primary-blue"]}
              />
            </TouchableOpacity>
          ),
          title: "Reset Password",
          animation: "slide_from_right",
          presentation: "modal",
          headerTitleStyle: {
            fontFamily: "mon-semi-bold",
          },
          headerTitleAlign: "center",
        }}
      />
      {/* Stack-Screen for viewing a palce by clicking */}
      <Stack.Screen
        name="rental/[id]"
        options={{
          headerTitle: "",
          headerTitleStyle: {
            fontFamily: "mon-semi-bold",
          },
        }}
      />
      {/* Stack-Screen for making a booking */}
      <Stack.Screen
        name="(modals)/(auth)/BookingModal"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              className="border-gray-300 rounded-full border bg-white p-1"
              onPress={router.back}
            >
              <Ionicons
                name="close-outline"
                size={20}
                color={Colors["primary-blue"]}
              />
            </TouchableOpacity>
          ),
          animation: "fade",
          presentation: "transparentModal",
          headerTransparent: true,
          headerTitle: (props) => <BookingModalHeaderText />,
        }}
      />
    </Stack>
  );
}
