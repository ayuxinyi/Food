import PlannerFormCard from "@/components/planner/planner-form-card";
import PlannerHeroImage from "@/components/planner/planner-hero-image";
import TabScreenBackground from "@/components/ui/tab-screen-background";
import { useGroceryStore } from "@/stores/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useResolveClassNames } from "uniwind";

const Planner = () => {
  const { items } = useGroceryStore();
  const pendingCount = items.filter(item => !item.purchased).length;
  const highPriorityCount = items.filter(
    item => item.priority === "high" && !item.purchased,
  ).length;
  const totalQuantity = items
    .filter(item => !item.purchased)
    .reduce((acc, item) => acc + item.quantity, 0);

  const styles = useResolveClassNames("bg-background");

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-background py-4"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 20,
        gap: 14,
        backgroundColor: styles.backgroundColor,
      }}
      keyboardShouldPersistTaps="handled"
      bottomOffset={40}
    >
      <TabScreenBackground />
      <View className="gap-4 rounded-3xl border border-border bg-card/70 p-5">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              增加商品
            </Text>
            <Text className="mt-1 text-3xl font-bold leading-9 text-foreground">
              计划更从容，购物更轻松。
            </Text>
            <Text className="mt-2 text-sm leading-5 text-muted-foreground">
              分类、数量、优先级，一站式管理你的购物清单。
            </Text>
          </View>

          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary">
            <FontAwesome6
              name="wand-magic-sparkles"
              size={18}
              color="#ffffff"
            />
          </View>
        </View>
        <View className="flex-row gap-2">
          <View className="flex-1 rounded-2xl border border-border bg-background/80 p-3">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              待处理
            </Text>
            <Text className="mt-1 text-xl font-bold text-foreground">
              {pendingCount}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl border border-border bg-background/80 p-3">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              高优先级
            </Text>
            <Text className="mt-1 text-xl font-bold text-foreground">
              {highPriorityCount}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl border border-border bg-background/80 p-3">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              数量总和
            </Text>
            <Text className="mt-1 text-xl font-bold text-foreground">
              {totalQuantity}
            </Text>
          </View>
        </View>
      </View>
      <PlannerHeroImage />
      <View className="px-1">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
          构建您的购物清单
        </Text>
        <Text className="mt-1 text-sm text-muted-foreground">
          为您的购物清单添加商品。
        </Text>
      </View>
      <PlannerFormCard />
    </KeyboardAwareScrollView>
  );
};
export default Planner;
