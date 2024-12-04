
import { Body, Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiUnauthorizedResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterUserDto } from './dto/Request/register-user-request.dto';
import { RegisterUserDtoResponse } from './dto/Response/register-user-response.dto';
import { LoginUserDto } from './dto/Request/login-user-request.dto';
import { Public } from 'src/decorators/public.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiTags('Authentication')
  @ApiOkResponse({
    description: 'The user has been successfully logged in',
    isArray: false
  })
  @ApiUnauthorizedResponse({description: 'Invalid Credentials'})
  async signIn(@Body() signInDto: LoginUserDto): Promise<RegisterUserDtoResponse> {
    return await this.authService.signIn(signInDto);
  }

  @Post('register')
  @Public()
  @ApiTags('Authentication')
  @ApiCreatedResponse({
    description: 'The user has been successfully registered',
    isArray: false
  })
  async signUp(@Body() signUpDto: RegisterUserDto): Promise<RegisterUserDtoResponse> {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
