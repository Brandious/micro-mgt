import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './projects.entity';
import { Teams } from 'src/teams/teams.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projects, Teams])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
