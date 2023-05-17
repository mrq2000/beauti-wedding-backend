import {MigrationInterface, QueryRunner} from "typeorm";

export class init1684341169947 implements MigrationInterface {
    name = 'init1684341169947'

    public async up(queryRunner: QueryRunner) {
        await queryRunner.query("CREATE TABLE `templates` (`id` int NOT NULL AUTO_INCREMENT, `data` text NOT NULL, `preview_img_url` varchar(1023) NOT NULL, `status` tinyint NOT NULL DEFAULT '2', `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `designs_public` (`user_id` int NOT NULL, `domain` varchar(63) NOT NULL, `data` text NOT NULL, `template_id` int NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX `REL_39710eeb4ee0dc641e48b717fe` (`user_id`), UNIQUE INDEX `REL_e2fd886e0970edbd166172fce0` (`template_id`), PRIMARY KEY (`user_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(31) NOT NULL, `plan` tinyint NOT NULL DEFAULT '1', `username` varchar(31) NOT NULL, `password` varchar(255) NOT NULL, `status` tinyint NOT NULL DEFAULT '1', `groom_name` varchar(63) NULL, `groom_farther_name` varchar(63) NULL, `groom_mother_name` varchar(63) NULL, `bride_name` varchar(63) NULL, `bride_farther_name` varchar(63) NULL, `bride_mother_name` varchar(63) NULL, `location` varchar(255) NULL, `time` varchar(63) NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `designs_draft` (`user_id` int NOT NULL, `data` text NOT NULL, `template_id` int NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX `REL_7cf9635ded9e3b1b58c1bc3df2` (`user_id`), UNIQUE INDEX `REL_857701d826a43c1e5ff11ccd80` (`template_id`), PRIMARY KEY (`user_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `designs_public` ADD CONSTRAINT `FK_39710eeb4ee0dc641e48b717fe1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `designs_public` ADD CONSTRAINT `FK_e2fd886e0970edbd166172fce0e` FOREIGN KEY (`template_id`) REFERENCES `templates`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `designs_draft` ADD CONSTRAINT `FK_7cf9635ded9e3b1b58c1bc3df27` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `designs_draft` ADD CONSTRAINT `FK_857701d826a43c1e5ff11ccd80d` FOREIGN KEY (`template_id`) REFERENCES `templates`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.query("ALTER TABLE `designs_draft` DROP FOREIGN KEY `FK_857701d826a43c1e5ff11ccd80d`");
        await queryRunner.query("ALTER TABLE `designs_draft` DROP FOREIGN KEY `FK_7cf9635ded9e3b1b58c1bc3df27`");
        await queryRunner.query("ALTER TABLE `designs_public` DROP FOREIGN KEY `FK_e2fd886e0970edbd166172fce0e`");
        await queryRunner.query("ALTER TABLE `designs_public` DROP FOREIGN KEY `FK_39710eeb4ee0dc641e48b717fe1`");
        await queryRunner.query("DROP INDEX `REL_857701d826a43c1e5ff11ccd80` ON `designs_draft`");
        await queryRunner.query("DROP INDEX `REL_7cf9635ded9e3b1b58c1bc3df2` ON `designs_draft`");
        await queryRunner.query("DROP TABLE `designs_draft`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `REL_e2fd886e0970edbd166172fce0` ON `designs_public`");
        await queryRunner.query("DROP INDEX `REL_39710eeb4ee0dc641e48b717fe` ON `designs_public`");
        await queryRunner.query("DROP TABLE `designs_public`");
        await queryRunner.query("DROP TABLE `templates`");
    }

}
