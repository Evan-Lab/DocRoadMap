import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsString } from "class-validator";
import { Status } from "src/enum/status.enum";
import { CreateProcessDto } from "src/process/dto/create-process.dto";
import { Process } from "src/process/entities/process.entity";

export class CreateStepDto {
    @ApiProperty({
        description: 'Name of the step',
        type: 'string',
        required: true
    })
    @IsString()
    public name: string;

    @ApiProperty({
        description: 'Description of the step',
        type: 'string',
        required: true
    })
    @IsString()
    public description: string;

    @ApiProperty({
        description: 'Status of the step',
        type: 'enum',
        enum: Status,
        required: true
    })
    @IsEnum(Status)
    public status: Status;

    @ApiProperty({
        description: 'Process of the step',
        type: CreateProcessDto,
        required: true
    })
    public process: Process;

    @ApiProperty({
        description: 'Last updated date of the step',
        type: 'date',
        required: true
    })
    @IsDate()
    public updatedAt: Date;

    @ApiProperty({
        description: 'Ended date of the step',
        type: 'date',
        required: true
    })
    @IsDate()
    public endedAt: Date;
}
