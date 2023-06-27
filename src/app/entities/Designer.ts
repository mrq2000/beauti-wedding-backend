import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { DesignerStatus } from './../enums/designer';
import GenericEntity from './GenericEntity';
import Template from './Template';

@Entity('designers')
export default class Designer extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 31, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'tinyint', default: DesignerStatus.ACTIVE })
  status: DesignerStatus;

  @OneToMany(() => Template, (Template) => Template.designer)
  designs: Template[];
}
