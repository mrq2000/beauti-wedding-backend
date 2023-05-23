import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { DesignPlan } from '../enums/design';
import DesignDraft from './DesignDraft';
import DesignPublic from './DesignPublic';

import User from './User';

@Entity('designs')
export default class Design {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint', default: DesignPlan.FREE })
  plan: DesignPlan;

  @Column({ type: 'varchar', length: 63, unique: true })
  domain: string;

  @Column({ type: 'varchar', length: 63 })
  groom_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  groom_farther_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  groom_mother_name: string;

  @Column({ type: 'varchar', length: 63 })
  bride_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  bride_farther_name: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  bride_mother_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 63 })
  time: string;

  @Column()
  user_id: number;

  @OneToOne<User>(() => User, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  owner: User;

  @OneToOne<DesignDraft>(() => DesignDraft, (DesignDraft) => DesignDraft.designInfo)
  designDraft: DesignDraft;

  @OneToOne<DesignPublic>(() => DesignPublic, (DesignPublic) => DesignPublic.designInfo)
  designPublic: DesignPublic;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
