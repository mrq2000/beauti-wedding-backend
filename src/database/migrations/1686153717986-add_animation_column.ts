import {MigrationInterface, QueryRunner} from "typeorm";

export class addAnimationColumn1686153717986 implements MigrationInterface {
    name = 'addAnimationColumn1686153717986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `templates` ADD `animation` varchar(63) NULL");
        await queryRunner.query("ALTER TABLE `designs` ADD `animation` varchar(63) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `designs` DROP COLUMN `animation`");
        await queryRunner.query("ALTER TABLE `templates` DROP COLUMN `animation`");
    }

}
