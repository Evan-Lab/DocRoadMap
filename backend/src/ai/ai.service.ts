import { Injectable } from "@nestjs/common";
import axios from "axios"

@Injectable()
export class AiService {
    async sendQuery(prompt: string, collection_name: string) {
        try {
            const response = await axios.post("http://127.0.0.1:8083/ia/request", {
                "user_input": prompt,
                "collection_name": collection_name
            });

            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error);
            throw new Error("Erreur de communication avec le service IA");
        }
    }
}