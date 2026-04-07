import { authClient } from "@/lib/auth-client";
import { Redirect, Stack } from "expo-router";
const HomeRootLayout = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) return null;

  if (!data || !data.user) return <Redirect href="/(auth)/sign-in" />;

  return <Stack />;
};
export default HomeRootLayout;
