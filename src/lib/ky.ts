import ky from "ky";

export const api = ky.create({
  prefix: process.env.EXPO_PUBLIC_API_URL,
});
