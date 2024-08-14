import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OllamaService {
    private readonly ollamaApiUrl: string;

    constructor(
        private readonly httpService: HttpService,
        configService: ConfigService,
    ) {
        this.ollamaApiUrl = configService.get<string>('OLLAMA_API_URL');
    }

    async fetchOllamaData(model: string, prompt: string): Promise<any> {
        //configService.get<string>('OPENAI_API_KEY')
        const url = `${this.ollamaApiUrl}/api/generate`;

        try {
            const response = await firstValueFrom(this.httpService
                .post(url, {
                    model: model,
                    prompt: prompt
                })
            );

            return response.data;
        } catch (error) {
            throw new HttpException(error.response?.data || 'Ollama API request failed', error.response?.status || 500);
        }
    }

    async fetchAvailableModels(): Promise<any> {
        const url = `${this.ollamaApiUrl}/api/tags`;

        try {
            const response = await firstValueFrom(this.httpService.get(url));
            return response.data;
        } catch (error) {
            throw new HttpException(error.response?.data || 'Failed to fetch Ollama models', error.response?.status || 500);
        }
    }
}
