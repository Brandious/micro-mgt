import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { map } from 'rxjs';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<any> {
    const res = this.tasksService
      .findAllProjects()
      .pipe(map((res) => res.data));
    return res;
  }

  @Get('board')
  async getBoard(): Promise<any> {
    const res = this.tasksService.getBoard().pipe(map((res) => res.data));
    return res;
  }

  @Get('board/:boardId')
  async getBoardById(@Param('boardId') boardId: string): Promise<any> {
    const res = this.tasksService
      .getBoardById(boardId)
      .pipe(map((res) => res.data));
    return res;
  }

  @Get('issues/:boardId')
  async getIssues(@Param('boardId') boardId: string): Promise<any> {
    const res = this.tasksService
      .getIssues(boardId)
      .pipe(map((res) => res.data));
    return res;
  }
}
