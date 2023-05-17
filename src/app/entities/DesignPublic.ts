import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import Template from './Template';

import User from './User';

@Entity('designs_public')
export default class DesignPublic {
  @PrimaryColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 63 })
  domain: string;

  @Column({ type: 'text' })
  data: string;

  @OneToOne<User>(() => User, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  owner: User;

  @Column()
  template_id: number;

  @OneToOne<Template>(() => Template, (Template) => Template.id)
  @JoinColumn({ name: 'template_id' })
  template: Template;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
