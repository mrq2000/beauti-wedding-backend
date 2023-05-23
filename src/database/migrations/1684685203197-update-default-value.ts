import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDefaultValue1684685203197 implements MigrationInterface {
    name = 'updateDefaultValue1684685203197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `templates` CHANGE `status` `status` tinyint NOT NULL DEFAULT '1'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `templates` CHANGE `status` `status` tinyint NOT NULL DEFAULT '2'");
    }

}
