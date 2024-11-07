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
        description: 'Process of the step',
        type: 'number',
        required: true
    })
    public processId: number;
}
