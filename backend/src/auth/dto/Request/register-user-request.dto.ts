import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
    @ApiProperty({
        description: 'The firstname of the user',
        type: 'string',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    public firstName: string;
    
    @ApiProperty({
        description: 'The lastname of the user',
        type: 'string',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    public lastName: string;
    
    @ApiProperty({
        description: 'The email of the user',
        type: 'string',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    public email: string;
    
    @ApiProperty({
        description: 'The password of the user',
        type: 'string',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    public password: string;
}
