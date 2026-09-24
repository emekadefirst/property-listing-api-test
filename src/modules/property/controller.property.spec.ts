import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { PropertyController } from './controllers.property.js';
import { PropertyService } from './services.property.js';
import type {
  CreatePropertyDto,
  NearMeQueryDto,
  PropertObjectDto,
  PropertyPaginatedResponseDto,
  PropertyQueryParamDto,
  UpdatePropertyDto,
} from './dtos.property.js';

// Replace the service module with a bare token so importing the controller does
// not pull in the Postgres/drizzle stack (which slows the suite down).
vi.mock('./services.property.js', () => ({
  PropertyService: class PropertyService {},
}));

type MockedService = {
  createProperty: Mock;
  updateProperty: Mock;
  deleteProperty: Mock;
  fetchProperty: Mock;
};

const propertyFixture: PropertObjectDto = {
  id: '3f9c0e1a-3c3a-4d2f-9a1c-1e5b0a2f0b1c',
  title: 'Luxury 3-bedroom apartment',
  price: '250000.00',
  type: 'rent',
  description: 'A spacious apartment with a sea view',
  bedrooms: 3,
  location: { latitude: 6.5244, longitude: 3.3792 },
  agentId: '11111111-1111-1111-1111-111111111111',
  isAvailable: true,
  agent: { name: 'Daniel Benson' },
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const createFixture: CreatePropertyDto = {
  title: 'Luxury 3-bedroom apartment',
  price: '250000.00',
  type: 'rent',
  description: 'A spacious apartment with a sea view',
  bedrooms: 3,
  location: { latitude: 6.5244, longitude: 3.3792 },
  agentId: '11111111-1111-1111-1111-111111111111',
  isAvailable: true,
};

const updateFixture: UpdatePropertyDto = {
  title: 'Renovated 3-bedroom apartment',
  price: '275000.00',
  type: 'sale',
  description: 'Fully renovated',
  bedrooms: 3,
  location: { latitude: 6.5244, longitude: 3.3792 },
  agentId: '11111111-1111-1111-1111-111111111111',
  isAvailable: false,
};

describe('PropertyController', () => {
  let controller: PropertyController;
  let service: MockedService;

  beforeEach(async () => {
    service = {
      createProperty: vi.fn(),
      updateProperty: vi.fn(),
      deleteProperty: vi.fn(),
      fetchProperty: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [{ provide: PropertyService, useValue: service }],
    }).compile();

    controller = module.get<PropertyController>(PropertyController);
  }, 30_000);

  it('is defined', () => {
    expect(controller).toBeDefined();
  });

  describe('fetch', () => {
    it('delegates to PropertyService.fetchProperty with the query params', async () => {
      const params: PropertyQueryParamDto = { page: 2, pageSize: 5 };
      const response: PropertyPaginatedResponseDto = {
        page: 2,
        pageSize: 5,
        total: 1,
        data: [propertyFixture],
      };
      service.fetchProperty.mockResolvedValue(response);

      await expect(controller.fetch(params)).resolves.toBe(response);
      expect(service.fetchProperty).toHaveBeenCalledWith(params);
    });
  });

  describe('nearMe', () => {
    it('maps latitude/longitude into a location and delegates to fetchProperty', async () => {
      const query: NearMeQueryDto = { latitude: 6.5244, longitude: 3.3792, page: 1, pageSize: 10 };
      const response: PropertyPaginatedResponseDto = { page: 1, pageSize: 10, total: 0, data: [] };
      service.fetchProperty.mockResolvedValue(response);

      await expect(controller.nearMe(query)).resolves.toBe(response);
      expect(service.fetchProperty).toHaveBeenCalledWith({
        location: { latitude: 6.5244, longitude: 3.3792 },
        page: 1,
        pageSize: 10,
      });
    });
  });

  describe('create', () => {
    it('delegates to PropertyService.createProperty', async () => {
      service.createProperty.mockResolvedValue(propertyFixture);

      await expect(controller.create(createFixture)).resolves.toBe(propertyFixture);
      expect(service.createProperty).toHaveBeenCalledWith(createFixture);
    });
  });

  describe('update', () => {
    it('delegates to PropertyService.updateProperty with the id and body', async () => {
      service.updateProperty.mockResolvedValue(propertyFixture);

      await expect(controller.update(propertyFixture.id, updateFixture)).resolves.toBe(propertyFixture);
      expect(service.updateProperty).toHaveBeenCalledWith(propertyFixture.id, updateFixture);
    });
  });

  describe('delete', () => {
    it('delegates to PropertyService.deleteProperty', async () => {
      service.deleteProperty.mockResolvedValue(propertyFixture);

      await expect(controller.delete(propertyFixture.id)).resolves.toBe(propertyFixture);
      expect(service.deleteProperty).toHaveBeenCalledWith(propertyFixture.id);
    });
  });
});
