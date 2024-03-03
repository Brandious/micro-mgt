import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<string> {
    console.log(
      await this.tasksService
        .findAll()
        .subscribe((res) => console.log(res.data)),
    );
    return 'This action returns all tasks';
  }
}
