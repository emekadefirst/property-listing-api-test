import { pgTable, pgEnum, uuid, varchar, timestamp, text, boolean, index } from "drizzle-orm/pg-core";

export const PropertyType = pgEnum("property_type", ["rent", "sale", "shortlet", "bedrooms", "villa"]);

export const Property = pgTable("properties", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("title", { length: 255 }).notNull().unique(),
    price

})