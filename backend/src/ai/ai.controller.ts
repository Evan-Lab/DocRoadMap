import { Controller, Post, Body, Request } from "@nestjs/common";
import { AiService } from "./ai.service";
import { SendQueryGenerateRoadmapDTO } from "./dto/send-query.dto";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { SendQueryResponseDTO } from "./dto/send-query-response.dto";
import { StartConversationDTO } from "./dto/start-conversation.dto";

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @Post('query')
    @ApiBearerAuth()
    @ApiTags('AI')
    @ApiOkResponse()
    queryAi(@Request() req: any, @Body() SendQueryDTO: SendQueryGenerateRoadmapDTO): Promise<SendQueryResponseDTO> {
        return this.aiService.sendQuery(SendQueryDTO.query, SendQueryDTO.collection_name, req['user'].sub);
    }

    @Post('start-conversation')
    @ApiBearerAuth()
    @ApiTags('AI')
    @ApiOkResponse()
    startConversation(@Request() req: any, @Body() StartConversationDTO: StartConversationDTO): Promise<SendQueryResponseDTO> {
        return this.aiService.startConversation(req['user'].sub, StartConversationDTO.collection_name);
    }
}