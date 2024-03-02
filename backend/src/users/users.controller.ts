import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(username: string, password: string) {
  //   return await this.usersService.create(username, password);
  // }

  // @Post('register')
  // async register(username: string, password: string) {
  //   return await this.usersService.register(username, password);
  // }
}
