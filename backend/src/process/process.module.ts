import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from './entities/process.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Process])],
  controllers: [ProcessController],
  providers: [ProcessService],
  exports: [ProcessService, TypeOrmModule]
})
export class ProcessModule {}
