import { api } from "@/lib/ky";
import { GroceryItem } from "@/lib/server/db/schemas";
import { CreateGroceryItemInput } from "@/schemas";
import { create } from "zustand";

export type GroceryCategory =
  | "Produce"
  | "Dairy"
  | "Bakery"
  | "Pantry"
  | "Snacks";

interface GroceryStore {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateGroceryItemInput) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
}

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,
  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api("/api/items").json<{
        items?: GroceryItem[];
        error?: string;
      }>();
      if (res.error) throw new Error(res.error);
      set({ items: res.items || [], isLoading: false });
    } catch (error) {
      console.error(error);
      set({ error: "加载购物项失败" });
    } finally {
      set({ isLoading: false });
    }
  },
  addItem: async input => {
    try {
      set({ error: null });
      const res = await api.post("/api/items", { json: input }).json<{
        item?: GroceryItem;
        error?: string;
      }>();
      if (res.error) throw new Error(res.error);
      set(state => ({
        items: [res.item!, ...state.items],
      }));
    } catch (error) {
      set({ error: "添加购物项失败" });
    }
  },
  togglePurchased: async id => {
    try {
      const currentItem = get().items.find(item => item.id === id);
      if (!currentItem) return;
      const nextPurchased = !currentItem.purchased;
      set({ error: null });
      const res = await api
        .patch(`/api/items/${id}`, { json: { purchased: nextPurchased } })
        .json<{
          item?: GroceryItem;
          error?: string;
        }>();
      if (res.error) throw new Error(res.error);
      set(state => ({
        items: state.items.map(item => (item.id === id ? res.item! : item)),
      }));
    } catch (error) {
      set({ error: "更新购物项失败" });
    }
  },
  updateQuantity: async (id, quantity) => {
    console.log(id, quantity);
    try {
      const currentItem = get().items.find(item => item.id === id);
      if (!currentItem) return;
      set({ error: null });
      const nextQuantity = Math.max(quantity, 1);
      console.log("🚀 ~ nextQuantity:", nextQuantity);
      const res = await api
        .patch(`/api/items/${id}`, { json: { quantity: nextQuantity } })
        .json<{
          item?: GroceryItem;
          error?: string;
        }>();
      if (res.error) throw new Error(res.error);
      set(state => ({
        items: state.items.map(item => (item.id === id ? res.item! : item)),
      }));
    } catch (error) {
      console.error(error);
      set({ error: "更新购物项失败" });
    }
  },
  removeItem: async id => {
    try {
      set({ error: null });
      const res = await api.delete(`/api/items/${id}`).json<{
        success?: boolean;
        error?: string;
      }>();
      if (res.error) throw new Error(res.error);
      set(state => ({
        items: state.items.filter(item => item.id !== id),
      }));
    } catch (error) {
      set({ error: "删除购物项失败" });
    }
  },
  clearPurchased: async () => {
    try {
      set({ error: null });
      const res = await api.post("/api/items/clear").json<{
        success?: boolean;
        error?: string;
      }>();
      if (res.error) throw new Error(res.error);
      set(state => ({
        items: state.items.filter(item => !item.purchased),
      }));
    } catch (error) {
      set({ error: "清除已购买项失败" });
    }
  },
}));
