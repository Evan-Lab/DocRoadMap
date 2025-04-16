import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ListAdministrativeProcessService } from './list_administrative_process.service';
import { CreateListAdministrativeProcessDto } from './dto/create-list-administrative-process.dto';
import { UpdateListAdministrativeProcessDto } from './dto/update-list-administrative-process.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ListAdministrativeProcess } from './entities/list_administrative_process.entity';

@ApiTags('list-administrative-process')
@Controller('list-administrative-process')
export class ListAdministrativeProcessController {
  constructor(private readonly service: ListAdministrativeProcessService) {}

  @Post('create')
  @ApiBearerAuth()
  @ApiTags('list-administrative-process')
  @ApiCreatedResponse({
    description: 'The administrative process has been successfully created',
    type: ListAdministrativeProcess,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiConflictResponse({ description: 'Process already exists' })
  create(@Body() dto: CreateListAdministrativeProcessDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiTags('list-administrative-process')
  @ApiOkResponse({
    description: 'All administrative processes successfully retrieved',
    type: ListAdministrativeProcess,
    isArray: true,
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiTags('list-administrative-process')
  @ApiOkResponse({
    description: 'Administrative process successfully retrieved',
    type: ListAdministrativeProcess,
    isArray: false,
  })
  @ApiNotFoundResponse({ description: 'Process not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put('/update/:id')
  @ApiBearerAuth()
  @ApiTags('list-administrative-process')
  @ApiOkResponse({
    description: 'Administrative process successfully updated',
    type: ListAdministrativeProcess,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Process not found' })
  update(@Param('id') id: string, @Body() dto: UpdateListAdministrativeProcessDto) {
    return this.service.update(+id, dto);
  }

  @Delete('/delete/:id')
  @ApiBearerAuth()
  @ApiTags('list-administrative-process')
  @ApiOkResponse({ description: 'Administrative process successfully deleted' })
  @ApiNotFoundResponse({ description: 'Process not found' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
