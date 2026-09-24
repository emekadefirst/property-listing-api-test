import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { AgentService } from './services.agent.js';
import {
  AgentQueryParamDto,
  CreateAgentDto,
  UpdateAgentDto,
  AgentObjectDto,
  AgentPaginatedResponseDto,
} from './dtos.agent.js';
import {
  AgentCreateDoc,
  GetAgentsDoc,
  updateAgentDoc,
  deleteAgentDoc,
} from './docs.agent.js';

@Controller('agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get()
  @GetAgentsDoc()
  fetch(@Query() params: AgentQueryParamDto): Promise<AgentPaginatedResponseDto> {
    return this.agentService.fetchAgent(params);
  }

  @Post()
  @AgentCreateDoc()
  create(@Body() data: CreateAgentDto): Promise<AgentObjectDto> {
    return this.agentService.createAgent(data);
  }

  @Patch(':id')
  @updateAgentDoc()
  update(@Param('id') id: string, @Body() data: UpdateAgentDto): Promise<AgentObjectDto> {
    return this.agentService.updateAgent(id, data);
  }

  @Delete(':id')
  @deleteAgentDoc()
  delete(@Param('id') id: string): Promise<AgentObjectDto> {
    return this.agentService.deleteAgent(id);
  }
}
