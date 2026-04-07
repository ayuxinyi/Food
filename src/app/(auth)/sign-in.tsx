import SocialButton from "@/components/auth/social-button";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { useSocialSignIn } from "@/hooks/use-auth-session";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";
const SignIn = () => {
  const { handleSocialAuth, loadingStrategy } = useSocialSignIn();

  return (
    <SafeAreaView
      className="flex-1  bg-primary dark:bg-secondary"
      // 设置安全区域为顶部
      edges={["top"]}
    >
      <View className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-primary/80 dark:bg-background/40" />
      <View className="absolute -right-18.5 top-40 h-72 w-72 rounded-full bg-primary/70 dark:bg-background/35" />

      <View className="px-6 pt-2">
        <Text className="text-center text-5xl font-sans-bold text-primary-foreground tracking-tight uppercase  dark:text-foreground">
          Food
        </Text>
        <Text className="mt-1 text-center text-[14px] text-primary-foreground/80 dark:text-foreground/75">
          更聪明地规划，更开心地购物。
        </Text>
        <View className="mt-6 rounded-[30px] border border-white/20 bg-white/10 p-3">
          <Image
            source={require("../../../assets/images/auth.png")}
            contentFit="contain"
            style={{ width: "100%", height: 220 }}
          />
        </View>
      </View>
      <ScrollView
        className="mt-6 flex-1 rounded-t-[36px] bg-card px-6 pb-8 pt-6"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="self-center rounded-full bg-secondary px-3 py-1">
          <Text className="text-sm font-semibold  text-secondary-foreground">
            欢迎回来
          </Text>
        </View>
        <Text className="mt-2 text-center text-xs text-muted-foreground">
          选择一个社交媒体服务商，立即开始您的个性化购物体验。
        </Text>
        <View className="mt-6">
          <SocialButton
            loadingStrategy={loadingStrategy}
            onPress={() => {
              handleSocialAuth("google");
            }}
            source={require("../../../assets/images/google.png")}
            label="谷歌"
          />
          <SocialButton
            loadingStrategy={loadingStrategy}
            onPress={() => {
              handleSocialAuth("github");
            }}
            iconName="github"
            label="Github"
          />
          <SocialButton
            loadingStrategy={loadingStrategy}
            onPress={() => {
              handleSocialAuth("apple");
            }}
            className="border-foreground bg-foreground"
            iconName="apple"
            label="苹果"
          />
        </View>
        <Text className="mt-3 text-center text-sm leading-5 text-muted-foreground">
          继续即表示您同意我们的条款和隐私政策。
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;
