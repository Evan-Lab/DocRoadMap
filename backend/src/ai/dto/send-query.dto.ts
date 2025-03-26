import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendQueryDTO {
    @ApiProperty({
        description: 'The query to send to the model AI',
        type: 'string',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    public query: string;

    @ApiProperty({
        description: 'The knowledge to send to the model AI',
        type: 'string',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    public text_to_add: string
}
