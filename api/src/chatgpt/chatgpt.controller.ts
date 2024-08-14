import { Controller, Post, Body } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('chatgpt')
export class ChatgptController {
  constructor(private readonly chatgptService: ChatgptService) {}

  @ApiTags('chat')
  @Post('send')
  async sendMessage(@Body('text') text: string): Promise<string> {
    return await this.chatgptService.sendMessage(text);
  }
}
