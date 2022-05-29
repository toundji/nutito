import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1653856572487 implements MigrationInterface {
    name = 'Migration1653856572487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "constant" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying, "value" character varying, CONSTRAINT "PK_1b0a38eec3825ac3c83d8114e96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "expiry_date"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "payment_type"`);
        await queryRunner.query(`DROP TYPE "public"."licence_payment_type_enum"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "transaction_info"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "expiryDate" TIMESTAMP`);
        await queryRunner.query(`CREATE TYPE "public"."licence_licencetype_enum" AS ENUM('mensuelle', 'annuelle')`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "licenceType" "public"."licence_licencetype_enum" DEFAULT 'mensuelle'`);
        await queryRunner.query(`CREATE TYPE "public"."licence_paymenttype_enum" AS ENUM('physique', 'kkiapay')`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "paymentType" "public"."licence_paymenttype_enum" NOT NULL DEFAULT 'kkiapay'`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "transactionId" character varying`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "transactionInfo" character varying`);
        await queryRunner.query(`ALTER TABLE "company" ADD "owner_id" integer`);
        await queryRunner.query(`ALTER TABLE "agent" ADD "abilities" text`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_0c6ea8a32565efcb512e572d61d" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_0c6ea8a32565efcb512e572d61d"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP COLUMN "abilities"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "owner_id"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "transactionInfo"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "paymentType"`);
        await queryRunner.query(`DROP TYPE "public"."licence_paymenttype_enum"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "licenceType"`);
        await queryRunner.query(`DROP TYPE "public"."licence_licencetype_enum"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "expiryDate"`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "transaction_id" character varying`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "transaction_info" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."licence_payment_type_enum" AS ENUM('physique', 'kkiapay')`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "payment_type" "public"."licence_payment_type_enum" NOT NULL DEFAULT 'kkiapay'`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "expiry_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP TABLE "constant"`);
    }

}
