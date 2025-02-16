import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [],
  controllers: [AiController],
  providers: [
    AiService,
  ],
  exports: [AiService],
})
export class AiModule {}
