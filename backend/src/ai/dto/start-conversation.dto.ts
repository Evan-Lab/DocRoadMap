import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class StartConversationDTO {
    @ApiProperty({
        description: 'The collection name to get infromation from the vectorial database',
        type: 'string',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    public collection_name: string;
}
