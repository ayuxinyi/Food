import { useAppTheme } from "@/hooks/use-app-theme";
import { authClient } from "@/lib/auth-client";
import { NativeTabs } from "expo-router/unstable-native-tabs";

const TabLayout = () => {
  const { data, isPending } = authClient.useSession();

  const { isDark } = useAppTheme();
  const tabTintColor = isDark ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)";

  // if (isPending) return null;

  // if (!data || !data.user) return <Redirect href="/(auth)/sign-in" />;

  return (
    <NativeTabs tintColor={tabTintColor}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>商品列表</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: "list.bullet.clipboard",
            selected: "list.bullet.clipboard.fill",
          }}
          md="list"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="planner">
        <NativeTabs.Trigger.Icon
          sf={{ default: "plus.circle", selected: "plus.circle.fill" }}
          md="add"
        />
        <NativeTabs.Trigger.Label>添加商品</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="insights">
        <NativeTabs.Trigger.Icon
          sf={{ default: "chart.bar", selected: "chart.bar.fill" }}
          md="analytics"
        />
        <NativeTabs.Trigger.Label>数据中心</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};
export default TabLayout;
