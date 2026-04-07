import { SocialSignInStrategy } from "@/hooks/use-auth-session";
import { cn } from "@/lib/utils";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ComponentProps, FC } from "react";
import { ImageSourcePropType, Pressable, Text, View } from "react-native";

interface SocialButtonProps {
  loadingStrategy: SocialSignInStrategy | null;
  onPress: () => void;
  source?: ImageSourcePropType;
  iconName?: ComponentProps<typeof FontAwesome>["name"];
  label: string;
  className?: string;
}

const SocialButton: FC<SocialButtonProps> = ({
  onPress,
  source,
  iconName,
  loadingStrategy,
  label,
  className,
}) => {
  const isGoogleClicked = loadingStrategy === "google";
  const isGithubClicked = loadingStrategy === "github";
  const isAppleClicked = loadingStrategy === "apple";
  const isLoading = isAppleClicked || isGoogleClicked || isGithubClicked;

  return (
    <Pressable
      className={cn(
        "mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90",
        className,
        isLoading && "opacity-70",
      )}
      disabled={isLoading}
      onPress={onPress}
    >
      {iconName && (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
          <FontAwesome name={iconName} size={24} color="#111" />
        </View>
      )}
      {source && (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
          <Image source={source} style={{ width: 20, height: 20 }} />
        </View>
      )}

      <Text
        className={cn(
          "ml-3 flex-1  font-semibold text-card-foreground text-base",
          label === "苹果" && "text-background",
        )}
      >
        {isGoogleClicked ? `登录中...` : `${label}账号登录`}
      </Text>

      <FontAwesome name="angle-right" size={18} color="#5f6e66" />
    </Pressable>
  );
};
export default SocialButton;
