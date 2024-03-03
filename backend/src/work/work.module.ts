import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}