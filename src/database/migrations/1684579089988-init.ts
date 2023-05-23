import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1684579089988 implements MigrationInterface {
  name = 'init1684579089988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `templates` (`id` int NOT NULL AUTO_INCREMENT, `data` text NOT NULL, `preview_img_url` varchar(1023) NOT NULL, `status` tinyint NOT NULL DEFAULT '2', `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'CREATE TABLE `designs_draft` (`design_id` int NOT NULL, `data` text NOT NULL, `template_id` int NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX `REL_857701d826a43c1e5ff11ccd80` (`template_id`), UNIQUE INDEX `REL_58c34055ab3e1688b9f6aec8fa` (`design_id`), PRIMARY KEY (`design_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `designs_public` (`design_id` int NOT NULL, `data` text NOT NULL, `template_id` int NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX `REL_e2fd886e0970edbd166172fce0` (`template_id`), UNIQUE INDEX `REL_eee5a328e94aac40fcf36eb8a8` (`design_id`), PRIMARY KEY (`design_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      "CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(31) NOT NULL, `username` varchar(31) NOT NULL, `password` varchar(255) NOT NULL, `status` tinyint NOT NULL DEFAULT '1', `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      "CREATE TABLE `designs` (`id` int NOT NULL AUTO_INCREMENT, `plan` tinyint NOT NULL DEFAULT '1', `domain` varchar(63) NOT NULL, `groom_name` varchar(63) NOT NULL, `groom_farther_name` varchar(63) NULL, `groom_mother_name` varchar(63) NULL, `bride_name` varchar(63) NOT NULL, `bride_farther_name` varchar(63) NULL, `bride_mother_name` varchar(63) NULL, `location` varchar(255) NULL, `time` varchar(63) NOT NULL, `user_id` int NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_2c0eff16949de92bd34b4a6057` (`domain`), UNIQUE INDEX `REL_752eefca9c7ba701f687b77bc8` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'ALTER TABLE `designs_draft` ADD CONSTRAINT `FK_857701d826a43c1e5ff11ccd80d` FOREIGN KEY (`template_id`) REFERENCES `templates`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `designs_draft` ADD CONSTRAINT `FK_58c34055ab3e1688b9f6aec8fac` FOREIGN KEY (`design_id`) REFERENCES `designs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `designs_public` ADD CONSTRAINT `FK_e2fd886e0970edbd166172fce0e` FOREIGN KEY (`template_id`) REFERENCES `templates`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `designs_public` ADD CONSTRAINT `FK_eee5a328e94aac40fcf36eb8a8f` FOREIGN KEY (`design_id`) REFERENCES `designs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `designs` ADD CONSTRAINT `FK_752eefca9c7ba701f687b77bc82` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `designs` DROP FOREIGN KEY `FK_752eefca9c7ba701f687b77bc82`');
    await queryRunner.query('ALTER TABLE `designs_public` DROP FOREIGN KEY `FK_eee5a328e94aac40fcf36eb8a8f`');
    await queryRunner.query('ALTER TABLE `designs_public` DROP FOREIGN KEY `FK_e2fd886e0970edbd166172fce0e`');
    await queryRunner.query('ALTER TABLE `designs_draft` DROP FOREIGN KEY `FK_58c34055ab3e1688b9f6aec8fac`');
    await queryRunner.query('ALTER TABLE `designs_draft` DROP FOREIGN KEY `FK_857701d826a43c1e5ff11ccd80d`');
    await queryRunner.query('DROP INDEX `REL_752eefca9c7ba701f687b77bc8` ON `designs`');
    await queryRunner.query('DROP INDEX `IDX_2c0eff16949de92bd34b4a6057` ON `designs`');
    await queryRunner.query('DROP TABLE `designs`');
    await queryRunner.query('DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`');
    await queryRunner.query('DROP TABLE `users`');
    await queryRunner.query('DROP INDEX `REL_eee5a328e94aac40fcf36eb8a8` ON `designs_public`');
    await queryRunner.query('DROP INDEX `REL_e2fd886e0970edbd166172fce0` ON `designs_public`');
    await queryRunner.query('DROP TABLE `designs_public`');
    await queryRunner.query('DROP INDEX `REL_58c34055ab3e1688b9f6aec8fa` ON `designs_draft`');
    await queryRunner.query('DROP INDEX `REL_857701d826a43c1e5ff11ccd80` ON `designs_draft`');
    await queryRunner.query('DROP TABLE `designs_draft`');
    await queryRunner.query('DROP TABLE `templates`');
  }
}
