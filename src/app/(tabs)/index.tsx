import { useGroceryStore } from "@/stores/grocery-store";
import { useEffect } from "react";
import { Text, View } from "react-native";

const Home = () => {
  const { loadItems, items } = useGroceryStore();

  useEffect(() => {
    loadItems();
  }, []);

  console.log(items);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
export default Home;
