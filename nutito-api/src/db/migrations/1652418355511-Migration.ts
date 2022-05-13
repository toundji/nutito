import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1652418355511 implements MigrationInterface {
    name = 'Migration1652418355511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e"`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_d4ab593c192bae26a6cf6386332"`);
        await queryRunner.query(`ALTER TABLE "company_category" DROP CONSTRAINT "UQ_bbb4e6dcc98c00cd7fb9f28d945"`);
        await queryRunner.query(`ALTER TABLE "licence" DROP CONSTRAINT "UQ_05890209b13af2564e2ab3b5644"`);
        await queryRunner.query(`ALTER TABLE "workfield" DROP CONSTRAINT "UQ_73696e012fd5d756190cec3c547"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_47216baa0f0c8ebc6ee5a74989c"`);
        await queryRunner.query(`ALTER TABLE "operation_type" DROP CONSTRAINT "UQ_65fd64c07b649cef6dfefd9c3ff"`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" DROP CONSTRAINT "UQ_96b3c6f1731f4eb95dca91f97f8"`);
        await queryRunner.query(`ALTER TABLE "operation" DROP CONSTRAINT "UQ_c863962043178f74d4e04984312"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "UQ_83b609bac13972b5378e4247900"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_ac08b39ccb744ea6682c0db1c2d"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "UQ_6afd1141ee4df210692f0d025f5"`);
        await queryRunner.query(`ALTER TABLE "career" DROP CONSTRAINT "UQ_8c1fd7d632e10d5c633543272bd"`);
        await queryRunner.query(`ALTER TABLE "agent_role" DROP CONSTRAINT "UQ_45190e39b97ac612aa6b06efc58"`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e" FOREIGN KEY ("workfieldId") REFERENCES "workfield"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d"`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e"`);
        await queryRunner.query(`ALTER TABLE "agent_role" ADD CONSTRAINT "UQ_45190e39b97ac612aa6b06efc58" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "career" ADD CONSTRAINT "UQ_8c1fd7d632e10d5c633543272bd" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "UQ_6afd1141ee4df210692f0d025f5" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_ac08b39ccb744ea6682c0db1c2d" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "UQ_83b609bac13972b5378e4247900" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "operation" ADD CONSTRAINT "UQ_c863962043178f74d4e04984312" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "client_operation_type" ADD CONSTRAINT "UQ_96b3c6f1731f4eb95dca91f97f8" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "operation_type" ADD CONSTRAINT "UQ_65fd64c07b649cef6dfefd9c3ff" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_47216baa0f0c8ebc6ee5a74989c" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "workfield" ADD CONSTRAINT "UQ_73696e012fd5d756190cec3c547" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "licence" ADD CONSTRAINT "UQ_05890209b13af2564e2ab3b5644" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "company_category" ADD CONSTRAINT "UQ_bbb4e6dcc98c00cd7fb9f28d945" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_d4ab593c192bae26a6cf6386332" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e" FOREIGN KEY ("workfieldId") REFERENCES "workfield"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
