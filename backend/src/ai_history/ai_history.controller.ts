import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AiHistoryService } from './ai_history.service';
import { AiHistory } from './entities/ai_history.entity';
import { CreateAiHistoryDto } from './dto/create-ai_history.dto';
import { UpdateAiHistoryDto } from './dto/update-ai_history.dto';

@Controller('ai-history')
@ApiTags('AiHistory')
export class AiHistoryController {
  constructor(private readonly aiHistoryService: AiHistoryService) { }

  @Post('/create')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The AI history has been successfully created',
    type: AiHistory,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createAiHistoryDto: CreateAiHistoryDto) {
    return this.aiHistoryService.create(createAiHistoryDto);
  }

  @Get('/all')
  @ApiOkResponse({
    description: 'Returns all AI histories',
    type: [AiHistory],
  })
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findAll() {
    return this.aiHistoryService.findAll();
  }

  @Get(':user_id')
  @ApiOkResponse({
    description: 'Returns a specific AI history by ID',
    type: AiHistory,
  })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'AiHistory not found' })
  findOne(@Param('user_id') id: string) {
    return this.aiHistoryService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'AI history has been successfully updated',
    type: AiHistory,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'AiHistory not found' })
  update(@Param('id') id: string, @Body() updateAiHistoryDto: UpdateAiHistoryDto) {
    return this.aiHistoryService.update(+id, updateAiHistoryDto);
  }

  @Delete('/delete/:id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'AI history has been successfully deleted',
  })
  @ApiNotFoundResponse({ description: 'AiHistory not found' })
  remove(@Param('id') id: string) {
    return this.aiHistoryService.remove(+id);
  }

  @Post('/append')
  @ApiBearerAuth()
  @ApiTags('AiHistory')
  @ApiOkResponse({
    description: 'Appended new content to the AI history',
    type: AiHistory,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  appendToHistory(@Body() createAiHistoryDto: CreateAiHistoryDto) 
  {
    return this.aiHistoryService.appendToHistory(createAiHistoryDto);
  }
}
