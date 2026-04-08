import { useAuthSession, useAuthSignOut } from "@/hooks/use-auth-session";
import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { data } = useAuthSession();
  console.log("🚀 ~ Index ~ data:", data);
  const { mutate } = useAuthSignOut();

  return (
    <View className="flex-1 bg-primary">
      <Text className="text-3xl font-bold">
        Edit src/app/index.tsx to edit this screen.
      </Text>
      <Link href="/(auth)/sign-in">登录</Link>
      <Button title="退出登录" onPress={() => mutate()} />
    </View>
  );
}
