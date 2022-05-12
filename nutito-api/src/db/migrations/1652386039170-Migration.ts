import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1652386039170 implements MigrationInterface {
    name = 'Migration1652386039170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "code" character varying NOT NULL, "amount" integer NOT NULL, "amount_in" integer, "amount_out" integer, CONSTRAINT "UQ_d4ab593c192bae26a6cf6386332" UNIQUE ("slug"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_bbb4e6dcc98c00cd7fb9f28d945" UNIQUE ("slug"), CONSTRAINT "PK_e30c10055c199565d44daa681fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."licence_payment_type_enum" AS ENUM('physique', 'kkiapay')`);
        await queryRunner.query(`CREATE TABLE "licence" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "expiry_date" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "code" character varying NOT NULL, "payment_type" "public"."licence_payment_type_enum" NOT NULL DEFAULT 'kkiapay', "transaction_id" character varying NOT NULL, "transaction_info" character varying NOT NULL, "company_id" integer NOT NULL, CONSTRAINT "UQ_05890209b13af2564e2ab3b5644" UNIQUE ("slug"), CONSTRAINT "PK_3b4f2cda4a38b8026e4c700844c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_field" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_670d7d064a676f35c6c7faeb159" UNIQUE ("slug"), CONSTRAINT "PK_d6c59c8c8b6aff56fa43d125b6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "city" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "adress" character varying NOT NULL, "ifu" character varying NOT NULL, "rccm" character varying NOT NULL, "company_category_id" integer, CONSTRAINT "UQ_47216baa0f0c8ebc6ee5a74989c" UNIQUE ("slug"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."operation_type_type_enum" AS ENUM('entrée', 'sortie')`);
        await queryRunner.query(`CREATE TABLE "operation_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."operation_type_type_enum" NOT NULL DEFAULT 'entrée', CONSTRAINT "UQ_65fd64c07b649cef6dfefd9c3ff" UNIQUE ("slug"), CONSTRAINT "PK_890377bdb96de1fbc0de288eb22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."client_operation_type_type_enum" AS ENUM('entrée', 'sortie')`);
        await queryRunner.query(`CREATE TABLE "client_operation_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "public"."client_operation_type_type_enum" NOT NULL DEFAULT 'entrée', CONSTRAINT "UQ_96b3c6f1731f4eb95dca91f97f8" UNIQUE ("slug"), CONSTRAINT "PK_129c30d7cbe9da86e5a052f5702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "operation" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "amount_in" integer NOT NULL, "amount_out" integer NOT NULL, "balance" integer NOT NULL, "description" character varying NOT NULL, "operation_type_id" integer, "client_operation_type_id" integer, CONSTRAINT "UQ_c863962043178f74d4e04984312" UNIQUE ("slug"), CONSTRAINT "PK_18556ee6e49c005fc108078f3ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "mimetype" character varying NOT NULL, "entity_id" integer NOT NULL, "operation_id" integer, "user_id" integer, CONSTRAINT "UQ_83b609bac13972b5378e4247900" UNIQUE ("slug"), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_user_type_enum" AS ENUM('admin', 'system engineer', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "ifu" character varying NOT NULL, "birth_date" TIMESTAMP, "birth_place" character varying, "address" character varying, "country" character varying NOT NULL, "password" character varying NOT NULL, "user_type" "public"."user_user_type_enum" NOT NULL DEFAULT 'user', "verification_token" character varying, "active" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_ac08b39ccb744ea6682c0db1c2d" UNIQUE ("slug"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_ab55c58f899e26df12585a6e42e" UNIQUE ("ifu"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "user_id" integer, CONSTRAINT "UQ_6afd1141ee4df210692f0d025f5" UNIQUE ("slug"), CONSTRAINT "REL_031462988904ed291dd85171a8" UNIQUE ("user_id"), CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "career" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "agent_id" integer NOT NULL, "company_id" integer NOT NULL, "agent_role_id" integer NOT NULL, CONSTRAINT "UQ_8c1fd7d632e10d5c633543272bd" UNIQUE ("slug"), CONSTRAINT "PK_5f694c0aa9babcae2c4ad61c7d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent_role" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, "updater_id" integer, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_45190e39b97ac612aa6b06efc58" UNIQUE ("slug"), CONSTRAINT "PK_306c47e4a4c59701a7308ba7c73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies_workfields" ("workFieldId" integer NOT NULL, "companyId" integer NOT NULL, CONSTRAINT "PK_1b3e3d207225b0719ccd1dc1345" PRIMARY KEY ("workFieldId", "companyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_53eea3896c04e022538ceaac65" ON "companies_workfields" ("workFieldId") `);
        await queryRunner.query(`CREATE INDEX "IDX_906ec9978aa4cbc16d635405f1" ON "companies_workfields" ("companyId") `);
        await queryRunner.query(`ALTER TABLE "licence" ADD CONSTRAINT "FK_7aff118ec29d76f955cd5e565ff" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_9633c0cb30e59b3c11e773a20a8" FOREIGN KEY ("company_category_id") REFERENCES "company_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_a3ae8f466f04ad4e8de987db807" FOREIGN KEY ("operation_type_id") REFERENCES "operation_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "FK_4997881e8971fefcd8ebbb17227" FOREIGN KEY ("client_operation_type_id") REFERENCES "client_operation_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_3dd35116e8ddce4c9364cd6cf0d" FOREIGN KEY ("operation_id") REFERENCES "operation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_516f1cf15166fd07b732b4b6ab0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_031462988904ed291dd85171a86" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "career" ADD CONSTRAINT "FK_ab86620e9cb21386cc02990c8f3" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "career" ADD CONSTRAINT "FK_022bee0536981ffe445fc078001" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "career" ADD CONSTRAINT "FK_19761204d459feff14e92b2aacc" FOREIGN KEY ("agent_role_id") REFERENCES "agent_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_53eea3896c04e022538ceaac65d" FOREIGN KEY ("workFieldId") REFERENCES "work_field"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d"`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_53eea3896c04e022538ceaac65d"`);
        await queryRunner.query(`ALTER TABLE "career" DROP CONSTRAINT "FK_19761204d459feff14e92b2aacc"`);
        await queryRunner.query(`ALTER TABLE "career" DROP CONSTRAINT "FK_022bee0536981ffe445fc078001"`);
        await queryRunner.query(`ALTER TABLE "career" DROP CONSTRAINT "FK_ab86620e9cb21386cc02990c8f3"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_031462988904ed291dd85171a86"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_516f1cf15166fd07b732b4b6ab0"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_3dd35116e8ddce4c9364cd6cf0d"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_4997881e8971fefcd8ebbb17227"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "FK_a3ae8f466f04ad4e8de987db807"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_9633c0cb30e59b3c11e773a20a8"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP CONSTRAINT "FK_7aff118ec29d76f955cd5e565ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_906ec9978aa4cbc16d635405f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_53eea3896c04e022538ceaac65"`);
        await queryRunner.query(`DROP TABLE "companies_workfields"`);
        await queryRunner.query(`DROP TABLE "agent_role"`);
        await queryRunner.query(`DROP TABLE "career"`);
        await queryRunner.query(`DROP TABLE "agent"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_user_type_enum"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "operation"`);
        await queryRunner.query(`DROP TABLE "client_operation_type"`);
        await queryRunner.query(`DROP TYPE "public"."client_operation_type_type_enum"`);
        await queryRunner.query(`DROP TABLE "operation_type"`);
        await queryRunner.query(`DROP TYPE "public"."operation_type_type_enum"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "work_field"`);
        await queryRunner.query(`DROP TABLE "licence"`);
        await queryRunner.query(`DROP TYPE "public"."licence_payment_type_enum"`);
        await queryRunner.query(`DROP TABLE "company_category"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
