import {
  AgentQueryParamDto,
  CreateAgentDto,
  UpdateAgentDto,
  AgentObjectDto,
  AgentPaginatedResponseDto,
} from './dtos.agent.js';

export type AgentQueryParams = InstanceType<typeof AgentQueryParamDto>;
export type CreateAgentInput = InstanceType<typeof CreateAgentDto>;
export type UpdateAgentInput = InstanceType<typeof UpdateAgentDto>;
export type AgentObject = InstanceType<typeof AgentObjectDto>;
export type AgentPaginatedResponse = InstanceType<typeof AgentPaginatedResponseDto>;
