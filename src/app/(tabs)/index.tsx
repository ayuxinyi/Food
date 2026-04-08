import CompletedItem from "@/components/list/completed-items";
import ListHeroCard from "@/components/list/list-hero-card";
import PendingItemCard from "@/components/list/pending-item-card";
import TabScreenBackground from "@/components/ui/tab-screen-background";
import { useGroceryStore } from "@/stores/grocery-store";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

const ListScreen = () => {
  const { loadItems, items } = useGroceryStore();

  useEffect(() => {
    loadItems();
  }, []);

  const pendingItems = items.filter(item => !item.purchased);

  return (
    <FlatList
      data={pendingItems}
      className="flex-1 bg-background"
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PendingItemCard item={item} />}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      ListHeaderComponent={
        <View style={{ gap: 14 }}>
          <TabScreenBackground />
          <ListHeroCard />
          <View className="flex-row items-center justify-between px-1">
            <Text className="text-sm font-semibold font-family-semibold text-muted-foreground">
              商品列表
            </Text>
            <Text className="text-sm text-muted-foreground">
              {pendingItems.length} 待处理
            </Text>
          </View>
        </View>
      }
      ListFooterComponent={<CompletedItem />}
      ListEmptyComponent={<Text>暂无商品</Text>}
      contentInsetAdjustmentBehavior="automatic"
    />
  );
  // return (
  //   <ScrollView
  //     className="flex-1 bg-background py-4"
  //     showsVerticalScrollIndicator={false}
  //     contentContainerStyle={{ padding: 20, gap: 14 }}
  //     contentInsetAdjustmentBehavior="automatic"
  //   >
  //     <TabScreenBackground />
  //     <ListHeroCard />
  //     <View className="flex-row items-center justify-between px-1">
  //       <Text className="text-sm font-semibold font-family-semibold text-muted-foreground">
  //         商品列表
  //       </Text>
  //       <Text className="text-sm text-muted-foreground">
  //         {pendingItems.length} 待处理
  //       </Text>
  //     </View>
  //     {pendingItems.map(item => (
  //       <PendingItemCard key={item.id} item={item} />
  //     ))}
  //     <CompletedItem />
  //   </ScrollView>
  // );
};
export default ListScreen;
