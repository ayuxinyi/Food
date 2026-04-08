import { cn } from "@/lib/utils";
import { FontAwesome6 } from "@expo/vector-icons";
import * as Sentry from "@sentry/react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SentryFeedBackButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        right: 16,
        zIndex: 1000,
        bottom: insets.bottom + 80,
      }}
    >
      <Pressable
        onPress={() => Sentry.showFeedbackWidget()}
        className={cn(
          "flex-row items-center gap-2 rounded-full border px-4 py-3 border-border bg-card",
        )}
      >
        <FontAwesome6 name="comment-dots" size={12} color="hsl(136 42% 92%)" />
        <Text
          className={cn(
            "text-sm font-semibold font-family-semibold text-foreground",
          )}
        >
          提交反馈
        </Text>
      </Pressable>
    </View>
  );
};
export default SentryFeedBackButton;
