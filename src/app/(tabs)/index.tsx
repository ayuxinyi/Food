import { useAuthSession } from "@/hooks/use-auth-session";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

const Home = () => {
  const { data, isLoading } = useAuthSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!data || !data.data?.user) return <Redirect href="/(auth)/sign-in" />;
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
export default Home;
