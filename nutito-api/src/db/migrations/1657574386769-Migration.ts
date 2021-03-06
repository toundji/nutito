import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1657574386769 implements MigrationInterface {
    name = 'Migration1657574386769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "amount" double precision DEFAULT '0', "amount_in" double precision DEFAULT '0', "amount_out" double precision DEFAULT '0', CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent_role" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_306c47e4a4c59701a7308ba7c73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workfield" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying, "description" character varying, CONSTRAINT "PK_be0322d2a9c0cd1cb70690f4097" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operation_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."operation_type_type_enum" NOT NULL DEFAULT 'REVENU', CONSTRAINT "PK_890377bdb96de1fbc0de288eb22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "short" character varying, "name" character varying, "description" character varying, CONSTRAINT "PK_e30c10055c199565d44daa681fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "licence" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "expiryDate" TIMESTAMP, "amount" double precision, "code" character varying, "monthsNumber" integer, "paymentType" "public"."licence_paymenttype_enum" NOT NULL DEFAULT 'kkiapay', "transactionId" character varying, "transactionInfo" character varying, "company_id" integer, CONSTRAINT "PK_3b4f2cda4a38b8026e4c700844c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fichier" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "mimetype" character varying NOT NULL, "entity_name" character varying NOT NULL, "entity_id" integer NOT NULL, CONSTRAINT "PK_35788b04279085d084bae7bfe52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "firstname" character varying, "lastname" character varying, "email" character varying, "phone" character varying, "ifu" character varying, "birth_date" TIMESTAMP, "birth_place" character varying, "address" character varying, "country" character varying, "city" character varying, "password" character varying NOT NULL, "user_type" "public"."user_user_type_enum" NOT NULL DEFAULT 'user', "verification_token" character varying, "active" boolean NOT NULL DEFAULT true, "profile_picture_id" integer, CONSTRAINT "REL_e4238c3828bc51ff8ca27c4638" UNIQUE ("profile_picture_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_operation_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."client_operation_type_type_enum" NOT NULL DEFAULT 'REVENU', "company_id" integer, CONSTRAINT "PK_129c30d7cbe9da86e5a052f5702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying, "description" character varying, "city" character varying, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying, "country" character varying, "ifu" character varying, "rccm" character varying, "agent_number" integer DEFAULT '3', "duration" character varying DEFAULT '1M', "owner_id" integer, "company_category_id" integer, "licence_id" integer, "account_id" integer, "logo_id" integer, CONSTRAINT "REL_6a56c16291e3654a159998f621" UNIQUE ("account_id"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "abilities" text, "agent_id" integer, "company_id" integer, "agent_role_id" integer, CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "constant" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying, "value" character varying, CONSTRAINT "PK_1b0a38eec3825ac3c83d8114e96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operation" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "date" date, "amount" double precision NOT NULL, "amount_in" double precision NOT NULL, "amount_out" double precision NOT NULL, "balance" double precision NOT NULL, "description" character varying, "type" "public"."operation_type_enum" DEFAULT 'REVENU', "document_id" integer, "company_id" integer, "operation_type_id" integer, "client_operation_type_id" integer, CONSTRAINT "REL_15a535205d6084391c14fa6471" UNIQUE ("document_id"), CONSTRAINT "PK_18556ee6e49c005fc108078f3ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operations_workfields" ("peration_type_id" integer NOT NULL, "workfield_id" integer NOT NULL, CONSTRAINT "PK_0902acf022cfd48d724c81fd5fe" PRIMARY KEY ("peration_type_id", "workfield_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b351baa0867a312aa5469f0d21" ON "operations_workfields" ("peration_type_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5efe7e869621193ef9f8620934" ON "operations_workfields" ("workfield_id") `);
        await queryRunner.query(`CREATE TABLE "companies_workfields" ("companyId" integer NOT NULL, "workfieldId" integer NOT NULL, CONSTRAINT "PK_a8b833223ef99e9285cd0418311" PRIMARY KEY ("companyId", "workfieldId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_906ec9978aa4cbc16d635405f1" ON "companies_workfields" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e048a2b6fdc6b89c3ea8565a38" ON "companies_workfields" ("workfieldId") `);
        await queryRunner.query(`CREATE TABLE "companies_operations" ("companyId" integer NOT NULL, "operationTypeId" integer NOT NULL, CONSTRAINT "PK_5a195e838c87ec79305feeebcc2" PRIMARY KEY ("companyId", "operationTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3341021c2f8d9281f022ca9e51" ON "companies_operations" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c9631560307fbb86d2243a2962" ON "companies_operations" ("operationTypeId") `);
        await queryRunner.query(`ALTER TABLE "licence" ADD CONSTRAINT "FK_7aff118ec29d76f955cd5e565ff" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e4238c3828bc51ff8ca27c46385" FOREIGN KEY ("profile_picture_id") REFERENCES "fichier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ADD CONSTRAINT "FK_e774d0e297d4890e6dfae070fa6" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_0c6ea8a32565efcb512e572d61d" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_9633c0cb30e59b3c11e773a20a8" FOREIGN KEY ("company_category_id") REFERENCES "company_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_bc492118cbd9e1ca2158c63e132" FOREIGN KEY ("licence_id") REFERENCES "licence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_6a56c16291e3654a159998f621b" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_23de0dcd3f7763e16c418cd8a9c" FOREIGN KEY ("logo_id") REFERENCES "fichier"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_ccb938d9faac409291066b2f0d3" FOREIGN KEY ("agent_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_81fca3f58e8f54e10c46adb07d9" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_10432ce0277aa0b68fd085a362c" FOREIGN KEY ("agent_role_id") REFERENCES "agent_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_15a535205d6084391c14fa64715" FOREIGN KEY ("document_id") REFERENCES "fichier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_8b861c5058be3122bf05bc7e882" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_a3ae8f466f04ad4e8de987db807" FOREIGN KEY ("operation_type_id") REFERENCES "operation_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_4997881e8971fefcd8ebbb17227" FOREIGN KEY ("client_operation_type_id") REFERENCES "client_operation_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operations_workfields" ADD CONSTRAINT "FK_b351baa0867a312aa5469f0d212" FOREIGN KEY ("peration_type_id") REFERENCES "operation_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "operations_workfields" ADD CONSTRAINT "FK_5efe7e869621193ef9f8620934d" FOREIGN KEY ("workfield_id") REFERENCES "workfield"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e" FOREIGN KEY ("workfieldId") REFERENCES "workfield"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_operations" ADD CONSTRAINT "FK_3341021c2f8d9281f022ca9e51c" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_operations" ADD CONSTRAINT "FK_c9631560307fbb86d2243a2962e" FOREIGN KEY ("operationTypeId") REFERENCES "operation_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_operations" DROP CONSTRAINT "FK_c9631560307fbb86d2243a2962e"`);
        await queryRunner.query(`ALTER TABLE "companies_operations" DROP CONSTRAINT "FK_3341021c2f8d9281f022ca9e51c"`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e"`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d"`);
        await queryRunner.query(`ALTER TABLE "operations_workfields" DROP CONSTRAINT "FK_5efe7e869621193ef9f8620934d"`);
        await queryRunner.query(`ALTER TABLE "operations_workfields" DROP CONSTRAINT "FK_b351baa0867a312aa5469f0d212"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_4997881e8971fefcd8ebbb17227"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_a3ae8f466f04ad4e8de987db807"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_8b861c5058be3122bf05bc7e882"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_15a535205d6084391c14fa64715"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_10432ce0277aa0b68fd085a362c"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_81fca3f58e8f54e10c46adb07d9"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_ccb938d9faac409291066b2f0d3"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_23de0dcd3f7763e16c418cd8a9c"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_6a56c16291e3654a159998f621b"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_bc492118cbd9e1ca2158c63e132"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_9633c0cb30e59b3c11e773a20a8"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_0c6ea8a32565efcb512e572d61d"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" DROP CONSTRAINT "FK_e774d0e297d4890e6dfae070fa6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e4238c3828bc51ff8ca27c46385"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP CONSTRAINT "FK_7aff118ec29d76f955cd5e565ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9631560307fbb86d2243a2962"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3341021c2f8d9281f022ca9e51"`);
        await queryRunner.query(`DROP TABLE "companies_operations"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e048a2b6fdc6b89c3ea8565a38"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_906ec9978aa4cbc16d635405f1"`);
        await queryRunner.query(`DROP TABLE "companies_workfields"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5efe7e869621193ef9f8620934"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b351baa0867a312aa5469f0d21"`);
        await queryRunner.query(`DROP TABLE "operations_workfields"`);
        await queryRunner.query(`DROP TABLE "operation"`);
        await queryRunner.query(`DROP TABLE "constant"`);
        await queryRunner.query(`DROP TABLE "agent"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "client_operation_type"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "fichier"`);
        await queryRunner.query(`DROP TABLE "licence"`);
        await queryRunner.query(`DROP TABLE "company_category"`);
        await queryRunner.query(`DROP TABLE "operation_type"`);
        await queryRunner.query(`DROP TABLE "workfield"`);
        await queryRunner.query(`DROP TABLE "agent_role"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
