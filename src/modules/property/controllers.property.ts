import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { PropertyService } from './services.property.js';

@Controller('properties')
export class CatsController {
  @Get()
  fetch(): string {
    return 'This action returns all properties using the params';
  }

  @Get()
  fetchNearMe(): string {
    return 'This action returns all properties near you';
  }

  @Post()
  create(): string {
    return 'This action create a Property';
  }

  @Patch()
  update(): string {
    return 'This action update a property';
  }

  @Delete()
  delete(): string {
    return 'This action delete a property';
  }
}

