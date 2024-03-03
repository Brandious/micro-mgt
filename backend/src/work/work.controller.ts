import { Body, Controller, Post } from '@nestjs/common';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post('startDay')
  async startWorkSession(@Body() user: { userId: string }) {
    return this.workService.startWorkSession(user.userId);
  }

  @Post('endDay')
  async endWorkSession(@Body() session: { sessionId: string }) {
    return this.workService.endWorkSession(session.sessionId);
  }
}
