import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { AgentController } from './controllers.agent.js';
import { AgentService } from './services.agent.js';
import type {
  AgentObjectDto,
  AgentPaginatedResponseDto,
  AgentQueryParamDto,
  CreateAgentDto,
  UpdateAgentDto,
} from './dtos.agent.js';

// Replace the service module with a bare token so importing the controller does
// not pull in the Postgres/drizzle stack.
vi.mock('./services.agent.js', () => ({
  AgentService: class AgentService {},
}));

type MockedService = {
  createAgent: Mock;
  updateAgent: Mock;
  deleteAgent: Mock;
  fetchAgent: Mock;
};

const agentFixture: AgentObjectDto = {
  id: '11111111-1111-1111-1111-111111111111',
  name: 'Daniel Benson',
  email: 'daniel@example.com',
  phone: '+2348012345678',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const createFixture: CreateAgentDto = {
  name: 'Daniel Benson',
  email: 'daniel@example.com',
  phone: '+2348012345678',
};

const updateFixture: UpdateAgentDto = {
  name: 'Daniel Benson Jr',
};

describe('AgentController', () => {
  let controller: AgentController;
  let service: MockedService;

  beforeEach(async () => {
    service = {
      createAgent: vi.fn(),
      updateAgent: vi.fn(),
      deleteAgent: vi.fn(),
      fetchAgent: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentController],
      providers: [{ provide: AgentService, useValue: service }],
    }).compile();

    controller = module.get<AgentController>(AgentController);
  }, 30_000);

  it('is defined', () => {
    expect(controller).toBeDefined();
  });

  describe('fetch', () => {
    it('delegates to AgentService.fetchAgent with the query params', async () => {
      const params: AgentQueryParamDto = { page: 2, pageSize: 5 };
      const response: AgentPaginatedResponseDto = {
        page: 2,
        pageSize: 5,
        total: 1,
        data: [agentFixture],
      };
      service.fetchAgent.mockResolvedValue(response);

      await expect(controller.fetch(params)).resolves.toBe(response);
      expect(service.fetchAgent).toHaveBeenCalledWith(params);
    });
  });

  describe('create', () => {
    it('delegates to AgentService.createAgent', async () => {
      service.createAgent.mockResolvedValue(agentFixture);

      await expect(controller.create(createFixture)).resolves.toBe(agentFixture);
      expect(service.createAgent).toHaveBeenCalledWith(createFixture);
    });
  });

  describe('update', () => {
    it('delegates to AgentService.updateAgent with the id and body', async () => {
      service.updateAgent.mockResolvedValue(agentFixture);

      await expect(controller.update(agentFixture.id, updateFixture)).resolves.toBe(agentFixture);
      expect(service.updateAgent).toHaveBeenCalledWith(agentFixture.id, updateFixture);
    });
  });

  describe('delete', () => {
    it('delegates to AgentService.deleteAgent', async () => {
      service.deleteAgent.mockResolvedValue(agentFixture);

      await expect(controller.delete(agentFixture.id)).resolves.toBe(agentFixture);
      expect(service.deleteAgent).toHaveBeenCalledWith(agentFixture.id);
    });
  });
});
