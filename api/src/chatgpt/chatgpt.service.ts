import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ChatgptService {
  private readonly apiUrl =
    'https://api.openai.com/v1/engines/davinci-codex/completions';
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.apiKey = configService.get<string>('OPENAI_API_KEY');
  }

  async sendMessage(prompt: string): Promise<string> {
    const response = await this.httpService
      .post(
        this.apiUrl,
        {
          prompt,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      )
      .toPromise();

    return response.data.choices[0].text.trim();
  }
}
