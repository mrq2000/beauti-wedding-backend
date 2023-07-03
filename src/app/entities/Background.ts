import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import GenericEntity from './GenericEntity';

@Entity('backgrounds')
export default class Template extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1023, name: 'background_img' })
  backgroundImg: string;
}
