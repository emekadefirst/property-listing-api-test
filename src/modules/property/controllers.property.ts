import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { PropertyService } from './services.property.js';
import {
  PropertyQueryParamDto,
  CreatePropertyDto,
  UpdatePropertyDto,
  PropertObjectDto,
  PropertyPaginatedResponseDto,
  NearMeQueryDto,
} from './dtos.property.js';
import {
  PropertyCreateDoc,
  GetPropertiesDoc,
  getPropertyByIdDoc,
  updatePropertyDoc,
  deletePropertyDoc,
  findPropertyNearDoc,
} from './docs.property.js';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @GetPropertiesDoc()
  fetch(@Query() params: PropertyQueryParamDto): Promise<PropertyPaginatedResponseDto> {
    return this.propertyService.fetchProperty(params);
  }

  @Get('near-me')
  @findPropertyNearDoc()
  nearMe(@Query() query: NearMeQueryDto): Promise<PropertyPaginatedResponseDto> {
    return this.propertyService.fetchProperty({
      location: { latitude: query.latitude, longitude: query.longitude },
      page: query.page,
      pageSize: query.pageSize,
    });
  }

  @Get(':id')
  @getPropertyByIdDoc()
  getById(@Param('id') id: string): Promise<PropertObjectDto | null> {
    return this.propertyService.getById(id);
  }

  @Post()
  @PropertyCreateDoc()
  create(@Body() data: CreatePropertyDto): Promise<PropertObjectDto> {
    return this.propertyService.createProperty(data);
  }

  @Patch(':id')
  @updatePropertyDoc()
  update(@Param('id') id: string, @Body() data: UpdatePropertyDto): Promise<PropertObjectDto> {
    return this.propertyService.updateProperty(id, data);
  }

  @Delete(':id')
  @deletePropertyDoc()
  delete(@Param('id') id: string): Promise<PropertObjectDto> {
    return this.propertyService.deleteProperty(id);
  }
}
