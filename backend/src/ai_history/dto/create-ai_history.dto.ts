import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateAiHistoryDto {
  @ApiProperty({
    description: 'The AI chat history content',
    type: 'string',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  history: string;

  @ApiProperty({
    description: 'The ID of the user associated with the history',
    type: 'number',
    required: true
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
