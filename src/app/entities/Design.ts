import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { DesignPlan } from '../enums/design';
import DesignDraft from './DesignDraft';
import DesignPublic from './DesignPublic';
import GenericEntity from './GenericEntity';

import User from './User';

@Entity('designs')
export default class Design extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint', default: DesignPlan.FREE })
  plan: DesignPlan;

  @Column({ type: 'varchar', length: 63, unique: true })
  domain: string;

  @Column({ type: 'varchar', length: 1023, name: 'preview_img_url', nullable: true })
  previewImgUrl: string;

  @Column({ type: 'text', nullable: true })
  receivers: string;

  @Column({ type: 'varchar', length: 63, name: 'groom_name' })
  groomName: string;

  @Column({ type: 'varchar', length: 63, nullable: true, name: 'groom_farther_name' })
  groomFatherName: string;

  @Column({ type: 'varchar', length: 63, nullable: true, name: 'groom_mother_name' })
  groomMotherName: string;

  @Column({ type: 'varchar', length: 63, name: 'bride_name' })
  brideName: string;

  @Column({ type: 'varchar', length: 63, nullable: true, name: 'bride_father_name' })
  brideFatherName: string;

  @Column({ type: 'varchar', length: 63, nullable: true, name: 'bride_mother_name' })
  brideMotherName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 63 })
  time: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne<User>(() => User, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  owner: User;

  @OneToOne<DesignDraft>(() => DesignDraft, (DesignDraft) => DesignDraft.designInfo, {
    cascade: ['insert'],
  })
  designDraft: DesignDraft;

  @OneToOne<DesignPublic>(() => DesignPublic, (DesignPublic) => DesignPublic.designInfo)
  designPublic: DesignPublic;
}
