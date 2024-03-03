import { Projects } from '../projects/projects.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Teams {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Users, (user) => user.teams, { cascade: true })
  users: Users[];

  @OneToMany(() => Projects, (projects) => projects.teamsList, {
    cascade: true,
  })
  project: Projects[];
}
