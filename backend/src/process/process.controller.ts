import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcessService } from './process.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post('create')
  @ApiTags('Process')
  @ApiCreatedResponse({ 
    description: 'The Process has been successfully created.',
    type: CreateProcessDto,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createProcessDto: CreateProcessDto) {
    return this.processService.create(createProcessDto);
  }

  @Get('all')
  @ApiTags('Process')
  @ApiOkResponse({
    description: 'The Processes has been successfully retrieved.',
    type: CreateProcessDto,
    isArray: true
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findAll() {
    return this.processService.findAll();
  }

  @Get(':id')
  @ApiTags('Process')
  @ApiOkResponse({
    description: 'The Process has been successfully retrieved.',
    type: CreateProcessDto,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Process Not Found' })
  findOne(@Param('id') id: string) {
    return this.processService.findOne(+id);
  }

  @Patch(':id')
  @ApiTags('Process')
  @ApiOkResponse({
    description: 'The Process has been successfully updated.',
    type: CreateProcessDto,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Process Not Found' })
  update(@Param('id') id: string, @Body() updateProcessDto: UpdateProcessDto) {
    return this.processService.update(+id, updateProcessDto);
  }

  @Delete(':id')
  @ApiTags('Process')
  @ApiOkResponse({
    description: 'The Process has been successfully deleted.',
    type: CreateProcessDto,
    isArray: false
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Process Not Found' })
  remove(@Param('id') id: string) {
    return this.processService.remove(+id);
  }
}
