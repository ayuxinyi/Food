import { clearPurchasedItems } from "@/lib/server/db-actions";
import to from "await-to-js";

export const POST = async () => {
  const [error] = await to(clearPurchasedItems());
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ success: true }, { status: 200 });
};
