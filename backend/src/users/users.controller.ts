import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AccessTokenGuard } from 'src/auth/strategies/accessToken.guard';
import { RolesGuard } from 'src/auth/strategies/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('/self')
  async findSelf(@Request() req) {
    console.log(req.user);

    return this.usersService.findCurrentUser(req.user.id);
  }

  @HasRoles(Role.MANAGER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put('/:id/teams')
  async addUserToTeam(
    @Param('id') id: string,
    @Body() body: { teamIds: string[] },
  ) {
    const userId = id;
    const { teamIds } = body;

    try {
      const updatedUser = await this.usersService.addUserToTeam(
        userId,
        teamIds,
      );

      return {
        message: 'User added to team',
        user: updatedUser,
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
