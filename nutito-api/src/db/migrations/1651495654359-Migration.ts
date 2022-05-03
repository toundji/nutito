import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1651495654359 implements MigrationInterface {
    name = 'Migration1651495654359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` DROP FOREIGN KEY \`FK_53eea3896c04e022538ceaac65d\``);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` DROP FOREIGN KEY \`FK_906ec9978aa4cbc16d635405f1d\``);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` ADD CONSTRAINT \`FK_53eea3896c04e022538ceaac65d\` FOREIGN KEY (\`workFieldId\`) REFERENCES \`work_field\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` ADD CONSTRAINT \`FK_906ec9978aa4cbc16d635405f1d\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` DROP FOREIGN KEY \`FK_906ec9978aa4cbc16d635405f1d\``);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` DROP FOREIGN KEY \`FK_53eea3896c04e022538ceaac65d\``);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` ADD CONSTRAINT \`FK_906ec9978aa4cbc16d635405f1d\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` ADD CONSTRAINT \`FK_53eea3896c04e022538ceaac65d\` FOREIGN KEY (\`workFieldId\`) REFERENCES \`work_field\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
