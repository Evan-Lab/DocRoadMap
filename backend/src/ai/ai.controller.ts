import { Controller, Post, Body } from "@nestjs/common";
import { AiService } from "./ai.service";
import { SendQueryDTO } from "./dto/send-query.dto";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @Post('query')
    @ApiBearerAuth()
    @ApiTags('AI')
    @ApiOkResponse()
    queryAi(@Body() SendQueryDTO: SendQueryDTO) {
        return this.aiService.sendQuery(SendQueryDTO.query, SendQueryDTO.collection_name);
    }
}