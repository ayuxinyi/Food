import {
  deleteGroceryItem,
  setGroceryItemPurchased,
  updateGroceryItem,
} from "@/lib/server/db-actions";
import to from "await-to-js";

export const DELETE = async (_req: Request, { id }: { id: string }) => {
  const [error] = await to(deleteGroceryItem(id));
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ success: true }, { status: 200 });
};

export const PATCH = async (req: Request, { id }: { id: string }) => {
  const body = await req.json();
  const [error, item] = await to(
    body.quantity
      ? updateGroceryItem(id, body.quantity)
      : setGroceryItemPurchased(id, body.purchased ?? true),
  );
  if (error) {
    return Response.json({ error: "未找到对应的购物项" }, { status: 404 });
  }
  return Response.json({ item }, { status: 200 });
};
