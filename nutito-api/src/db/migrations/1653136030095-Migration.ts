import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1653136030095 implements MigrationInterface {
    name = 'Migration1653136030095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "code" character varying NOT NULL, "amount" double precision NOT NULL, "amount_in" double precision NOT NULL DEFAULT '0', "amount_out" double precision NOT NULL DEFAULT '0', CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_e30c10055c199565d44daa681fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "licence" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "expiry_date" TIMESTAMP NOT NULL, "amount" double precision NOT NULL, "code" character varying NOT NULL, "payment_type" "public"."licence_payment_type_enum" NOT NULL DEFAULT 'kkiapay', "transaction_id" integer NOT NULL, "transaction_info" character varying NOT NULL, "company_id" integer, CONSTRAINT "PK_3b4f2cda4a38b8026e4c700844c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workfield" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_be0322d2a9c0cd1cb70690f4097" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "city" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "ifu" character varying NOT NULL, "rccm" character varying NOT NULL, "company_category_id" integer, "account_id" integer, CONSTRAINT "REL_6a56c16291e3654a159998f621" UNIQUE ("account_id"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "mimetype" character varying NOT NULL, "entity_name" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "firstname" character varying, "lastname" character varying, "email" character varying, "phone" character varying, "ifu" character varying, "birth_date" TIMESTAMP, "birth_place" character varying, "address" character varying, "country" character varying, "city" character varying, "password" character varying NOT NULL, "user_type" "public"."user_user_type_enum" NOT NULL DEFAULT 'user', "verification_token" character varying, "active" boolean NOT NULL DEFAULT false, "profile_picture_id" integer, CONSTRAINT "REL_e4238c3828bc51ff8ca27c4638" UNIQUE ("profile_picture_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "agent_id" integer, "company_id" integer, "agent_role_id" integer, CONSTRAINT "REL_10432ce0277aa0b68fd085a362" UNIQUE ("agent_role_id"), CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent_role" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_306c47e4a4c59701a7308ba7c73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operation_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."operation_type_type_enum" NOT NULL DEFAULT 'entrée', CONSTRAINT "PK_890377bdb96de1fbc0de288eb22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operation" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "date" date NOT NULL, "amount" double precision NOT NULL, "amount_in" double precision NOT NULL, "amount_out" double precision NOT NULL, "balance" double precision NOT NULL, "description" character varying NOT NULL, "document_id" integer, "operation_type_id" integer, "client_operation_type_id" integer, CONSTRAINT "REL_15a535205d6084391c14fa6471" UNIQUE ("document_id"), CONSTRAINT "PK_18556ee6e49c005fc108078f3ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_operation_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."client_operation_type_type_enum" NOT NULL DEFAULT 'entrée', "operationTypeId" integer, CONSTRAINT "PK_129c30d7cbe9da86e5a052f5702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies_workfields" ("workfieldId" integer NOT NULL, "companyId" integer NOT NULL, CONSTRAINT "PK_a8b833223ef99e9285cd0418311" PRIMARY KEY ("workfieldId", "companyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e048a2b6fdc6b89c3ea8565a38" ON "companies_workfields" ("workfieldId") `);
        await queryRunner.query(`CREATE INDEX "IDX_906ec9978aa4cbc16d635405f1" ON "companies_workfields" ("companyId") `);
        await queryRunner.query(`ALTER TABLE "licence" ADD CONSTRAINT "FK_7aff118ec29d76f955cd5e565ff" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_9633c0cb30e59b3c11e773a20a8" FOREIGN KEY ("company_category_id") REFERENCES "company_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_6a56c16291e3654a159998f621b" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e4238c3828bc51ff8ca27c46385" FOREIGN KEY ("profile_picture_id") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_ccb938d9faac409291066b2f0d3" FOREIGN KEY ("agent_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_81fca3f58e8f54e10c46adb07d9" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_10432ce0277aa0b68fd085a362c" FOREIGN KEY ("agent_role_id") REFERENCES "agent_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_15a535205d6084391c14fa64715" FOREIGN KEY ("document_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_a3ae8f466f04ad4e8de987db807" FOREIGN KEY ("operation_type_id") REFERENCES "operation_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_4997881e8971fefcd8ebbb17227" FOREIGN KEY ("client_operation_type_id") REFERENCES "client_operation_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ADD CONSTRAINT "FK_0797025c4bdcac637255ffd5de1" FOREIGN KEY ("operationTypeId") REFERENCES "operation_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e" FOREIGN KEY ("workfieldId") REFERENCES "workfield"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d"`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" DROP CONSTRAINT "FK_0797025c4bdcac637255ffd5de1"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_4997881e8971fefcd8ebbb17227"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_a3ae8f466f04ad4e8de987db807"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_15a535205d6084391c14fa64715"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_10432ce0277aa0b68fd085a362c"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_81fca3f58e8f54e10c46adb07d9"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_ccb938d9faac409291066b2f0d3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e4238c3828bc51ff8ca27c46385"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_6a56c16291e3654a159998f621b"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_9633c0cb30e59b3c11e773a20a8"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP CONSTRAINT "FK_7aff118ec29d76f955cd5e565ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_906ec9978aa4cbc16d635405f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e048a2b6fdc6b89c3ea8565a38"`);
        await queryRunner.query(`DROP TABLE "companies_workfields"`);
        await queryRunner.query(`DROP TABLE "client_operation_type"`);
        await queryRunner.query(`DROP TABLE "operation"`);
        await queryRunner.query(`DROP TABLE "operation_type"`);
        await queryRunner.query(`DROP TABLE "agent_role"`);
        await queryRunner.query(`DROP TABLE "agent"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "workfield"`);
        await queryRunner.query(`DROP TABLE "licence"`);
        await queryRunner.query(`DROP TABLE "company_category"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
