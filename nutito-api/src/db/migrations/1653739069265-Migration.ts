import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1653739069265 implements MigrationInterface {
    name = 'Migration1653739069265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "file" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "operation" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "operation_type" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "company_category" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "workfield" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "company" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "agent" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "agent_role" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent_role" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "workfield" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "company_category" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "operation_type" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "deleted_at"`);
    }

}
