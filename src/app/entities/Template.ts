import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { TemplateStatus } from '../enums/template';

@Entity('templates')
export default class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  data: string;

  @Column({ type: 'tinyint', default: TemplateStatus.INACTIVE })
  status: TemplateStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
