import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    public firstName: string;
    
    @IsString()
    @IsOptional()
    public lastName: string;
    
    @IsEmail()
    @IsOptional()
    public email: string;
    
    @IsString()
    @IsOptional()
    public password: string;

    @IsBoolean()
    @IsOptional()
    public isActive: boolean;
}
