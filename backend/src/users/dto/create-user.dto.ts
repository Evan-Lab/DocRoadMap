import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    public firstName: string;
    
    @IsString()
    @IsNotEmpty()
    public lastName: string;
    
    @IsEmail()
    @IsNotEmpty()
    public email: string;
    
    @IsString()
    @IsNotEmpty()
    public password: string;
}
