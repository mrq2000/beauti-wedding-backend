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

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'tinyint', default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'varchar', length: 63 })
  broom_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  broom_farther_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  broom_mother_name: string;

  @Column({ type: 'varchar', length: 63 })
  bride_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  bride_farther_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  bride_mother_name: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'varchar', length: 63 })
  time: string;

  @OneToOne<Design>(() => Design, (Design) => Design.user)
  design: Design;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
