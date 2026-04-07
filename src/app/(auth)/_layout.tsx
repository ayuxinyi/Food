import { authClient } from "@/lib/auth-client";
import { Redirect, Stack } from "expo-router";

const AuthRouteLayout = () => {
  const { data, isPending } = authClient.useSession();
  console.log("🚀 ~ AuthRouteLayout ~ isPending:", isPending);
  console.log("🚀 ~ AuthRouteLayout ~ data:", data);

  if (isPending) return null;

  if (data && data.user) return <Redirect href="/" />;

  return <Stack screenOptions={{ headerShown: false }} />;
};
export default AuthRouteLayout;
