import { Teams } from '../teams/teams.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Teams, (teams) => teams.project, { nullable: true })
  teamsList: Teams[];

  @Column({ nullable: true })
  teamId: string;
}
