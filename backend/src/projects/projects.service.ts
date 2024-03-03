import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './projects.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
  ) {}

  async findAll(): Promise<Projects[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: string): Promise<Projects> {
    return this.projectsRepository.findOne({
      where: { id },
    });
  }

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
}
