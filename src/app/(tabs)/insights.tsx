import { useGroceryStore } from "@/stores/grocery-store";
import { ScrollView, Text } from "react-native";

const Insights = () => {
  const { items } = useGroceryStore();
  const pendingItems = items.filter(item => !item.purchased).length;
  const highPriorityCount = items.filter(
    item => item.priority === "high" && !item.purchased,
  ).length;
  const totalQuantity = items
    .filter(item => !item.purchased)
    .reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text>Insights</Text>
    </ScrollView>
  );
};
export default Insights;
