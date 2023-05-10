import { DesignStatus, DesignPlan } from '../enums/design';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import Template from './Template';

import User from './User';

@Entity('designs')
export default class Design {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  data_draft: string;

  @Column({ type: 'text', nullable: true })
  data_public: string;

  @Column({ type: 'tinyint', default: DesignStatus.DRAFT })
  status: DesignStatus;

  @Column({ type: 'tinyint', default: DesignPlan.FREE })
  plan: DesignPlan;

  @Column()
  user_id: number;

  @Column()
  template_id: number;

  @OneToOne<Template>(() => Template, (Template) => Template.id)
  @JoinColumn({ name: 'template_id' })
  template: Template;

  @OneToOne<User>(() => User, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
