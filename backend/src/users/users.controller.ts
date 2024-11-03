import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiTags('Users Authentication')
  @ApiCreatedResponse({
    description: 'The user has been successfully created',
    type: CreateUserDto,
    isArray: false
  })
  @ApiBadRequestResponse({description: 'Bad Request'})
  @ApiConflictResponse({description: 'User already exists'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiTags('Users Authentication')
  @ApiBadRequestResponse({description: 'Bad Request'})
  @ApiNotFoundResponse({description: 'Invalid Credentials'})
  @ApiNotFoundResponse({description: 'User Not Found'})
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get()
  @ApiTags('Users')
  @ApiOkResponse({
    description: 'The users has been successfully retrieved',
    type: CreateUserDto,
    isArray: true
  })
  @ApiBadRequestResponse({description: 'Bad Request'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiTags('Users')
  @ApiOkResponse({
    description: 'The user has been successfully retrieved',
    type: CreateUserDto,
    isArray: false
  })
  @ApiBadRequestResponse({description: 'Bad Request'})
  @ApiNotFoundResponse({description: 'User Not Found'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiTags('Users')
  @ApiOkResponse({
    description: 'The user has been successfully updated',
    type: CreateUserDto,
    isArray: false
  })
  @ApiNotFoundResponse({description: 'User Not Found'})
  @ApiBadRequestResponse({description: 'Bad Request'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiTags('Users')
  @ApiOkResponse({
    description: 'The user has been successfully deleted',
    type: CreateUserDto,
    isArray: false
  })
  @ApiNotFoundResponse({description: 'User Not Found'})
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
