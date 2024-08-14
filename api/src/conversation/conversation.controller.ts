import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
  @ApiTags('chat')
  @Post('save')
  saveConversation(
    @Body('id') id: string,
    @Body('message') message: string,
  ): { status: string } {
    this.conversationService.saveConversation(id, message);
    return { status: 'Message saved successfully' };
  }
  @ApiTags('chat')
  @Get('load/:id')
  loadConversation(@Param('id') id: string): { messages: string[] } {
    const messages = this.conversationService.loadConversation(id);
    return { messages };
  }
}
