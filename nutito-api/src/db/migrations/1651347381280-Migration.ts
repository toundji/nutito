import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1651347381280 implements MigrationInterface {
    name = 'Migration1651347381280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`amount\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`amount_in\` int NOT NULL, \`amount_out\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`licence\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`expiry_date\` datetime NOT NULL, \`amount\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`payment_type\` enum ('physique', 'kkiapay') NOT NULL DEFAULT 'kkiapay', \`transaction_id\` varchar(255) NOT NULL, \`transaction_info\` varchar(255) NOT NULL, \`company_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`work_field\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`adress\` varchar(255) NOT NULL, \`ifu\` varchar(255) NOT NULL, \`rccm\` varchar(255) NOT NULL, \`company_category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operation_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` enum ('entrée', 'sortie') NOT NULL DEFAULT 'entrée', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client_operation_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` enum ('entrée', 'sortie') NOT NULL DEFAULT 'entrée', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`name\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`amount\` int NOT NULL, \`amount_in\` int NOT NULL, \`amount_out\` int NOT NULL, \`balance\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`operation_type_id\` int NOT NULL, \`client_operation_type_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`name\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NOT NULL, \`entity\` varchar(255) NOT NULL, \`entity_id\` int NOT NULL, \`operation_id\` int NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`ifu\` varchar(255) NOT NULL, \`birth_date\` date NULL, \`birth_place\` varchar(255) NULL, \`address\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`user_type\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`verification_token\` varchar(255) NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`slug\` varchar(255) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), UNIQUE INDEX \`IDX_ab55c58f899e26df12585a6e42\` (\`ifu\`), UNIQUE INDEX \`IDX_ac08b39ccb744ea6682c0db1c2\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agent\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`updated_id\` int NULL, \`user_id\` int NULL, UNIQUE INDEX \`REL_031462988904ed291dd85171a8\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`career\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`agent_id\` int NOT NULL, \`company_id\` int NOT NULL, \`roleId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agent_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`creator_id\` int NOT NULL, \`updater_id\` int NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_workfield\` (\`companyId\` int NOT NULL, \`workFieldId\` int NOT NULL, INDEX \`IDX_5ce32764f39a40d13c76308b41\` (\`companyId\`), INDEX \`IDX_c3c2a921c831c7de763f36d576\` (\`workFieldId\`), PRIMARY KEY (\`companyId\`, \`workFieldId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`licence\` ADD CONSTRAINT \`FK_7aff118ec29d76f955cd5e565ff\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_9633c0cb30e59b3c11e773a20a8\` FOREIGN KEY (\`company_category_id\`) REFERENCES \`company_category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`operation\` ADD CONSTRAINT \`FK_a3ae8f466f04ad4e8de987db807\` FOREIGN KEY (\`operation_type_id\`) REFERENCES \`operation_type\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`operation\` ADD CONSTRAINT \`FK_4997881e8971fefcd8ebbb17227\` FOREIGN KEY (\`client_operation_type_id\`) REFERENCES \`client_operation_type\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`file\` ADD CONSTRAINT \`FK_3dd35116e8ddce4c9364cd6cf0d\` FOREIGN KEY (\`operation_id\`) REFERENCES \`operation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`file\` ADD CONSTRAINT \`FK_516f1cf15166fd07b732b4b6ab0\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agent\` ADD CONSTRAINT \`FK_031462988904ed291dd85171a86\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`career\` ADD CONSTRAINT \`FK_ab86620e9cb21386cc02990c8f3\` FOREIGN KEY (\`agent_id\`) REFERENCES \`agent\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`career\` ADD CONSTRAINT \`FK_022bee0536981ffe445fc078001\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`career\` ADD CONSTRAINT \`FK_b2fa60573454d8105801238a725\` FOREIGN KEY (\`roleId\`) REFERENCES \`agent_role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_workfield\` ADD CONSTRAINT \`FK_5ce32764f39a40d13c76308b410\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`company_workfield\` ADD CONSTRAINT \`FK_c3c2a921c831c7de763f36d5764\` FOREIGN KEY (\`workFieldId\`) REFERENCES \`work_field\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_workfield\` DROP FOREIGN KEY \`FK_c3c2a921c831c7de763f36d5764\``);
        await queryRunner.query(`ALTER TABLE \`company_workfield\` DROP FOREIGN KEY \`FK_5ce32764f39a40d13c76308b410\``);
        await queryRunner.query(`ALTER TABLE \`career\` DROP FOREIGN KEY \`FK_b2fa60573454d8105801238a725\``);
        await queryRunner.query(`ALTER TABLE \`career\` DROP FOREIGN KEY \`FK_022bee0536981ffe445fc078001\``);
        await queryRunner.query(`ALTER TABLE \`career\` DROP FOREIGN KEY \`FK_ab86620e9cb21386cc02990c8f3\``);
        await queryRunner.query(`ALTER TABLE \`agent\` DROP FOREIGN KEY \`FK_031462988904ed291dd85171a86\``);
        await queryRunner.query(`ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_516f1cf15166fd07b732b4b6ab0\``);
        await queryRunner.query(`ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_3dd35116e8ddce4c9364cd6cf0d\``);
        await queryRunner.query(`ALTER TABLE \`operation\` DROP FOREIGN KEY \`FK_4997881e8971fefcd8ebbb17227\``);
        await queryRunner.query(`ALTER TABLE \`operation\` DROP FOREIGN KEY \`FK_a3ae8f466f04ad4e8de987db807\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_9633c0cb30e59b3c11e773a20a8\``);
        await queryRunner.query(`ALTER TABLE \`licence\` DROP FOREIGN KEY \`FK_7aff118ec29d76f955cd5e565ff\``);
        await queryRunner.query(`DROP INDEX \`IDX_c3c2a921c831c7de763f36d576\` ON \`company_workfield\``);
        await queryRunner.query(`DROP INDEX \`IDX_5ce32764f39a40d13c76308b41\` ON \`company_workfield\``);
        await queryRunner.query(`DROP TABLE \`company_workfield\``);
        await queryRunner.query(`DROP TABLE \`agent_role\``);
        await queryRunner.query(`DROP TABLE \`career\``);
        await queryRunner.query(`DROP INDEX \`REL_031462988904ed291dd85171a8\` ON \`agent\``);
        await queryRunner.query(`DROP TABLE \`agent\``);
        await queryRunner.query(`DROP INDEX \`IDX_ac08b39ccb744ea6682c0db1c2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ab55c58f899e26df12585a6e42\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`file\``);
        await queryRunner.query(`DROP TABLE \`operation\``);
        await queryRunner.query(`DROP TABLE \`client_operation_type\``);
        await queryRunner.query(`DROP TABLE \`operation_type\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP TABLE \`work_field\``);
        await queryRunner.query(`DROP TABLE \`licence\``);
        await queryRunner.query(`DROP TABLE \`company_category\``);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
