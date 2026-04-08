import "@/global.css";
import { AppThemeProvider } from "@/providers/app-theme-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_700Bold_Italic,
} from "@expo-google-fonts/plus-jakarta-sans";
import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

Sentry.init({
  dsn: "https://b379db415b5280fdc3fe4d32f37506ac@o4509864537030656.ingest.us.sentry.io/4511182969241600",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: false,
  integrations: [Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_700Bold_Italic,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <ReactQueryProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppThemeProvider>
          <KeyboardProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </KeyboardProvider>
        </AppThemeProvider>
      </GestureHandlerRootView>
    </ReactQueryProvider>
  );
});
