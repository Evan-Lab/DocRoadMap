import { Injectable } from "@nestjs/common";
import { spawn } from "child_process";

@Injectable()
export class AiService {
    async sendQuery(prompt: string, text_to_add: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // const process = spawn('python3', ['../ia/request.py', prompt]);
            const process = spawn('python3', ['-m', 'ia.request', prompt, text_to_add], {cwd: '../'});

            let result = '';
            process.stdout.on('data', (data) => {
                result += data.toString();
                console.log(result)
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