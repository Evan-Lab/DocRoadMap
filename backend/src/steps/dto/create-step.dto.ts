import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

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
