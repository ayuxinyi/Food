CREATE TYPE "public"."grocery_item_priority" AS ENUM('high', 'medium', 'low');--> statement-breakpoint
CREATE TABLE "grocery_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"purchased" boolean DEFAULT false NOT NULL,
	"priority" "grocery_item_priority" DEFAULT 'medium' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
