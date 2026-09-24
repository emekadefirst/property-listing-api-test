import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AgentQueryParamDto {
  @ApiPropertyOptional({ description: 'Agent identifier' })
  @IsOptional()
  @IsUUID()
  id?: string;

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

  @ApiPropertyOptional({ description: 'Search by name or email' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class CreateAgentDto {
  @ApiProperty({ description: 'Agent name', example: 'Daniel Benson' })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Agent email', example: 'daniel@example.com' })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ description: 'Agent phone number', example: '+2348012345678' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}

export class UpdateAgentDto {
  @ApiPropertyOptional({ description: 'Agent name', example: 'Daniel Benson' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ description: 'Agent email', example: 'daniel@example.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({ description: 'Agent phone number', example: '+2348012345678' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}

export class AgentObjectDto {
  @ApiProperty({ description: 'Agent identifier' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Agent name', example: 'Daniel Benson' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Agent email', example: 'daniel@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: 'Agent phone number', example: '+2348012345678' })
  @IsOptional()
  @IsString()
  phone?: string | null;

  @ApiProperty({ description: 'Created At Timestamp' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ description: 'Updated At Timestamp' })
  @IsDateString()
  updatedAt: string;
}

export class AgentPaginatedResponseDto {
  @ApiProperty({ description: 'Page' })
  @IsInt()
  page: number;

  @ApiProperty({ description: 'Page size' })
  @IsInt()
  pageSize: number;

  @ApiProperty({ description: 'Total count' })
  @IsInt()
  total: number;

  @ApiProperty({
    description: 'Agents in array',
    type: [AgentObjectDto],
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AgentObjectDto)
  data: AgentObjectDto[];
}
