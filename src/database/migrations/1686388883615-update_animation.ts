import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAnimation1686388883615 implements MigrationInterface {
    name = 'updateAnimation1686388883615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `designs` DROP COLUMN `animation`");
        await queryRunner.query("ALTER TABLE `designs_draft` ADD `animation` varchar(63) NULL");
        await queryRunner.query("ALTER TABLE `designs_public` ADD `animation` varchar(63) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `designs_public` DROP COLUMN `animation`");
        await queryRunner.query("ALTER TABLE `designs_draft` DROP COLUMN `animation`");
        await queryRunner.query("ALTER TABLE `designs` ADD `animation` varchar(63) NULL");
    }

}
