import { Injectable } from "@nestjs/common";
import { spawn } from "child_process";

@Injectable()
export class AiService {
    async sendQuery(prompt: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const process = spawn('python3', ['../ia/request.py', prompt]);

            let result = '';
            process.stdout.on('data', (data) => {
                result += data.toString();
            })

            process.stderr.on('data', (data) => {
                console.error(`Erreur Python: ${data.toString()}`)
                reject(`Error: ${data}`)
            })

            process.on('close', () => {
                try {
                    resolve(JSON.parse(result))
                } catch (e) {
                    reject('Invalid JSON')
                }
            })
        })
    }
}