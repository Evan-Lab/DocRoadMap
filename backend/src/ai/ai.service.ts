import { Injectable } from "@nestjs/common";
import axios from "axios"
import { SendQueryResponseDTO } from "./dto/send-query-response.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AiHistory } from "src/ai_history/entities/ai_history.entity";
import { User } from "src/users/entities/user.entity";
import { AiHistoryService } from "src/ai_history/ai_history.service";

@Injectable()
export class AiService {
    constructor(
        @InjectRepository(AiHistory)
        private aiHistoryRepository: Repository<AiHistory>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        private readonly aiHistoryService: AiHistoryService
    ) {}

    async sendQuery(prompt: string, collection_name: string, user_id: number): Promise<SendQueryResponseDTO> {
        try {
            let ai_history = await this.aiHistoryRepository.findOneBy({ user: { id: user_id } });
            if (!ai_history) {
                const user = await this.userRepository.findOneBy({ id: user_id });
                if (!user) {
                    throw new Error("User not found");
                }
            }

            const response = await axios.post("http://127.0.0.1:8083/ia/request", {
                "user_input": prompt,
                "collection_name": collection_name,
                "history": ai_history.history
            });
            
            let responseData = null;
            try {
                responseData = {
                    is_roadmap: response.data.is_roadmap,
                    collection_name: collection_name,
                    response: response.data.question,
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de la réponse:", error);
                responseData = {
                    is_roadmap: response.data.is_roadmap,
                    roadmap: response.data.roadmap,
                };
            }

            if (responseData.is_roadmap == false) {
                const createHistoryDTO = {
                    history: "Answer: " + prompt + "\n Question: " + responseData.response,
                    userId: user_id
                };

                await this.aiHistoryService.appendToHistory(createHistoryDTO);
            }

            if (responseData.is_roadmap) {
                await this.aiHistoryRepository.delete({ user: { id: user_id } });
            }

            return responseData;
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error);
            throw new Error("Erreur de communication avec le service IA");
        }
    }

    async startConversation(user_id: number, collection_name: string): Promise<SendQueryResponseDTO> {
        try {
            let ai_history = await this.aiHistoryRepository.findOneBy({ user: { id: user_id } });

            const response = await axios.post("http://127.0.0.1:8083/ia/start-conversation", {
                "collection_name": collection_name
            });

            if (!ai_history) {
                const user = await this.userRepository.findOneBy({ id: user_id });
                if (!user) {
                    throw new Error("User not found");
                }

                ai_history = this.aiHistoryRepository.create({
                    history: "Question: " + response.data.question,
                    user: user
                });
                await this.aiHistoryRepository.save(ai_history);
            }
    
            return { is_roadmap: false, collection_name: collection_name, response: response.data.message + "\n" + response.data.question };
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error);
            throw new Error("Erreur de communication avec le service IA");
        }
    }
}