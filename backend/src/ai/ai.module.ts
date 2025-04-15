import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AiHistory } from 'src/ai_history/entities/ai_history.entity';
import { User } from 'src/users/entities/user.entity';
import { AiHistoryModule } from 'src/ai_history/ai_history.module';
import { Step } from 'src/steps/entities/step.entity';
import { Process } from 'src/process/entities/process.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiHistory, User, Process, Step]), AiHistoryModule],
  controllers: [AiController],
  providers: [
    AiService,
  ],
  exports: [AiService, TypeOrmModule],
})
export class AiModule {}
