import { PartialType } from '@nestjs/swagger';
import { CreateListAdministrativeProcessDto } from './create-list-administrative-process.dto';

export class UpdateListAdministrativeProcessDto extends PartialType(CreateListAdministrativeProcessDto) {}
