import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1653861210981 implements MigrationInterface {
    name = 'Migration1653861210981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "licence" ADD "monthsNumber" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "monthsNumber"`);
    }

}
