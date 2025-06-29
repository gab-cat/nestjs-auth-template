import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Check server health' })
  @ApiResponse({
    status: 200,
    description: 'Server is running',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
      },
    },
  })
  getHealth() {
    return this.appService.getHealth();
  }
}
