import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1655938209150 implements MigrationInterface {
    name = 'Migration1655938209150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_category" ADD "short" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD "licence_id" integer`);
        await queryRunner.query(`ALTER TYPE "public"."client_operation_type_type_enum" RENAME TO "client_operation_type_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."client_operation_type_type_enum" AS ENUM('REVENUE', 'DEPENSE')`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" TYPE "public"."client_operation_type_type_enum" USING "type"::"text"::"public"."client_operation_type_type_enum"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" SET DEFAULT 'REVENUE'`);
        await queryRunner.query(`DROP TYPE "public"."client_operation_type_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."operation_type_type_enum" RENAME TO "operation_type_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."operation_type_type_enum" AS ENUM('REVENUE', 'DEPENSE')`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" TYPE "public"."operation_type_type_enum" USING "type"::"text"::"public"."operation_type_type_enum"`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" SET DEFAULT 'REVENUE'`);
        await queryRunner.query(`DROP TYPE "public"."operation_type_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "active" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_10432ce0277aa0b68fd085a362c"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "REL_10432ce0277aa0b68fd085a362"`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_bc492118cbd9e1ca2158c63e132" FOREIGN KEY ("licence_id") REFERENCES "licence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_10432ce0277aa0b68fd085a362c" FOREIGN KEY ("agent_role_id") REFERENCES "agent_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_10432ce0277aa0b68fd085a362c"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_bc492118cbd9e1ca2158c63e132"`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "REL_10432ce0277aa0b68fd085a362" UNIQUE ("agent_role_id")`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_10432ce0277aa0b68fd085a362c" FOREIGN KEY ("agent_role_id") REFERENCES "agent_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "active" SET DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "public"."operation_type_type_enum_old" AS ENUM('entrée', 'sortie')`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" TYPE "public"."operation_type_type_enum_old" USING "type"::"text"::"public"."operation_type_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" SET DEFAULT 'entrée'`);
        await queryRunner.query(`DROP TYPE "public"."operation_type_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."operation_type_type_enum_old" RENAME TO "operation_type_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."client_operation_type_type_enum_old" AS ENUM('entrée', 'sortie')`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" TYPE "public"."client_operation_type_type_enum_old" USING "type"::"text"::"public"."client_operation_type_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" SET DEFAULT 'entrée'`);
        await queryRunner.query(`DROP TYPE "public"."client_operation_type_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."client_operation_type_type_enum_old" RENAME TO "client_operation_type_type_enum"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "licence_id"`);
        await queryRunner.query(`ALTER TABLE "company_category" DROP COLUMN "short"`);
    }

}
