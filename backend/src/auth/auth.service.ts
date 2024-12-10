
import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/Request/register-user-request.dto';
import { RegisterUserDtoResponse } from './dto/Response/register-user-response.dto';
import { Process } from '../process/entities/process.entity';
import { LoginUserDtoResponse } from './dto/Response/login-user-response.dto';
import { LoginUserDto } from './dto/Request/login-user-request.dto';
import exp from 'constants';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

  async signIn(signInDto: LoginUserDto): Promise<LoginUserDtoResponse> {
    const user = await this.usersService.findOne(signInDto.email);
    if (!user) {
        throw new UnauthorizedException('Invalid Credentials Email');
    }

    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if (!isMatch) {
        throw new UnauthorizedException('Invalid Credentials');
    }

    try { 
        await this.usersService.update(user.id, { latestLogin: new Date() });
    } catch (error) {
        console.log('Error updating latest login', error)
        throw new error
    }

    const payload = { sub: user.id, email: user.email };
    return {
        message: 'User logged in successfully',
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isActivated: user.isActive,
        processIds: user.processes?.map((process: Process) => process.id) || [],
        accessToken: await this.jwtService.signAsync(payload),
    };
  };

   async signUp(signUpDto: RegisterUserDto): Promise<RegisterUserDtoResponse> {
        let existUser;
        try {
            existUser = await this.usersService.findOne(signUpDto.email);
        } catch (error) {
            if (error instanceof NotFoundException) {
                existUser = null;
            } else {
                throw error;
            }
        }
        if (existUser) {
            throw new ConflictException('User already exists');
        }

        const user = await this.usersService.create(signUpDto);
        return {
            message: 'User created successfully',
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isActivated: user.isActive,
            processIds: user.processes?.map((process: Process) => process.id) || [],
        };
    }
}
