import { Controller, Get } from '@nestjs/common';
import {ApiResponse} from "@nestjs/swagger";

@Controller('heartbeat')
export class HeartbeatController {
    @Get()
    @ApiResponse({
        schema: {
            type: 'object',
            properties: {
                status: { type: 'string' },
            },
        },
    })
    checkHeartbeat(): { status: string } {
        return { status: 'API is alive' };
    }
}
