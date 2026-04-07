import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-primary">
      <Text className="text-3xl font-bold">
        Edit src/app/index.tsx to edit this screen.
      </Text>
      <Link href="/(auth)/sign-in">登录</Link>
    </View>
  );
}
