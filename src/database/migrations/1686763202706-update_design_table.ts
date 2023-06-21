import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDesignTable1686763202706 implements MigrationInterface {
    name = 'updateDesignTable1686763202706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `designs` ADD `receivers` text NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `designs` DROP COLUMN `receivers`");
    }

}
