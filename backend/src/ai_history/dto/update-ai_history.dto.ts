import { PartialType } from '@nestjs/swagger';
import { CreateAiHistoryDto } from './create-ai_history.dto';

export class UpdateAiHistoryDto extends PartialType(CreateAiHistoryDto) {}
