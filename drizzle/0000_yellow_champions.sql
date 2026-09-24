CREATE TYPE "public"."property_type" AS ENUM('rent', 'sale', 'shortlet', 'bedrooms', 'villa');--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255),
	"title" varchar(255) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"type" "property_type" NOT NULL,
	"description" text,
	"bedrooms" integer NOT NULL,
	"location" json NOT NULL,
	"agent_id" uuid NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "agents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "agents_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_properties_location" ON "properties" USING btree ("location");--> statement-breakpoint
CREATE INDEX "idx_properties_slug" ON "properties" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_properties_agent_id" ON "properties" USING btree ("agent_id");--> statement-breakpoint
CREATE INDEX "idx_properties_type" ON "properties" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_properties_price" ON "properties" USING btree ("price");--> statement-breakpoint
CREATE INDEX "idx_agents_email" ON "agents" USING btree ("email");