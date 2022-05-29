import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1653862731267 implements MigrationInterface {
    name = 'Migration1653862731267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "licence" DROP COLUMN "licenceType"`);
        await queryRunner.query(`DROP TYPE "public"."licence_licencetype_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."licence_licencetype_enum" AS ENUM('mensuelle', 'annuelle')`);
        await queryRunner.query(`ALTER TABLE "licence" ADD "licenceType" "public"."licence_licencetype_enum" DEFAULT 'mensuelle'`);
    }

}
