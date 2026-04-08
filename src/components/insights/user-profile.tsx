import { useAuthSession, useAuthSignOut } from "@/hooks/use-auth-session";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { Skeleton } from "../ui/skeleton";

const UserProfileSkeleton = () => {
  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-center gap-3">
        {/* 头像骨架 */}
        <Skeleton className="size-12 rounded-full bg-muted animate-pulse" />

        <View className="flex-1 gap-2">
          {/* 标签骨架 */}
          <Skeleton className="h-3 w-16 rounded-full bg-muted" />
          {/* 名字骨架 */}
          <Skeleton className="h-5 w-32 rounded-full bg-muted" />
          {/* 邮箱骨架 */}
          <Skeleton className="h-4 w-48 rounded-full bg-muted" />
        </View>

        {/* 按钮骨架 */}
        <Skeleton className="h-9 w-9 rounded-xl bg-muted" />
      </View>
    </View>
  );
};

const UserProfile = () => {
  const { mutate: signOut } = useAuthSignOut();
  const { data: session, isLoading } = useAuthSession();

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  const email = session?.data?.user?.email;
  const displayName = session?.data?.user?.name || email?.split("@")[0];
  const imageUrl = session?.data?.user?.image;

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-center gap-3">
        <View className="size-12 rounded-full overflow-hidden">
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </View>
        <View className="flex-1">
          <Text className="text-xs uppercase tracking-[1px] text-muted-foreground">
            登录邮箱
          </Text>
          <Text className="mt-1 text-lg font-bold text-foreground">
            {displayName}
          </Text>
          <Text className="text-sm text-muted-foreground">{email}</Text>
        </View>
        <Pressable
          onPress={() => signOut()}
          className="h-9 w-9 items-center justify-center rounded-xl bg-destructive"
        >
          <FontAwesome6 name="right-from-bracket" size={13} color="#d45f58" />
        </Pressable>
      </View>
    </View>
  );
};
export default UserProfile;
