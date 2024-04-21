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
    return this.teamsRepository
      .createQueryBuilder('team')
      .leftJoin('team.users', 'user')
      .leftJoin('team.project', 'project')
      .addSelect([
        'team',
        'user.id',
        'user.username',
        'user.email',
        'user.roles',
        'user.status',
        'project',
      ])
      .where('team.id = :id', { id })
      .getOne();
  }

  // async getTeams() {
  //   return this.teamsRepository.find({ relations: ['users'] });
  // }

  async getTeams() {
    return this.teamsRepository
      .createQueryBuilder('team')
      .leftJoin('team.users', 'user')
      .leftJoin('team.project', 'project')
      .addSelect([
        'team',
        'user.id',
        'user.username',
        'user.email',
        'user.roles',
        'user.status',
        'project',
      ]) // add the fields you want to select
      .getMany();
  }
}
