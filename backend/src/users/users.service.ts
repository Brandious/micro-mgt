import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
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
  }: {
    username: string;
    password: string;
  }): Promise<Users> {
    const userInDb = await this.findOneByUsername(username);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: Users = this.usersRepository.create({
      username,
      password,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
