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
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
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
}
