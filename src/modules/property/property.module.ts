import { Module } from '@nestjs/common';
import { PropertyController } from './controllers.property.js';
import { PropertyService } from './services.property.js';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
