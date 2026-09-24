import { Injectable } from '@nestjs/common';
import { AgentRepository } from './respository.agent.js';
import {
  AgentObject,
  CreateAgentInput,
  UpdateAgentInput,
  AgentQueryParams,
  AgentPaginatedResponse,
} from './types.agent.js';

@Injectable()
export class AgentService {
  private repo = new AgentRepository();

  async createAgent(data: CreateAgentInput): Promise<AgentObject> {
    return await this.repo.create(data);
  }

  async updateAgent(id: string, data: UpdateAgentInput): Promise<AgentObject> {
    return await this.repo.update(id, data);
  }

  async deleteAgent(id: string): Promise<AgentObject> {
    return await this.repo.delete(id);
  }

  async fetchAgent(params: AgentQueryParams): Promise<AgentPaginatedResponse> {
    return await this.repo.fetch(params);
  }

  async getById(id: string): Promise<AgentObject | null> {
    return await this.repo.getById(id);
  }
}
