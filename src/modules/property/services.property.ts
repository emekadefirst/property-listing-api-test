import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './respository.property.js';
import { PropertyObject, CreatePropertyInput, UpdatePropertyInput, PropertyQueryParams, PropertyPaginatedResponse } from './types.property.js';

@Injectable()
export class PropertyService {
  private repo = new PropertyRepository();
  
  async createProperty(data: CreatePropertyInput): Promise<PropertyObject> {
    return await this.repo.create(data);
  }

  async updateProperty(id: string,  data: UpdatePropertyInput): Promise<PropertyObject> {
    return await this.repo.update(id, data);
  }

  async deleteProperty(id: string): Promise<PropertyObject> {
    return await this.repo.delete(id);
  }

  async fetchProperty(params: PropertyQueryParams): Promise<PropertyPaginatedResponse> {
    return await this.repo.fetch(params);
  }

  async getById(id: string): Promise<PropertyObject | null> {
    return await this.repo.getById(id);
  }
}
