import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Teams } from './teams.entity';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AccessTokenGuard } from 'src/auth/strategies/accessToken.guard';
import { RolesGuard } from 'src/auth/strategies/roles.guard';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @HasRoles(Role.MANAGER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  async createTeam(@Body() teamData: Partial<Teams>): Promise<Teams> {
    return await this.teamsService.createTeam(teamData);
  }

  @HasRoles(Role.MANAGER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  async getTeams() {
    return await this.teamsService.getTeams();
  }
}
