import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsIn,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PropertyType, type Coordinate } from './models.property.js';

class AgentDto {
  @ApiProperty({
    description: 'Agent name',
    example: 'Daniel Benson',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
}

export class PropertyQueryParamDto {
  @ApiPropertyOptional({description: 'Property Identifier'})
  @IsUUID()
  @IsOptional()
  id?: string; 

  @ApiPropertyOptional({description: 'Page'})
  @IsInt()
  @IsOptional()
  page?: number; 

  @ApiPropertyOptional({description: 'PageSize'})
  @IsInt()
  @IsOptional()
  pageSize?: number; 

  @ApiPropertyOptional({description: 'search for property'})
  @IsString()
  @IsOptional()
  search?: string; 

  @ApiPropertyOptional({
    description: 'Property location coordinates',
    example: { latitude: 6.5244, longitude: 3.3792 },
  })
  @IsObject()
  @IsOptional()
  location?: Coordinate;

  @ApiPropertyOptional({
    description: 'Whether the property is available',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    description: 'Property type',
    enum: PropertyType.enumValues,
    example: 'rent',
  })
  @IsIn(PropertyType.enumValues)
  @IsObject()
  @IsOptional()
  type?: (typeof PropertyType.enumValues)[number];
}

export class CreatePropertyDto {
  @ApiProperty({
    description: 'Property title',
    example: 'Luxury 3-bedroom apartment',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Property price',
    example: '250000.00',
  })
  @IsString()
  @IsDecimal({ force_decimal: true })
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    description: 'Property type',
    enum: PropertyType.enumValues,
    example: 'rent',
  })
  @IsIn(PropertyType.enumValues)
  @IsNotEmpty()
  type: (typeof PropertyType.enumValues)[number];

  @ApiPropertyOptional({
    description: 'Property description',
    example: 'A spacious apartment with a sea view',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: 3,
  })
  @IsInt()
  @Min(0)
  bedrooms: number;

  @ApiProperty({
    description: 'Property location coordinates',
    example: { latitude: 6.5244, longitude: 3.3792 },
  })
  @IsObject()
  location: Coordinate;

  @ApiProperty({
    description: 'Listing agent'
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  agentId: string;

  @ApiPropertyOptional({
    description: 'Whether the property is available',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}

export class UpdatePropertyDto {
  @ApiProperty({
    description: 'Property title',
    example: 'Luxury 3-bedroom apartment',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @IsObject()
  title: string;

  @ApiProperty({
    description: 'Property price',
    example: '250000.00',
  })
  @IsString()
  @IsDecimal({ force_decimal: true })
  @IsNotEmpty()
  @IsObject()
  price: string;

  @ApiProperty({
    description: 'Property type',
    enum: PropertyType.enumValues,
    example: 'rent',
  })
  @IsIn(PropertyType.enumValues)
  @IsNotEmpty()
  @IsObject()
  type: (typeof PropertyType.enumValues)[number];

  @ApiPropertyOptional({
    description: 'Property description',
    example: 'A spacious apartment with a sea view',
  })
  @IsOptional()
  @IsString()
  @IsObject()
  description?: string;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: 3,
  })
  @IsInt()
  @Min(0)
  @IsObject()
  bedrooms: number;

  @ApiProperty({
    description: 'Property location coordinates',
    example: { latitude: 6.5244, longitude: 3.3792 },
  })
  @IsObject()
  @IsObject()
  location: Coordinate;

  @ApiProperty({
    description: 'Listing agent'
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @IsObject()
  agentId: string;

  @ApiPropertyOptional({
    description: 'Whether the property is available',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  @IsObject()
  isAvailable?: boolean;
}

export class PropertObjectDto extends CreatePropertyDto {
  @ApiProperty({
    description: 'Listing agent',
    type: AgentDto,
  })
  @ValidateNested()
  @Type(() => AgentDto)
  agent: AgentDto;

  @ApiProperty({description: 'Property Identifier'})
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Created At Timestamp' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ description: 'Updated At Timestamp' })
  @IsDateString()
  updatedAt: string;
}

export class PropertyPaginatedResponseDto {
  @ApiProperty({description: 'Page'})
  @IsInt()
  page: number; 

  @ApiProperty({description: 'Page Size'})
  @IsInt()
  pageSize: number; 

  @ApiProperty({description: 'Total count'})
  @IsInt()
  total: number; 

  @ApiProperty({
    description: 'Properties in array',
    type: [PropertObjectDto],
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PropertObjectDto)
  data: PropertObjectDto[];
}

export class NearMeQueryDto {
  @ApiProperty({ description: 'Latitude', example: 6.5244 })
  @Type(() => Number)
  @IsLatitude()
  latitude: number;

  @ApiProperty({ description: 'Longitude', example: 3.3792 })
  @Type(() => Number)
  @IsLongitude()
  longitude: number;

  @ApiPropertyOptional({ description: 'Page', default: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  page?: number;

  @ApiPropertyOptional({ description: 'Page size', default: 10 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  pageSize?: number;
}