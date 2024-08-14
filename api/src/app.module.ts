import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatgptService } from './chatgpt/chatgpt.service';
import { ChatgptController } from './chatgpt/chatgpt.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TimeController } from './time/time.controller';
import { ConversationService } from './conversation/conversation.service';
import { ConversationController } from './conversation/conversation.controller';
import { HeartbeatController } from './heartbeat/heartbeat.controller';
import { OllamaService } from './ollama/ollama.service';
import { OllamaController } from './ollama/ollama.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [
    AppController,
    ChatgptController,
    TimeController,
    ConversationController,
    HeartbeatController,
    OllamaController,
  ],
  providers: [AppService, ChatgptService, ConversationService, OllamaService],
})
export class AppModule {}
