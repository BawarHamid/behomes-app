import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/LoginModal"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="close-outline" size={28} />
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
    </Stack>
  );
}