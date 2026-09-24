import { Module } from '@nestjs/common';
import { AgentController } from './controllers.agent.js';
import { AgentService } from './services.agent.js';

@Module({
  imports: [],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
