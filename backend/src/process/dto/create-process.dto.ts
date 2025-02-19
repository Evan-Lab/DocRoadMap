import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Status } from "../../enum/status.enum";

export class CreateProcessDto {
    @ApiProperty({
        description: 'The name of the process',
        type: 'string',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    public name: string;

    @ApiProperty({
        description: 'The description of the process',
        type: 'string',
        required: true
    })
    @IsString()
    public description: string;

    @ApiProperty({
        description: 'The status of the process',
        type: 'enum',
        enum: Status,
        required: false
    })
    @IsEnum(Status)
    @IsOptional()
    public status: Status;

    @ApiProperty({
        description: 'The user of the process',
        type: 'number',
        required: true
    })
    public userId: number;

    @ApiProperty({
        description: 'The steps of the process',
        type: 'number',
        required: false,
        isArray: true
    })
    @IsOptional()
    public stepsId?: number[];

    @ApiProperty({
        description: 'The endedAt of the process',
        type: 'string',
        required: false
    })
    @IsDate()
    @IsOptional()
    public endedAt?: Date;
}
