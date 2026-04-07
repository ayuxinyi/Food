import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_BASE_URL, // Base URL of your Better Auth backend.
  plugins: [
    expoClient({
      scheme: "food",
      storagePrefix: "food",
      storage: SecureStore,
    }),
  ],
});
