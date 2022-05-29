import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1653859358892 implements MigrationInterface {
    name = 'Migration1653859358892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "licence" ALTER COLUMN "amount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "licence" ALTER COLUMN "code" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "licence" ALTER COLUMN "code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "licence" ALTER COLUMN "amount" SET NOT NULL`);
    }

}
