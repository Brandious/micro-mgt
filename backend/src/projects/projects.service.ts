import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './projects.entity';
import { Repository } from 'typeorm';
import { Teams } from 'src/teams/teams.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
    @InjectRepository(Teams) private teamsRepository: Repository<Teams>,
  ) {}

  async findAll(): Promise<Projects[]> {
    return this.projectsRepository.find({
      relations: ['teamsList', 'teamsList.users'],
    });
  }

  async findOne(id: string): Promise<Projects> {
    return this.projectsRepository.findOne({
      where: { id },
      relations: ['teamsList', 'teamsList.users'],
    });
  }

  // TODO: add role_guard
  async create(projectData: Partial<Projects>): Promise<Projects> {
    const project = this.projectsRepository.create(projectData);

    return await this.projectsRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    await this.projectsRepository.delete(id);
  }

  async update(id: string, projectData: Partial<Projects>): Promise<Projects> {
    await this.projectsRepository.update(id, projectData);

    return this.projectsRepository.findOne({ where: { id } });
  }

  async getTeams(id: string) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['teamsList'],
    });

    return project.teamsList;
  }

  async updateBoardId(id: string, boardId: string): Promise<Projects> {
    const project = await this.projectsRepository.findOne({
      where: { id: id },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    project.boardID = boardId;

    return this.projectsRepository.save(project);
  }

  async finalizeProject(id: string): Promise<Projects> {
    const project = await this.projectsRepository.findOne({
      where: { id: id },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    project.finished = true;

    return this.projectsRepository.save(project);
  }

  async assignTeam(projectId: string, teamId: string): Promise<Projects> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
      relations: ['teamsList'],
    });

    if (!project) {
      throw new Error('Project not found');
    }

    const team = await this.teamsRepository.findOne({
      where: { id: teamId },
      relations: ['users'],
    });

    if (!team) {
      throw new Error('Team not found');
    }

    // Assign the project to the team
    team.project = project;

    // Assign the team to the project
    await this.teamsRepository.save(team);

    // Reload the project to get the updated teams list
    return await this.projectsRepository.findOne({
      where: { id: projectId },
      relations: ['teamsList'],
    });
  }
}
