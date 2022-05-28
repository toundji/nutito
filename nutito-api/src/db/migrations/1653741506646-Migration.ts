import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1653741506646 implements MigrationInterface {
    name = 'Migration1653741506646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "constants" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying, "value" character varying, CONSTRAINT "PK_b05c708f105d3b8b351fdb07967" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "transaction_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "transaction_id" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "constants"`);
    }

}
