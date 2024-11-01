import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Status } from "src/enum/status.enum";
import { CreateStepDto } from "src/steps/dto/create-step.dto";
import { Step } from "src/steps/entities/step.entity";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/entities/user.entity";

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
        type: '[number]',
        required: false
    })
    @IsOptional()
    public stepsId: number[];

    @ApiProperty({
        description: 'The endedAt of the process',
        type: 'date',
        required: true
    })
    @IsDate()
    public endedAt: Date;
}
