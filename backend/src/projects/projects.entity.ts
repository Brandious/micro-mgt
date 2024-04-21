import { Teams } from '../teams/teams.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startDate: Date;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  expectedFinishingDate: Date;

  @Column()
  description: string;

  @Column({ nullable: true })
  boardID: string;

  @Column({ default: false })
  finished: boolean;

  @OneToMany(() => Teams, (teams) => teams.project)
  teamsList: Teams[];
}
