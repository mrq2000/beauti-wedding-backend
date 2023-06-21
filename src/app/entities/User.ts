import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { UserStatus } from '../enums/user';
import Design from './Design';
import GenericEntity from './GenericEntity';

@Entity('users')
export default class User extends GenericEntity {
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

  @OneToMany(() => Design, (Design) => Design.owner)
  designs: Design[];
}
