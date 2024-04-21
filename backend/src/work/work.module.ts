import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { WorkGateway } from './work.gateway';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work, Users])],
  controllers: [WorkController],
  providers: [WorkService, WorkGateway],
})
export class WorkModule {}
