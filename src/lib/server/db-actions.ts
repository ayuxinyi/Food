import { CreateGroceryItemInput } from "@/schemas";
import { to } from "await-to-js";
import { desc, eq } from "drizzle-orm";
import { db } from "./db/client";
import { groceryItemsTable } from "./db/schemas";

export const listGroceryItems = async () => {
  const [error, rows] = await to(
    db
      .select()
      .from(groceryItemsTable)
      .orderBy(desc(groceryItemsTable.createdAt)),
  );
  if (error) {
    throw new Error(error.message || "获取购物列表失败，请稍后重试");
  }
  return rows;
};

export const createGroceryItem = async (input: CreateGroceryItemInput) => {
  const [error, row] = await to(
    db
      .insert(groceryItemsTable)
      .values({
        ...input,
        quantity: Math.max(1, input.quantity),
        purchased: false,
      })
      .returning(),
  );
  if (error) {
    throw new Error(error.message || "创建购物项失败，请稍后重试");
  }
  return row[0];
};

export const setGroceryItemPurchased = async (
  id: string,
  purchased: boolean,
) => {
  const [error, row] = await to(
    db
      .update(groceryItemsTable)
      .set({ purchased })
      .where(eq(groceryItemsTable.id, id))
      .returning(),
  );
  if (error) {
    return null;
  }
  return row[0];
};

export const updateGroceryItem = async (id: string, quantity: number) => {
  const [error, row] = await to(
    db
      .update(groceryItemsTable)
      .set({
        quantity: Math.max(1, quantity),
      })
      .where(eq(groceryItemsTable.id, id))
      .returning(),
  );
  if (error) {
    return null;
  }
  return row[0];
};

export const deleteGroceryItem = async (id: string) => {
  const [error, row] = await to(
    db
      .delete(groceryItemsTable)
      .where(eq(groceryItemsTable.id, id))
      .returning(),
  );
  if (error) {
    throw new Error(error.message || "删除购物项失败，请稍后重试");
  }
  return row[0];
};

export const clearPurchasedItems = async () => {
  const [error, row] = await to(
    db
      .delete(groceryItemsTable)
      .where(eq(groceryItemsTable.purchased, true))
      .returning(),
  );
  if (error) {
    throw new Error(error.message || "清除已购买项失败，请稍后重试");
  }
  return row[0];
};
