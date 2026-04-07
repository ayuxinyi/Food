import { authClient } from "@/lib/auth-client";
import { queryKeys } from "@/lib/query-keys";

import { signUpSchema } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { output } from "zod";

export type SignUpValues = output<typeof signUpSchema>;
export type SignInValues = Omit<SignUpValues, "name">;

export const useAuthSession = () => {
  return useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: () => authClient.getSession(),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * 账号注册
 * @returns 账号注册的Mutation
 */
export const useAuthSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SignUpValues) => {
      const result = await authClient.signUp.email(input);
      if (result.error) {
        throw new Error(result.error.message || "账号注册失败，请稍后重试");
      }
      return result.data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.all,
      });
    },
    onError(error) {
      console.log("🚀 ~ onError ~ error:", error);
    },
  });
};

/**
 * 账号登录
 * @returns 账号登录的Mutation
 */
export const useAuthSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SignInValues) => {
      const result = await authClient.signIn.email(input);
      if (result.error) {
        throw new Error(result.error.message || "账号登录失败，请稍后重试");
      }
      return result.data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.all,
      });
    },
  });
};

// /**
//  * 更新用户信息
//  * @returns 更新用户信息的Mutation
//  */
// export const useUpdateProfile = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (input: UpdateProfileInput) => {
//       const result = await authClient.updateUser({
//         ...input,
//       });
//       if (result.error) {
//         throw new Error(result.error.message || "账号更新失败，请稍后重试");
//       }
//       return result.data;
//     },
//     async onSuccess() {
//       await queryClient.invalidateQueries({
//         queryKey: queryKeys.auth.session(),
//       });
//       await queryClient.invalidateQueries({
//         queryKey: queryKeys.user.profile(),
//       });
//     },
//   });
// };

// /**
//  * 完成用户注册
//  * @returns 完成用户注册的Mutation
//  */
// export const useCompleteOnboarding = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async () => {
//       const result = await authClient.updateUser({
//         onboardingCompleted: true,
//       });
//       if (result.error) {
//         throw new Error(result.error.message || "账号更新失败，请稍后重试");
//       }
//       return result.data;
//     },
//     async onSuccess() {
//       await queryClient.invalidateQueries({
//         queryKey: queryKeys.auth.session(),
//       });
//       await queryClient.invalidateQueries({
//         queryKey: queryKeys.user.profile(),
//       });
//     },
//   });
// };

export const useAuthSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const result = await authClient.signOut();
      if (result.error) {
        throw new Error(result.error.message || "账号退出登录，请稍后重试");
      }
      return result.data;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.all,
      });
      // 清除所有缓存
      await queryClient.clear();
    },
  });
};

export type SocialSignInStrategy = "google" | "github" | "apple";

export const useSocialSignIn = () => {
  const [loadingStrategy, setLoadingStrategy] =
    useState<SocialSignInStrategy | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: async (strategy: SocialSignInStrategy) => {
      const result = await authClient.signIn.social({
        provider: strategy,
      });
      if (result.error) {
        throw new Error("账号登录失败，请稍后重试");
      }
      router.replace("/");
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.all,
      });
    },
    onError(error) {
      console.error(error);
      Alert.alert("账号登录失败", "账号登录没有完成，请稍后重试。");
    },
    onSettled() {
      setLoadingStrategy(null);
    },
  });

  const handleSocialAuth = useCallback(
    async (strategy: SocialSignInStrategy) => {
      if (loadingStrategy) return;
      setLoadingStrategy(strategy);
      await mutateAsync(strategy);
    },
    [mutateAsync],
  );

  return {
    handleSocialAuth,
    loadingStrategy,
  };
};
