import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1652822208006 implements MigrationInterface {
    name = 'Migration1652822208006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d"`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e" FOREIGN KEY ("workfieldId") REFERENCES "workfield"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d"`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" DROP CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_e048a2b6fdc6b89c3ea8565a38e" FOREIGN KEY ("workfieldId") REFERENCES "workfield"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_workfields" ADD CONSTRAINT "FK_906ec9978aa4cbc16d635405f1d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
