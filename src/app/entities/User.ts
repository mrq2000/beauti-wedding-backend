import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import { UserStatus, UserPlan } from '../enums/user';
import DesignDraft from './DesignDraft';
import DesignPublic from './DesignPublic';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 31 })
  email: string;

  @Column({ type: 'tinyint', default: UserPlan.FREE })
  plan: UserPlan;

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

  @OneToOne<DesignDraft>(() => DesignDraft, (DesignDraft) => DesignDraft.owner)
  designDraft: DesignDraft;

  @OneToOne<DesignPublic>(() => DesignPublic, (DesignPublic) => DesignPublic.owner)
  designPublic: DesignPublic;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
