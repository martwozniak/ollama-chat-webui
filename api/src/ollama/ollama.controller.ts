import {Controller, Post, Body, Get} from '@nestjs/common';
import { OllamaService } from './ollama.service';
import {ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('ollama')
export class OllamaController {
    constructor(private readonly ollamaService: OllamaService) {}

    @ApiTags('chat')
    @Post('query')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                model: { type: 'string' },
                query: { type: 'string' }
            },
            required: ['model', 'query']
        }
    })
    async queryOllama(
        @Body('model') model: string,
        @Body('query') query: string
    ): Promise<any> {
        return this.ollamaService.fetchOllamaData(model, query);
    }
    @ApiTags('chat')
    @Get('models')
    @ApiResponse({
        schema: {
            type: 'object',
            properties: {
                models: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            model: { type: 'string' },
                            modified_at: { type: 'string', format: 'date-time' },
                            size: { type: 'integer' },
                            digest: { type: 'string' },
                            details: {
                                type: 'object',
                                properties: {
                                    parent_model: { type: 'string' },
                                    format: { type: 'string' },
                                    family: { type: 'string' },
                                    families: {
                                        type: 'array',
                                        items: { type: 'string' },
                                    },
                                    parameter_size: { type: 'string' },
                                    quantization_level: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    async getAvailableModels(): Promise<any> {
        return this.ollamaService.fetchAvailableModels();
    }
}
