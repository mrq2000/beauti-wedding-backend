import {MigrationInterface, QueryRunner} from "typeorm";

export class init1687971752479 implements MigrationInterface {
    name = 'init1687971752479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `backgrounds` (`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `id` int NOT NULL AUTO_INCREMENT, `background_img` varchar(1023) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `designs_draft` (`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `design_id` int NOT NULL, `data` text NOT NULL, `animation` varchar(63) NULL, `background_img` varchar(1023) NULL, UNIQUE INDEX `REL_58c34055ab3e1688b9f6aec8fa` (`design_id`), PRIMARY KEY (`design_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `designs_public` (`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `design_id` int NOT NULL, `data` text NOT NULL, `animation` varchar(63) NULL, `background_img` varchar(1023) NULL, UNIQUE INDEX `REL_eee5a328e94aac40fcf36eb8a8` (`design_id`), PRIMARY KEY (`design_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `id` int NOT NULL AUTO_INCREMENT, `email` varchar(31) NOT NULL, `username` varchar(31) NOT NULL, `password` varchar(255) NOT NULL, `status` tinyint NOT NULL DEFAULT '1', UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `designs` (`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `id` int NOT NULL AUTO_INCREMENT, `plan` tinyint NOT NULL DEFAULT '1', `domain` varchar(63) NOT NULL, `preview_img_url` varchar(1023) NULL, `receivers` text NULL, `groom_name` varchar(63) NOT NULL, `groom_farther_name` varchar(63) NULL, `groom_mother_name` varchar(63) NULL, `bride_name` varchar(63) NOT NULL, `bride_father_name` varchar(63) NULL, `bride_mother_name` varchar(63) NULL, `location` varchar(255) NULL, `time` varchar(63) NOT NULL, `user_id` int NOT NULL, UNIQUE INDEX `IDX_2c0eff16949de92bd34b4a6057` (`domain`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `templates` (`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `id` int NOT NULL AUTO_INCREMENT, `background_img` varchar(1023) NULL, `animation` varchar(63) NULL, `using_count` int NOT NULL DEFAULT '0', `data` text NOT NULL, `preview_img_url` varchar(1023) NOT NULL, `status` tinyint NOT NULL DEFAULT '1', `designer_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `designers` (`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `id` int NOT NULL AUTO_INCREMENT, `username` varchar(31) NOT NULL, `password` varchar(255) NOT NULL, `status` tinyint NOT NULL DEFAULT '1', UNIQUE INDEX `IDX_678549f98d68afee500d79246c` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `designs_draft` ADD CONSTRAINT `FK_58c34055ab3e1688b9f6aec8fac` FOREIGN KEY (`design_id`) REFERENCES `designs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `designs_public` ADD CONSTRAINT `FK_eee5a328e94aac40fcf36eb8a8f` FOREIGN KEY (`design_id`) REFERENCES `designs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `designs` ADD CONSTRAINT `FK_752eefca9c7ba701f687b77bc82` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `templates` ADD CONSTRAINT `FK_1658fba9508c634003a6bc097ac` FOREIGN KEY (`designer_id`) REFERENCES `designers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `templates` DROP FOREIGN KEY `FK_1658fba9508c634003a6bc097ac`");
        await queryRunner.query("ALTER TABLE `designs` DROP FOREIGN KEY `FK_752eefca9c7ba701f687b77bc82`");
        await queryRunner.query("ALTER TABLE `designs_public` DROP FOREIGN KEY `FK_eee5a328e94aac40fcf36eb8a8f`");
        await queryRunner.query("ALTER TABLE `designs_draft` DROP FOREIGN KEY `FK_58c34055ab3e1688b9f6aec8fac`");
        await queryRunner.query("DROP INDEX `IDX_678549f98d68afee500d79246c` ON `designers`");
        await queryRunner.query("DROP TABLE `designers`");
        await queryRunner.query("DROP TABLE `templates`");
        await queryRunner.query("DROP INDEX `IDX_2c0eff16949de92bd34b4a6057` ON `designs`");
        await queryRunner.query("DROP TABLE `designs`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `REL_eee5a328e94aac40fcf36eb8a8` ON `designs_public`");
        await queryRunner.query("DROP TABLE `designs_public`");
        await queryRunner.query("DROP INDEX `REL_58c34055ab3e1688b9f6aec8fa` ON `designs_draft`");
        await queryRunner.query("DROP TABLE `designs_draft`");
        await queryRunner.query("DROP TABLE `backgrounds`");
    }

}
