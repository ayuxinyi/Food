import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const groceryItemPriorities = ["high", "medium", "low"] as const;
export type GroceryItemPriority = (typeof groceryItemPriorities)[number];
export const groceryItemPriorityEnum = pgEnum(
  "grocery_item_priority",
  groceryItemPriorities,
);

export const groceryItemsTable = pgTable("grocery_items", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  category: text().notNull(),
  quantity: integer().notNull().default(1),
  purchased: boolean().default(false).notNull(),
  priority: groceryItemPriorityEnum().default("medium").notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export type GroceryItem = typeof groceryItemsTable.$inferSelect;
export type GroceryItemInsert = typeof groceryItemsTable.$inferInsert;
