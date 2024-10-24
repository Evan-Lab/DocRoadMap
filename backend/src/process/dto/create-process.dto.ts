import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Status } from "src/enum/status.enum";
import { User } from "src/users/entities/user.entity";

export class CreateProcessDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    public description: string;

    @IsEnum(Status)
    public status: Status;

    public user: User;

    @IsDate()
    public endedAt: Date;
}
