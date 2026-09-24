import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import {
  CreatePropertyDto,
  PropertObjectDto,
  PropertyPaginatedResponseDto,
  UpdatePropertyDto,
} from './dtos.property.js';

export function PropertyCreateDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a property',
      description: 'Create a new property and return the created record.',
    }),
    ApiBody({ type: CreatePropertyDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The property was created.',
      type: PropertObjectDto,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid request body.',
    }),
  );
}

export function GetPropertiesDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Fetch properties',
      description: 'Fetch a paginated list of properties with optional filters and sorting.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'A paginated list of properties.',
      type: PropertyPaginatedResponseDto,
    }),
  );
}


export function updatePropertyDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a property by ID',
      description: 'Update the details of an existing property.',
    }),
    ApiParam({ name: 'id', description: 'Property ID', type: String, required: true }),
    ApiBody({ type: UpdatePropertyDto }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The updated property.',
      type: PropertObjectDto,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Property not found.',
    }),
  );
}

export function deletePropertyDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a property by ID',
      description: 'Delete an existing property.',
    }),
    ApiParam({ name: 'id', description: 'Property ID', type: String, required: true }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The deleted property.',
      type: PropertObjectDto,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Property not found.',
    }),
  );
}

export function findPropertyNearDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Find properties near a location',
      description:
        'Fetch a paginated list of properties sorted by distance from the given coordinates.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'A paginated list of nearby properties.',
      type: PropertyPaginatedResponseDto,
    }),
  );
}
