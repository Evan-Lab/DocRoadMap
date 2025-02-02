import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessDto } from './create-process.dto';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '../../enum/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProcessDto extends PartialType(CreateProcessDto) {
    @ApiProperty({
        description: 'The name of the process',
        type: 'string',
        required: false
    })
    @IsString()
    @IsOptional()
    public name?: string;

    @ApiProperty({
        description: 'The description of the process',
        type: 'string',
        required: false
    })
    @IsString()
    @IsOptional()
    public description?: string;

    @ApiProperty({
        description: 'The status of the process',
        type: 'enum',
        enum: Status,
        required: false
    })
    @IsEnum(Status)
    @IsOptional()
    public status?: Status;

    @ApiProperty({
        description: 'User have created the process',
        type: 'number',
        required: false
    })
    @IsOptional()
    public userId?: number;

    @ApiProperty({
        description: 'The steps of the process',
        type: '[number]',
        required: false
    })
    @IsOptional()
    public stepsId?: number[];

    @ApiProperty({
        description: 'The date when the process was updated',
        type: 'date',
        required: false
    })
    @IsDate()
    @IsOptional()
    public updatedAt?: Date = new Date();

    @ApiProperty({
        description: 'The date when the process was ended',
        type: 'date',
        required: false
    })
    @IsDate()
    @IsOptional()
    public endedAt?: Date;
}
