import { useGroceryStore } from "@/stores/grocery-store";
import { Text, View } from "react-native";

const ListHeroCard = () => {
  const { items } = useGroceryStore();

  const completedCount = items.filter(item => item.purchased).length;
  const pendingCount = items.length - completedCount;
  const completedPercentage = items.length
    ? Math.round((completedCount / items.length) * 100)
    : 0;

  return (
    <View className="rounded-3xl bg-primary p-5">
      <Text className="font-semibold font-family-semibold text-primary-foreground/70 text-sm">
        今天
      </Text>
      <Text className="mt-1 text-3xl font-extrabold text-primary-foreground">
        您的商品篮
      </Text>
      <Text className="mt-1 text-sm text-primary-foreground/80">
        {pendingCount} 待处理 · {completedCount} 已购买
      </Text>
      <View className="mt-4 overflow-hidden rounded-full bg-white/50">
        <View
          className="h-2 rounded-full bg-secondary"
          style={{ width: `${completedPercentage}%` }}
        />
      </View>
    </View>
  );
};
export default ListHeroCard;
