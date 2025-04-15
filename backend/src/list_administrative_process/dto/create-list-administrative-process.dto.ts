import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListAdministrativeProcessDto {
    @ApiProperty({
        description: 'The name of the administrative process',
        type: 'string',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The collection name of the administrative process',
        type: 'string',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    collection_name: string;
}
