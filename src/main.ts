import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { appConfig } from './configs/app.configs.js';
import { Module } from '@nestjs/common';
import { PropertyModule } from './modules/property/modules.property.js';
import { AgentModule } from './modules/agent/modules.agent.js';



@Module({
  imports: [PropertyModule, AgentModule],
})
class AppModule {}



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Property Listing API - TEST')
    .setDescription('1. CRUD endpoints for listings (title, price, type: rent/sale/shortlet, bedrooms, location with lat/lng, agent ID)\n2. A search endpoint that filters by type, price range and bedrooms, and returns listings within X km of a given point\n3. Pagination, input validation and sensible error handling\n4. At least a few unit or integration tests\n5. A README explaining setup, your design choices and what you will improve with more time')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(appConfig.port);
}
await bootstrap();
