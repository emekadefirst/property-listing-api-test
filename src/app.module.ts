import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PropertyModule } from './modules/property/property.module.js';

@Module({
  imports: [PropertyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
