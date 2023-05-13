import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateNullAbleField1683967401984 implements MigrationInterface {
  name = 'updateNullAbleField1683967401984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `users` CHANGE `groom_name` `groom_name` varchar(63) NULL');
    await queryRunner.query('ALTER TABLE `users` CHANGE `bride_name` `bride_name` varchar(63) NULL');
    await queryRunner.query('ALTER TABLE `users` CHANGE `location` `location` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `users` CHANGE `time` `time` varchar(63) NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `users` CHANGE `time` `time` varchar(63) NOT NULL');
    await queryRunner.query('ALTER TABLE `users` CHANGE `location` `location` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `users` CHANGE `bride_name` `bride_name` varchar(63) NOT NULL');
    await queryRunner.query('ALTER TABLE `users` CHANGE `groom_name` `groom_name` varchar(63) NOT NULL');
  }
}
