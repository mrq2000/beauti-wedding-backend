import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { TemplateStatus } from '../enums/template';
import Designer from './Designer';
import GenericEntity from './GenericEntity';

@Entity('templates')
export default class Template extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1023, name: 'background_img', nullable: true })
  backgroundImg: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  animation: string;

  @Column({ type: 'int', default: 0, name: 'using_count' })
  usingCount: number;

  @Column({ type: 'text' })
  data: string;

  @Column({ type: 'varchar', length: 1023, name: 'preview_img_url', nullable: true })
  previewImgUrl: string;

  @Column({ name: 'designer_id' })
  designerId: number;

  @ManyToOne<Designer>(() => Designer, (Designer) => Designer.id)
  @JoinColumn({ name: 'designer_id' })
  designer: Designer;

  @Column({ type: 'tinyint', default: TemplateStatus.ACTIVE })
  status: TemplateStatus;
}
