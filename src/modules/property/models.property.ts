import { pgTable, pgEnum, uuid, varchar, timestamp, text, boolean, index, integer, decimal, json } from "drizzle-orm/pg-core";
import { Agent } from "../agent/models.agent.js";


export const PropertyType = pgEnum("property_type", ["rent", "sale", "shortlet", "bedrooms", "villa"]);

export interface FileStruct {
  url: string;
  type: 'video' | 'image';
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}


export const Property = pgTable("properties", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 255 }),
  title: varchar("title", { length: 255 }).notNull(), 
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  type: PropertyType("type").notNull(),
  description: text("description"),
  bedrooms: integer("bedrooms").notNull(),
  location: json("location").$type<Coordinate>().notNull(),
  agentId: uuid("agent_id").notNull().references(() => Agent.id), 
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  locationIndex: index("idx_properties_location").on(table.location),
  slugIndex: index("idx_properties_slug").on(table.slug),
  agentIdIndex: index("idx_properties_agent_id").on(table.agentId),
  typeIndex: index("idx_properties_type").on(table.type),
  priceIndex: index("idx_properties_price").on(table.price),
}));