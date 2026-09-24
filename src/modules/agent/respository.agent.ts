import { db } from "../../core/db.core.js";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { Agent } from "./models.agent.js";
import { AppError } from "../../error/index.js";
import {
  AgentQueryParams,
  CreateAgentInput,
  UpdateAgentInput,
  AgentObject,
  AgentPaginatedResponse,
} from "./types.agent.js";

export class AgentRepository {
  private toAgentObject(agent: typeof Agent.$inferSelect): AgentObject {
    const { createdAt, updatedAt, ...rest } = agent;
    return {
      ...rest,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  }

  async fetch(params: AgentQueryParams): Promise<AgentPaginatedResponse> {
    const { id, search, page = 1, pageSize = 10 } = params;
    const offset = (page - 1) * pageSize;
    const filters = [];

    if (id) filters.push(eq(Agent.id, id));
    if (search) {
      filters.push(
        or(
          ilike(Agent.name, `%${search}%`),
          ilike(Agent.email, `%${search}%`),
        )
      );
    }

    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    const [data, totalCount] = await Promise.all([
      db
        .select()
        .from(Agent)
        .where(whereClause)
        .orderBy(desc(Agent.createdAt))
        .limit(pageSize)
        .offset(offset),
      db.select({ count: count() }).from(Agent).where(whereClause),
    ]);

    return {
      page,
      pageSize,
      total: Number(totalCount[0]?.count || 0),
      data: data.map((agent) => this.toAgentObject(agent)),
    };
  }

  async create(data: CreateAgentInput): Promise<AgentObject> {
    try {
      const [agent] = await db.insert(Agent).values(data).returning();
      if (!agent) throw new AppError("Failed to create agent", 500);
      return this.toAgentObject(agent);
    } catch (error) {
      if (error instanceof AppError) {
        console.log(`Database Error: ${error}`);
        throw error;
      }
      throw new AppError("Database error while creating agent", 500);
    }
  }

  async update(id: string, data: UpdateAgentInput): Promise<AgentObject> {
    try {
      const [agent] = await db
        .update(Agent)
        .set(data)
        .where(eq(Agent.id, id))
        .returning();
      if (!agent) throw new AppError("Agent not found or update failed");
      return this.toAgentObject(agent);
    } catch (error) {
      console.log(`Database Error: ${error}`);
      throw new AppError(`Database Error: ${error}`);
    }
  }

  async getById(id: string): Promise<AgentObject | null> {
    try {
      const [agent] = await db
        .select()
        .from(Agent)
        .where(eq(Agent.id, id))
        .limit(1);
      return agent ? this.toAgentObject(agent) : null;
    } catch (error) {
      console.error(`Database Error: ${error}`);
      throw error;
    }
  }

  async delete(id: string): Promise<AgentObject> {
    try {
      const [agent] = await db
        .delete(Agent)
        .where(eq(Agent.id, id))
        .returning();
      if (!agent) throw new AppError("Agent not found or delete failed");
      return this.toAgentObject(agent);
    } catch (error) {
      console.error(`Database Error: ${error}`);
      throw error;
    }
  }
}
