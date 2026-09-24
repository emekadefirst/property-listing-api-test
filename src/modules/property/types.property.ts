import { 
  PropertyQueryParamDto,
  CreatePropertyDto,
  UpdatePropertyDto,
  PropertObjectDto,
  PropertyPaginatedResponseDto
} from "./dtos.property.js";



export type PropertyQueryParams = InstanceType<typeof PropertyQueryParamDto>;
export type CreatePropertyInput = InstanceType<typeof CreatePropertyDto>;
export type UpdatePropertyInput = InstanceType<typeof UpdatePropertyDto>;
export type PropertyObject = InstanceType<typeof PropertObjectDto>;
export type PropertyPaginatedResponse = InstanceType<typeof PropertyPaginatedResponseDto>;