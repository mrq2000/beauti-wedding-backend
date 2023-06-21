import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { TemplateStatus } from '../enums/template';
import GenericEntity from './GenericEntity';

@Entity('templates')
export default class Template extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 63, nullable: true })
  animation: string;

  @Column({ type: 'int', default: 0, name: 'using_count' })
  usingCount: number;

  @Column({ type: 'text' })
  data: string;

  @Column({ type: 'varchar', length: 1023, name: 'preview_img_url' })
  previewImgUrl: string;

  @Column({ type: 'tinyint', default: TemplateStatus.ACTIVE })
  status: TemplateStatus;
}
