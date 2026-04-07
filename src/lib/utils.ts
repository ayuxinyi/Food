import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * expo + uniwind 专用 cn
 * 支持 clsx 语法 + 自动 twMerge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
