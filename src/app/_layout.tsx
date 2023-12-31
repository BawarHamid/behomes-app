import Colors from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
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
      publishableKey={clerkPublishableKey!}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/LoginModal");
    }
  }, [isLoaded]);

  return (
    <Stack>
      {/* Stack for the alle the tabs thats grouped */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Stack-Screen for LoginModal */}
      <Stack.Screen
        name="(modals)/LoginModal"
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
        name="(modals)/RegisterModal"
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
      {/* Stack-Screen for viewing a palce by id */}
      <Stack.Screen
        name="rental/[id]"
        options={{
          animation: "fade",
          title: "",
          headerTitleStyle: {
            fontFamily: "mon-semi-bold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons
                name="close-outline"
                size={28}
                color={Colors["primary-blue"]}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {/* Stack-Screen for making a booking */}
      <Stack.Screen
        name="(modals)/BookingModal"
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
          animation: "fade",
          presentation: "transparentModal",
          title: "Start booking",
          headerTitleStyle: {
            fontFamily: "mon-semi-bold",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
