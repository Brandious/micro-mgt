import * as bcrypt from 'bcrypt';
import { Role } from '../enums/role.enum';

import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teams } from '../teams/teams.entity';
import { Work } from '../work/work.entity';
export enum Status {
  Online = 'online',
  Offline = 'offline',
  Idle = 'idle',
}
@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  location: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Offline,
  })
  status: string;

  @Column('text', { array: true, default: [Role.USER] })
  roles: Role[];

  @ManyToMany(() => Teams, (team) => team.users)
  @JoinTable({
    name: 'users_teams',
  })
  teams: Teams[];

  @OneToMany(() => Work, (workSession) => workSession.user)
  workSessions: Work[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
