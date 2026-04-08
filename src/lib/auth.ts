import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { db } from "./server/db/client";
import * as schema from "./server/db/schemas";

const devOrigins =
  process.env.EXPO_PUBLIC_NODE_ENV === "development" ? ["*"] : [];
const isDev = process.env.EXPO_PUBLIC_NODE_ENV === "development";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  plugins: [expo()],
  // 允许的来源，用于认证和授权
  trustedOrigins: [
    "food://", // 基础 scheme
    "food://*", // 所有路径
    "food://**", // 所有子路径
    "http://192.168.31.186:8081",
    "exp://*",
    "exp://192.168.*.*:*/**",
    "exp://**",
    ...devOrigins,
  ],
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_BASE_URL,
  advanced: {
    defaultCookieAttributes: {
      sameSite: isDev ? "lax" : "none",
      secure: !isDev,
      httpOnly: true,
    },
  },
  hooks: {
    before: createAuthMiddleware(async ctx => {
      if (ctx.path.startsWith("/callback")) {
        console.log(process.env.BETTER_AUTH_SECRET);

        console.log("Callback URL:", ctx.request?.url);
        console.log("Cookies:", ctx.request?.headers.get("cookie"));
      }
    }),
    after: createAuthMiddleware(async ctx => {
      if (ctx.path.startsWith("/callback")) {
        const returned = ctx.context?.returned;
        if (returned instanceof Error) {
          console.log({ returned });
          console.log("Error name:", returned.name);
          console.log("Error message:", returned.message);
          console.log("Error stack:", returned.stack);
        } else {
          console.log("Returned:", returned);
        }
      }
    }),
  },
  emailAndPassword: {
    enabled: true, // Enable authentication using email and password.
  },
  account: {
    skipStateCookieCheck: true, // Expo 环境必需！
  },
  socialProviders: {
    github: {
      enabled: true,
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
