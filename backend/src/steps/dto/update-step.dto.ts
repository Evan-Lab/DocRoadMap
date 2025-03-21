import { PartialType } from '@nestjs/mapped-types';
import { CreateStepDto } from './create-step.dto';
import { Status } from '../../enum/status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateStepDto extends PartialType(CreateStepDto) {
    @ApiProperty({
        description: 'The name of the step',
        type: 'string',
        required: false
    })
    @IsString()
    @IsOptional()
    public name?: string;

    @ApiProperty({
        description: 'The description of the step',
        type: 'string',
        required: false
    })
    @IsString()
    @IsOptional()
    public description?: string;

    @ApiProperty({
        description: 'The status of the step',
        type: 'enum',
        enum: Status,
        required: false
    })
    @IsEnum(Status)
    @IsOptional()
    public status?: Status;

    @ApiProperty({
        description: 'The process linked to the step',
        type: 'number',
        required: false
    })
    @IsOptional()
    public processId?: number;

    @ApiProperty({
        description: 'The date when the step was updated',
        type: 'date',
        required: false
    })
    @IsDate()
    @IsOptional()
    public updatedAt?: Date = new Date();

    @ApiProperty({
        description: 'The date when the step ended',
        type: 'date',
        required: false
    })
    @IsDate()
    @IsOptional()
    public endedAt?: Date
}
