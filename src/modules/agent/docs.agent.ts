import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import {
  AgentObjectDto,
  AgentPaginatedResponseDto,
  CreateAgentDto,
  UpdateAgentDto,
} from './dtos.agent.js';

export function AgentCreateDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Create an agent',
      description: 'Create a new agent and return the created record.',
    }),
    ApiBody({ type: CreateAgentDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The agent was created.',
      type: AgentObjectDto,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid request body.',
    }),
  );
}

export function GetAgentsDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Fetch agents',
      description: 'Fetch a paginated list of agents with optional filters.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'A paginated list of agents.',
      type: AgentPaginatedResponseDto,
    }),
  );
}

export function updateAgentDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Update an agent by ID',
      description: 'Update the details of an existing agent.',
    }),
    ApiParam({ name: 'id', description: 'Agent ID', type: String, required: true }),
    ApiBody({ type: UpdateAgentDto }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The updated agent.',
      type: AgentObjectDto,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Agent not found.',
    }),
  );
}

export function deleteAgentDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete an agent by ID',
      description: 'Delete an existing agent.',
    }),
    ApiParam({ name: 'id', description: 'Agent ID', type: String, required: true }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The deleted agent.',
      type: AgentObjectDto,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Agent not found.',
    }),
  );
}
