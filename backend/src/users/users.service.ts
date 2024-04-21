import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { Teams } from 'src/teams/teams.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Teams) private teamsRepository: Repository<Teams>,
  ) {}

  private async comparePasswords(
    userPassword: string,
    currentPassword: string,
  ) {
    return await bcrypt.compare(currentPassword, userPassword);
  }

  async findOneByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findOneById(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async validateCredentials({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<Users> {
    const user = await this.findOneByUsername(username);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const areEqual = await this.comparePasswords(user.password, password);

    if (!areEqual)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return user;
  }

  async create({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }): Promise<Users> {
    const userInDb = await this.findOneByUsername(username);

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: Users = this.usersRepository.create({
      username,
      password,
      email,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async update(
    id: string,
    updateUserDto: { refreshToken: string },
  ): Promise<UpdateResult> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async addUserToTeam(userId: string, teamId: string[]): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['teams'],
    });

    if (!user) {
      throw new HttpException('User or team not found', HttpStatus.NOT_FOUND);
    }

    const teams = await this.teamsRepository.findBy({ id: In(teamId) });

    user.teams = teams;

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find({
      select: ['id', 'username', 'email', 'location', 'roles', 'teams'], // include other fields as needed
    });
  }

  async findCurrentUser(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      select: [
        'id',
        'username',
        'email',
        'location',
        'roles',
        'teams',
        'status',
      ],
      relations: ['teams', 'teams.project'], // include other fields as needed
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
