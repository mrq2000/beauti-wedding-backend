import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTemplateColumn1686154585531 implements MigrationInterface {
    name = 'updateTemplateColumn1686154585531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `designs_draft` DROP FOREIGN KEY `FK_857701d826a43c1e5ff11ccd80d`");
        await queryRunner.query("ALTER TABLE `designs_public` DROP FOREIGN KEY `FK_e2fd886e0970edbd166172fce0e`");
        await queryRunner.query("ALTER TABLE `designs_draft` DROP COLUMN `template_id`");
        await queryRunner.query("ALTER TABLE `designs_public` DROP COLUMN `template_id`");
        await queryRunner.query("ALTER TABLE `templates` ADD `using_count` int NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `templates` DROP COLUMN `using_count`");
        await queryRunner.query("ALTER TABLE `designs_public` ADD `template_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `designs_draft` ADD `template_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `designs_public` ADD CONSTRAINT `FK_e2fd886e0970edbd166172fce0e` FOREIGN KEY (`template_id`) REFERENCES `templates`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `designs_draft` ADD CONSTRAINT `FK_857701d826a43c1e5ff11ccd80d` FOREIGN KEY (`template_id`) REFERENCES `templates`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
