import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessDto } from './create-process.dto';
import { IsDataURI, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/enum/status.enum';
import { User } from 'src/users/entities/user.entity';

export class UpdateProcessDto extends PartialType(CreateProcessDto) {
    @IsString()
    @IsOptional()
    public name: string;

    @IsString()
    @IsOptional()
    public description: string;

    @IsEnum(Status)
    @IsOptional()
    public status: Status;

    @IsOptional()
    public user: User;

    @IsDate()
    @IsOptional()
    public updatedAt: Date;

    @IsDate()
    @IsOptional()
    public endedAt: Date;
}
