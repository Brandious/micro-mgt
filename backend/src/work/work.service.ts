import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from './work.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private readonly workSessionRepository: Repository<Work>,
  ) {}

  async startWorkSession(userId: string) {
    const newWorkSession = this.workSessionRepository.create({
      user: { id: userId }, // Set the user
      start_time: new Date(), // Set the start time to now
      // Don't set end_time, it should be null when the session starts
    });

    // Save the new WorkSession entity in the database
    return await this.workSessionRepository.save(newWorkSession);
  }

  async endWorkSession(sessionId: string) {
    // Find the WorkSession entity with the given ID
    const workSession = await this.workSessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!workSession) {
      throw new Error('Work session not found');
    }

    // Update the end_time to now
    workSession.end_time = new Date();

    // Save the updated WorkSession entity in the database
    return await this.workSessionRepository.save(workSession);
  }
}
