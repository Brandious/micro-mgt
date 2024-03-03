import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teams } from './teams.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Teams) private teamsRepository: Repository<Teams>,
  ) {}

  async createTeam(teamData: Partial<Teams>): Promise<Teams> {
    const team = this.teamsRepository.create(teamData);

    return await this.teamsRepository.save(team);
  }

  async findOneById(id: string) {
    return this.teamsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async getTeams() {
    return this.teamsRepository.find({ relations: ['users'] });
  }
}
