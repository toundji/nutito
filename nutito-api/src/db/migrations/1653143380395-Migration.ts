import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1653143380395 implements MigrationInterface {
    name = 'Migration1653143380395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "country" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "country"`);
    }

}
