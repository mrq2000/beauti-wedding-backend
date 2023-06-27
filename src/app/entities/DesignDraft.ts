import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import Design from './Design';
import GenericEntity from './GenericEntity';

@Entity('designs_draft')
export default class DesignDraft extends GenericEntity {
  @PrimaryColumn({ name: 'design_id' })
  designId: number;

  @Column({ type: 'text' })
  data: string;

  @Column({ type: 'varchar', length: 63, nullable: true })
  animation: string;

  @Column({ type: 'varchar', length: 1023, name: 'background_img', nullable: true })
  backgroundImg: string;

  @OneToOne<Design>(() => Design, (Design) => Design.id)
  @JoinColumn({ name: 'design_id' })
  designInfo: Design;
}
