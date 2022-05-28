import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1653739922559 implements MigrationInterface {
    name = 'Migration1653739922559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "agent_number" integer`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "ifu" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "rccm" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "rccm" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "ifu" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "agent_number"`);
    }

}
