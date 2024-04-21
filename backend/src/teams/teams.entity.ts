import { Projects } from '../projects/projects.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Teams {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, default: 'TEAM description' })
  description: string;

  @ManyToMany(() => Users, (user) => user.teams, { cascade: true })
  users: Users[];

  @ManyToOne(() => Projects, (projects) => projects.teamsList)
  project: Projects;
}
