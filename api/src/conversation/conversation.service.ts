import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationService {
  private conversations: { [id: string]: string[] } = {};

  saveConversation(id: string, message: string): void {
    if (!this.conversations[id]) {
      this.conversations[id] = [];
    }
    this.conversations[id].push(message);
  }

  loadConversation(id: string): string[] {
    return this.conversations[id] || [];
  }
}
