import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";

const devOrigins =
  process.env.EXPO_PUBLIC_NODE_ENV === "development" ? ["*"] : [];

export const auth = betterAuth({
  plugins: [expo()],
  // 允许的来源，用于认证和授权
  trustedOrigins: [
    "cashory://",
    "cashory.exp.direct://",
    "mybettertapp://",
    "react-native-project://",
    ...devOrigins,
  ],
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_BASE_URL,
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },
  emailAndPassword: {
    enabled: true, // Enable authentication using email and password.
  },
});
