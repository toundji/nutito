import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1652594627129 implements MigrationInterface {
    name = 'Migration1652594627129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`amount\` float NOT NULL, \`amount_in\` float NOT NULL DEFAULT '0', \`amount_out\` float NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`licence\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`expiry_date\` datetime NOT NULL, \`amount\` float NOT NULL, \`code\` varchar(255) NOT NULL, \`payment_type\` enum ('physique', 'kkiapay') NOT NULL DEFAULT 'kkiapay', \`transaction_id\` int NOT NULL, \`transaction_info\` varchar(255) NOT NULL, \`company_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workfield\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`ifu\` varchar(255) NOT NULL, \`rccm\` varchar(255) NOT NULL, \`company_category_id\` int NULL, \`account_id\` int NULL, UNIQUE INDEX \`REL_6a56c16291e3654a159998f621\` (\`account_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operation_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` enum ('entrée', 'sortie') NOT NULL DEFAULT 'entrée', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client_operation_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` enum ('entrée', 'sortie') NOT NULL DEFAULT 'entrée', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`amount\` float NOT NULL, \`amount_in\` float NOT NULL, \`amount_out\` float NOT NULL, \`balance\` float NOT NULL, \`description\` varchar(255) NOT NULL, \`operation_type_id\` int NULL, \`client_operation_type_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NOT NULL, \`entity_id\` int NOT NULL, \`operation_id\` int NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`ifu\` varchar(255) NOT NULL, \`birth_date\` datetime NULL, \`birth_place\` varchar(255) NULL, \`address\` varchar(255) NULL, \`country\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`user_type\` enum ('admin', 'system engineer', 'user') NOT NULL DEFAULT 'user', \`verification_token\` varchar(255) NULL, \`active\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agent\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`REL_031462988904ed291dd85171a8\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`career\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`agent_id\` int NULL, \`company_id\` int NULL, \`agent_role_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agent_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies_workfields\` (\`workfieldId\` int NOT NULL, \`companyId\` int NOT NULL, INDEX \`IDX_e048a2b6fdc6b89c3ea8565a38\` (\`workfieldId\`), INDEX \`IDX_906ec9978aa4cbc16d635405f1\` (\`companyId\`), PRIMARY KEY (\`workfieldId\`, \`companyId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`licence\` ADD CONSTRAINT \`FK_7aff118ec29d76f955cd5e565ff\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_9633c0cb30e59b3c11e773a20a8\` FOREIGN KEY (\`company_category_id\`) REFERENCES \`company_category\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_6a56c16291e3654a159998f621b\` FOREIGN KEY (\`account_id\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`operation\` ADD CONSTRAINT \`FK_a3ae8f466f04ad4e8de987db807\` FOREIGN KEY (\`operation_type_id\`) REFERENCES \`operation_type\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`operation\` ADD CONSTRAINT \`FK_4997881e8971fefcd8ebbb17227\` FOREIGN KEY (\`client_operation_type_id\`) REFERENCES \`client_operation_type\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`file\` ADD CONSTRAINT \`FK_3dd35116e8ddce4c9364cd6cf0d\` FOREIGN KEY (\`operation_id\`) REFERENCES \`operation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`file\` ADD CONSTRAINT \`FK_516f1cf15166fd07b732b4b6ab0\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agent\` ADD CONSTRAINT \`FK_031462988904ed291dd85171a86\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`career\` ADD CONSTRAINT \`FK_ab86620e9cb21386cc02990c8f3\` FOREIGN KEY (\`agent_id\`) REFERENCES \`agent\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`career\` ADD CONSTRAINT \`FK_022bee0536981ffe445fc078001\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`career\` ADD CONSTRAINT \`FK_19761204d459feff14e92b2aacc\` FOREIGN KEY (\`agent_role_id\`) REFERENCES \`agent_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` ADD CONSTRAINT \`FK_e048a2b6fdc6b89c3ea8565a38e\` FOREIGN KEY (\`workfieldId\`) REFERENCES \`workfield\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` ADD CONSTRAINT \`FK_906ec9978aa4cbc16d635405f1d\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` DROP FOREIGN KEY \`FK_906ec9978aa4cbc16d635405f1d\``);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` DROP FOREIGN KEY \`FK_e048a2b6fdc6b89c3ea8565a38e\``);
        await queryRunner.query(`ALTER TABLE \`career\` DROP FOREIGN KEY \`FK_19761204d459feff14e92b2aacc\``);
        await queryRunner.query(`ALTER TABLE \`career\` DROP FOREIGN KEY \`FK_022bee0536981ffe445fc078001\``);
        await queryRunner.query(`ALTER TABLE \`career\` DROP FOREIGN KEY \`FK_ab86620e9cb21386cc02990c8f3\``);
        await queryRunner.query(`ALTER TABLE \`agent\` DROP FOREIGN KEY \`FK_031462988904ed291dd85171a86\``);
        await queryRunner.query(`ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_516f1cf15166fd07b732b4b6ab0\``);
        await queryRunner.query(`ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_3dd35116e8ddce4c9364cd6cf0d\``);
        await queryRunner.query(`ALTER TABLE \`operation\` DROP FOREIGN KEY \`FK_4997881e8971fefcd8ebbb17227\``);
        await queryRunner.query(`ALTER TABLE \`operation\` DROP FOREIGN KEY \`FK_a3ae8f466f04ad4e8de987db807\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_6a56c16291e3654a159998f621b\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_9633c0cb30e59b3c11e773a20a8\``);
        await queryRunner.query(`ALTER TABLE \`licence\` DROP FOREIGN KEY \`FK_7aff118ec29d76f955cd5e565ff\``);
        await queryRunner.query(`DROP INDEX \`IDX_906ec9978aa4cbc16d635405f1\` ON \`companies_workfields\``);
        await queryRunner.query(`DROP INDEX \`IDX_e048a2b6fdc6b89c3ea8565a38\` ON \`companies_workfields\``);
        await queryRunner.query(`DROP TABLE \`companies_workfields\``);
        await queryRunner.query(`DROP TABLE \`agent_role\``);
        await queryRunner.query(`DROP TABLE \`career\``);
        await queryRunner.query(`DROP INDEX \`REL_031462988904ed291dd85171a8\` ON \`agent\``);
        await queryRunner.query(`DROP TABLE \`agent\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`file\``);
        await queryRunner.query(`DROP TABLE \`operation\``);
        await queryRunner.query(`DROP TABLE \`client_operation_type\``);
        await queryRunner.query(`DROP TABLE \`operation_type\``);
        await queryRunner.query(`DROP INDEX \`REL_6a56c16291e3654a159998f621\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP TABLE \`workfield\``);
        await queryRunner.query(`DROP TABLE \`licence\``);
        await queryRunner.query(`DROP TABLE \`company_category\``);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
