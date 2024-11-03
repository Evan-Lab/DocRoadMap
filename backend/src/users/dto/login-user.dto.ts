import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: 'The email of the user',
        type: 'string',
        required: false
    })
    @IsEmail()
    @IsOptional()
    public email?: string;
    
    @ApiProperty({
        description: 'The password of the user',
        type: 'string',
        required: false
    })
    @IsString()
    @IsOptional()
    public password?: string;
}
