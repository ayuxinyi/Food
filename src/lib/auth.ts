import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";

const devOrigins =
  process.env.EXPO_PUBLIC_NODE_ENV === "development" ? ["*"] : [];

export const auth = betterAuth({
  plugins: [expo()],
  // 允许的来源，用于认证和授权
  trustedOrigins: [
    "food://", // 基础 scheme
    "food://*", // 所有路径
    "food://**", // 所有子路径
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
  socialProviders: {
    github: {
      enabled: true,
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
