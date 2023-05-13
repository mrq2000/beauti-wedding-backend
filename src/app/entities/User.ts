import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';

import { UserStatus } from '../enums/user';
import Design from './Design';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 31 })
  email: string;

  @Column({ type: 'varchar', length: 31, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'tinyint', default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'varchar', length: 63, nullable: true })
  groom_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  groom_farther_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  groom_mother_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  bride_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  bride_farther_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  bride_mother_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  time: string;

  @OneToOne<Design>(() => Design, (Design) => Design.user)
  design: Design;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
