import { db } from "../../core/db.core.js";
import { and, count, desc, ilike, or, eq, sql } from "drizzle-orm";
import { Property } from "./models.property.js";
import { Agent } from "../agent/models.agent.js";
import { AppError } from "../../error/index.js";
import { PropertyQueryParams, CreatePropertyInput, UpdatePropertyInput, PropertyObject, PropertyPaginatedResponse } from "./types.property.js";

export class PropertyRepository {
  async fetch(params: PropertyQueryParams): Promise<PropertyPaginatedResponse> {
    const { id, location, isAvailable, type, search, page = 1, pageSize = 10 } = params;
    const offset = (page - 1) * pageSize;
    const filters = [];

    if (id) filters.push(eq(Property.id, id));
    if (type) filters.push(eq(Property.type, type));
    if (isAvailable) filters.push(eq(Property.isAvailable, isAvailable));
    if (search) {
      filters.push(
        or(
          ilike(Agent.name, `%${search}%`),
          ilike(Agent.phone, `%${search}%`),
          ilike(Agent.email, `%${search}%`),
          ilike(Property.title, `%${search}%`),
          ilike(Property.slug, `%${search}%`),
        )
      );
    }

    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    // Calculate distance if location is provided
    const distanceColumn = location
      ? sql<number>`
          ST_DistanceSphere(
            ST_GeomFromText(
              CONCAT('POINT(', 
                CAST(${Property.location}->>'longitude' AS FLOAT), 
                ' ', 
                CAST(${Property.location}->>'latitude' AS FLOAT), 
              ')'), 
              4326
            ),
            ST_GeomFromText(
              CONCAT('POINT(${location.longitude} ${location.latitude})'), 
              4326
            )
          ) / 1000
        `.as('distance')
      : sql<null>`NULL`.as('distance');

    const [data, totalCount] = await Promise.all([
      db
        .select({
          id: Property.id,
          slug: Property.slug,
          title: Property.title,
          price: Property.price,
          type: Property.type,
          description: Property.description,
          bedrooms: Property.bedrooms,
          location: Property.location,
          isAvailable: Property.isAvailable,
          createdAt: Property.createdAt,
          updatedAt: Property.updatedAt,
          distance: distanceColumn,
          agentId: Property.agentId,
          agent: {
            id: Agent.id,
            name: Agent.name,
            email: Agent.email,
            phone: Agent.phone,
          },
        })
        .from(Property)
        .innerJoin(Agent, eq(Property.agentId, Agent.id))
        .where(whereClause)
        .orderBy(
          ...(location
            ? [sql`${distanceColumn} ASC`]
            : [desc(Property.createdAt), desc(Property.updatedAt)]),
        )
        .limit(pageSize)
        .offset(offset),
      db.select({ count: count() })
        .from(Property)
        .innerJoin(Agent, eq(Property.agentId, Agent.id))
        .where(whereClause),
    ]);

    return {
      page,
      pageSize,
      total: Number(totalCount[0]?.count || 0),
      data: data.map(item => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
        distance: item.distance ? Math.round(item.distance * 100) / 100 : null,
      })),
    };
  }

  private async toPropertyObject(property: typeof Property.$inferSelect): Promise<PropertyObject> {
    const [agent] = await db
      .select({ id: Agent.id, name: Agent.name, email: Agent.email, phone: Agent.phone })
      .from(Agent)
      .where(eq(Agent.id, property.agentId));

    return {
      ...property,
      agent: agent!,
      createdAt: property.createdAt.toISOString(),
      updatedAt: property.updatedAt.toISOString(),
    };
  }

  async create(data: CreatePropertyInput): Promise<PropertyObject> {
    try {
      const [property] = await db.insert(Property).values(data).returning();
      if (!property) throw new AppError("Failed to create property", 500);
      return this.toPropertyObject(property);
    } catch (error) {
      if (error instanceof AppError) {
        console.log(`Database Error: ${error}`);
        throw error;
      }
      throw new AppError("Database error while creating property", 500);
    }
  }

  async update(id: string, data: UpdatePropertyInput): Promise<PropertyObject> {
    try {
      const [property] = await db
        .update(Property)
        .set(data)
        .where(eq(Property.id, id))
        .returning();
      if (!property) throw new AppError("Property not found or update failed");
      return this.toPropertyObject(property);
    } catch (error) {
      console.log(`Database Error: ${error}`);
      throw new AppError(`Database Error: ${error}`);
    }
  }

  async getById(id: string): Promise<PropertyObject | null> {
    try {
      const [property] = await db
        .select()
        .from(Property)
        .where(eq(Property.id, id))
        .limit(1);
      return property ? this.toPropertyObject(property) : null;
    } catch (error) {
      console.error(`Database Error: ${error}`);
      throw error;
    }
  }

  async delete(id: string): Promise<PropertyObject> {
    try {
      const [property] = await db
        .delete(Property)
        .where(eq(Property.id, id))
        .returning();
      if (!property) throw new AppError("Property not found or delete failed");
      return this.toPropertyObject(property);
    } catch (error) {
      console.error(`Database Error: ${error}`);
      throw error;
    }
  }
}
