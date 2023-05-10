import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDatabase1683738766866 implements MigrationInterface {
  name = 'initDatabase1683738766866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `templates` (`id` int NOT NULL AUTO_INCREMENT, `data` text NOT NULL, `status` tinyint NOT NULL DEFAULT '2', `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      "CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(31) NOT NULL, `username` varchar(31) NOT NULL, `password` varchar(255) NOT NULL, `status` tinyint NOT NULL DEFAULT '1', `broom_name` varchar(63) NOT NULL, `broom_farther_name` varchar(63) NULL, `broom_mother_name` varchar(63) NULL, `bride_name` varchar(63) NOT NULL, `bride_farther_name` varchar(63) NULL, `bride_mother_name` varchar(63) NULL, `location` varchar(255) NOT NULL, `time` varchar(63) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      "CREATE TABLE `designs` (`id` int NOT NULL AUTO_INCREMENT, `data_draft` text NOT NULL, `data_public` text NULL, `status` tinyint NOT NULL DEFAULT '3', `plan` tinyint NOT NULL DEFAULT '1', `user_id` int NOT NULL, `template_id` int NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX `REL_93aeb3b58f44d329aedfb44a89` (`template_id`), UNIQUE INDEX `REL_752eefca9c7ba701f687b77bc8` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'ALTER TABLE `designs` ADD CONSTRAINT `FK_93aeb3b58f44d329aedfb44a896` FOREIGN KEY (`template_id`) REFERENCES `templates`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `designs` ADD CONSTRAINT `FK_752eefca9c7ba701f687b77bc82` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `designs` DROP FOREIGN KEY `FK_752eefca9c7ba701f687b77bc82`');
    await queryRunner.query('ALTER TABLE `designs` DROP FOREIGN KEY `FK_93aeb3b58f44d329aedfb44a896`');
    await queryRunner.query('DROP INDEX `REL_752eefca9c7ba701f687b77bc8` ON `designs`');
    await queryRunner.query('DROP INDEX `REL_93aeb3b58f44d329aedfb44a89` ON `designs`');
    await queryRunner.query('DROP TABLE `designs`');
    await queryRunner.query('DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`');
    await queryRunner.query('DROP TABLE `users`');
    await queryRunner.query('DROP TABLE `templates`');
  }
}
