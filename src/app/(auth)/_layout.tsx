import { useAuthSession } from "@/hooks/use-auth-session";
import { Stack } from "expo-router";

const AuthRouteLayout = () => {
  const { data: session, isLoading } = useAuthSession();

  if (isLoading) return null;

  // if (session && session?.data?.user) return <Redirect href="/" />;

  return <Stack screenOptions={{ headerShown: false }} />;
};
export default AuthRouteLayout;
