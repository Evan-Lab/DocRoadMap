import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateProcessDto } from 'src/process/dto/create-process.dto';
import { Process } from 'src/process/entities/process.entity';

export class CreateUserDto {
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

    @ApiProperty({
        description: 'The processes of the user',
        type: CreateProcessDto,
        required: false
    })
    @IsOptional()
    public processes: Process[];
}