import {MigrationInterface, QueryRunner} from "typeorm";

export class DesignerTable1687887463048 implements MigrationInterface {
    name = 'DesignerTable1687887463048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `designers` (`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `id` int NOT NULL AUTO_INCREMENT, `username` varchar(31) NOT NULL, `password` varchar(255) NOT NULL, `status` tinyint NOT NULL DEFAULT '1', UNIQUE INDEX `IDX_678549f98d68afee500d79246c` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `designs_draft` ADD `background_img` varchar(1023) NULL");
        await queryRunner.query("ALTER TABLE `designs_public` ADD `background_img` varchar(1023) NULL");
        await queryRunner.query("ALTER TABLE `templates` ADD `background_img` varchar(1023) NULL");
        await queryRunner.query("ALTER TABLE `templates` ADD `designer_id` int NULL");
        await queryRunner.query("ALTER TABLE `templates` ADD CONSTRAINT `FK_1658fba9508c634003a6bc097ac` FOREIGN KEY (`designer_id`) REFERENCES `designers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `templates` DROP FOREIGN KEY `FK_1658fba9508c634003a6bc097ac`");
        await queryRunner.query("ALTER TABLE `templates` DROP COLUMN `designer_id`");
        await queryRunner.query("ALTER TABLE `templates` DROP COLUMN `background_img`");
        await queryRunner.query("ALTER TABLE `designs_public` DROP COLUMN `background_img`");
        await queryRunner.query("ALTER TABLE `designs_draft` DROP COLUMN `background_img`");
        await queryRunner.query("DROP INDEX `IDX_678549f98d68afee500d79246c` ON `designers`");
        await queryRunner.query("DROP TABLE `designers`");
    }

}
