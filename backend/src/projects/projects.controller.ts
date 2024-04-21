import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Projects } from './projects.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Post()
  async create(@Body() projectData: Partial<Projects>) {
    return this.projectsService.create(projectData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() projectData: Partial<Projects>,
  ) {
    return this.projectsService.update(id, projectData);
  }

  @Get(':id/teams')
  async getTeams(@Param('id') id: string) {
    return this.projectsService.getTeams(id);
  }

  @Put(':projectId/teams/:teamId')
  async assignTeam(
    @Param('projectId') projectId: string,
    @Param('teamId') teamId: string,
  ) {
    return this.projectsService.assignTeam(projectId, teamId);
  }

  @Put(':id/boardId')
  async updateBoardId(
    @Param('id') id: string,
    @Body('boardId') boardId: string,
  ) {
    return this.projectsService.updateBoardId(id, boardId);
  }

  @Put(':id/finalize')
  async finishProject(@Param('id') id: string) {
    return this.projectsService.finalizeProject(id);
  }
}
