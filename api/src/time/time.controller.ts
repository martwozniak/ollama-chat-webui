import { Controller, Get } from '@nestjs/common';
import {ApiBody, ApiResponse} from "@nestjs/swagger";

@Controller('time')
export class TimeController {
  @Get()
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        currentTime: { type: 'string', format: 'date-time' },
      },
    },
  })
  getCurrentTime(): { currentTime: string } {
    const currentTime = new Date().toISOString();
    return { currentTime };
  }
}
