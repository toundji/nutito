import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1657573359458 implements MigrationInterface {
    name = 'Migration1657573359458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e4238c3828bc51ff8ca27c46385"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" DROP CONSTRAINT "FK_0797025c4bdcac637255ffd5de1"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_15a535205d6084391c14fa64715"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" RENAME COLUMN "operationTypeId" TO "company_id"`);
        await queryRunner.query(`CREATE TABLE "fichier" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "mimetype" character varying NOT NULL, "entity_name" character varying NOT NULL, "entity_id" integer NOT NULL, CONSTRAINT "PK_35788b04279085d084bae7bfe52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operations_workfields" ("peration_type_id" integer NOT NULL, "workfield_id" integer NOT NULL, CONSTRAINT "PK_0902acf022cfd48d724c81fd5fe" PRIMARY KEY ("peration_type_id", "workfield_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b351baa0867a312aa5469f0d21" ON "operations_workfields" ("peration_type_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5efe7e869621193ef9f8620934" ON "operations_workfields" ("workfield_id") `);
        await queryRunner.query(`CREATE TABLE "companies_operations" ("companyId" integer NOT NULL, "operationTypeId" integer NOT NULL, CONSTRAINT "PK_5a195e838c87ec79305feeebcc2" PRIMARY KEY ("companyId", "operationTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3341021c2f8d9281f022ca9e51" ON "companies_operations" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c9631560307fbb86d2243a2962" ON "companies_operations" ("operationTypeId") `);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "company_category" ADD "short" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD "duration" character varying DEFAULT '1M'`);
        await queryRunner.query(`ALTER TABLE "company" ADD "licence_id" integer`);
        await queryRunner.query(`ALTER TABLE "company" ADD "logo_id" integer`);
        await queryRunner.query(`CREATE TYPE "public"."operation_type_enum" AS ENUM('REVENU', 'DEPENSE')`);
        await queryRunner.query(`ALTER TABLE "operation" ADD "type" "public"."operation_type_enum" DEFAULT 'REVENU'`);
        await queryRunner.query(`ALTER TABLE "operation" ADD "company_id" integer`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "amount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TYPE "public"."operation_type_type_enum" RENAME TO "operation_type_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."operation_type_type_enum" AS ENUM('REVENU', 'DEPENSE')`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" TYPE "public"."operation_type_type_enum" USING "type"::"text"::"public"."operation_type_type_enum"`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" SET DEFAULT 'REVENU'`);
        await queryRunner.query(`DROP TYPE "public"."operation_type_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "active" SET DEFAULT true`);
        await queryRunner.query(`ALTER TYPE "public"."client_operation_type_type_enum" RENAME TO "client_operation_type_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."client_operation_type_type_enum" AS ENUM('REVENU', 'DEPENSE')`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" TYPE "public"."client_operation_type_type_enum" USING "type"::"text"::"public"."client_operation_type_type_enum"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" SET DEFAULT 'REVENU'`);
        await queryRunner.query(`DROP TYPE "public"."client_operation_type_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "agent_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "agent_number" SET DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_10432ce0277aa0b68fd085a362c"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "REL_10432ce0277aa0b68fd085a362"`);
        await queryRunner.query(`ALTER TABLE "operation" ALTER COLUMN "date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "operation" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e4238c3828bc51ff8ca27c46385" FOREIGN KEY ("profile_picture_id") REFERENCES "fichier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ADD CONSTRAINT "FK_e774d0e297d4890e6dfae070fa6" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_bc492118cbd9e1ca2158c63e132" FOREIGN KEY ("licence_id") REFERENCES "licence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_23de0dcd3f7763e16c418cd8a9c" FOREIGN KEY ("logo_id") REFERENCES "fichier"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_10432ce0277aa0b68fd085a362c" FOREIGN KEY ("agent_role_id") REFERENCES "agent_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_15a535205d6084391c14fa64715" FOREIGN KEY ("document_id") REFERENCES "fichier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_8b861c5058be3122bf05bc7e882" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operations_workfields" ADD CONSTRAINT "FK_b351baa0867a312aa5469f0d212" FOREIGN KEY ("peration_type_id") REFERENCES "operation_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "operations_workfields" ADD CONSTRAINT "FK_5efe7e869621193ef9f8620934d" FOREIGN KEY ("workfield_id") REFERENCES "workfield"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies_operations" ADD CONSTRAINT "FK_3341021c2f8d9281f022ca9e51c" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_operations" ADD CONSTRAINT "FK_c9631560307fbb86d2243a2962e" FOREIGN KEY ("operationTypeId") REFERENCES "operation_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_operations" DROP CONSTRAINT "FK_c9631560307fbb86d2243a2962e"`);
        await queryRunner.query(`ALTER TABLE "companies_operations" DROP CONSTRAINT "FK_3341021c2f8d9281f022ca9e51c"`);
        await queryRunner.query(`ALTER TABLE "operations_workfields" DROP CONSTRAINT "FK_5efe7e869621193ef9f8620934d"`);
        await queryRunner.query(`ALTER TABLE "operations_workfields" DROP CONSTRAINT "FK_b351baa0867a312aa5469f0d212"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_8b861c5058be3122bf05bc7e882"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_15a535205d6084391c14fa64715"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_10432ce0277aa0b68fd085a362c"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_23de0dcd3f7763e16c418cd8a9c"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_bc492118cbd9e1ca2158c63e132"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" DROP CONSTRAINT "FK_e774d0e297d4890e6dfae070fa6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e4238c3828bc51ff8ca27c46385"`);
        await queryRunner.query(`ALTER TABLE "operation" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "operation" ALTER COLUMN "date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "REL_10432ce0277aa0b68fd085a362" UNIQUE ("agent_role_id")`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_10432ce0277aa0b68fd085a362c" FOREIGN KEY ("agent_role_id") REFERENCES "agent_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "agent_number" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "agent_number" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."client_operation_type_type_enum_old" AS ENUM('entrée', 'sortie')`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" TYPE "public"."client_operation_type_type_enum_old" USING "type"::"text"::"public"."client_operation_type_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ALTER COLUMN "type" SET DEFAULT 'entrée'`);
        await queryRunner.query(`DROP TYPE "public"."client_operation_type_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."client_operation_type_type_enum_old" RENAME TO "client_operation_type_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "active" SET DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "public"."operation_type_type_enum_old" AS ENUM('entrée', 'sortie')`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" TYPE "public"."operation_type_type_enum_old" USING "type"::"text"::"public"."operation_type_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "operation_type" ALTER COLUMN "type" SET DEFAULT 'entrée'`);
        await queryRunner.query(`DROP TYPE "public"."operation_type_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."operation_type_type_enum_old" RENAME TO "operation_type_type_enum"`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "amount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "operation" DROP COLUMN "company_id"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."operation_type_enum"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "logo_id"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "licence_id"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "company_category" DROP COLUMN "short"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9631560307fbb86d2243a2962"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3341021c2f8d9281f022ca9e51"`);
        await queryRunner.query(`DROP TABLE "companies_operations"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5efe7e869621193ef9f8620934"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b351baa0867a312aa5469f0d21"`);
        await queryRunner.query(`DROP TABLE "operations_workfields"`);
        await queryRunner.query(`DROP TABLE "fichier"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" RENAME COLUMN "company_id" TO "operationTypeId"`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_15a535205d6084391c14fa64715" FOREIGN KEY ("document_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ADD CONSTRAINT "FK_0797025c4bdcac637255ffd5de1" FOREIGN KEY ("operationTypeId") REFERENCES "operation_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e4238c3828bc51ff8ca27c46385" FOREIGN KEY ("profile_picture_id") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
