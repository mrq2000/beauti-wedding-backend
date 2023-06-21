import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateName1686472993316 implements MigrationInterface {
  name = 'updateName1686472993316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `designs` CHANGE `bride_farther_name` `bride_father_name` varchar(63) NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `designs` CHANGE `bride_father_name` `bride_farther_name` varchar(63) NULL');
  }
}
