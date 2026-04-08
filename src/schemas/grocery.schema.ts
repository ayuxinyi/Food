import z from "zod";

export const createGroceryItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "请输入商品名称")
    .max(50, "商品名称最多50个字符"),
  quantity: z.number().int().min(1, "商品至少需要1个"),
  priority: z.enum(["high", "medium", "low"]).default("medium"),
  category: z.string().trim().min(1, "请输入商品分类"),
});

export type CreateGroceryItemInput = z.infer<typeof createGroceryItemSchema>;
