import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import Design from './Design';
import Template from './Template';

@Entity('designs_draft')
export default class DesignDraft {
  @PrimaryColumn()
  design_id: number;

  @Column({ type: 'text' })
  data: string;

  @Column()
  template_id: number;

  @ManyToOne<Template>(() => Template, (Template) => Template.id)
  @JoinColumn({ name: 'template_id' })
  template: Template;

  @OneToOne<Design>(() => Design, (Design) => Design.id)
  @JoinColumn({ name: 'design_id' })
  designInfo: Design;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
