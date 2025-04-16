import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListAdministrativeProcess } from './entities/list_administrative_process.entity';
import { ListAdministrativeProcessService } from './list_administrative_process.service';
import { ListAdministrativeProcessController } from './list_administrative_process.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ListAdministrativeProcess])],
  controllers: [ListAdministrativeProcessController],
  providers: [ListAdministrativeProcessService],
})
export class ListAdministrativeProcessModule {}
