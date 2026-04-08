import { createGroceryItem, listGroceryItems } from "@/lib/server/db-actions";
import { createGroceryItemSchema } from "@/schemas";
import to from "await-to-js";
import z from "zod";

export const GET = async () => {
  const [error, items] = await to(listGroceryItems());
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ items }, { status: 200 });
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const { success, data, error } = createGroceryItemSchema.safeParse(body);
  if (!success) {
    return Response.json({ error: z.treeifyError(error) }, { status: 400 });
  }
  const [createError, item] = await to(createGroceryItem(data));
  if (createError) {
    return Response.json({ error: createError.message }, { status: 500 });
  }
  return Response.json({ item }, { status: 201 });
};
