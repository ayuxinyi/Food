import { useGroceryStore } from "@/stores/grocery-store";
import { Pressable, Text } from "react-native";

export default function ClearCompletedButton() {
  const { clearPurchased } = useGroceryStore();

  return (
    <Pressable className="rounded-2xl bg-primary py-3" onPress={clearPurchased}>
      <Text className="text-center text-base font-semibold text-primary-foreground">
        清除已完成商品
      </Text>
    </Pressable>
  );
}
