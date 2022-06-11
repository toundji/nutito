import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1654731862537 implements MigrationInterface {
    name = 'Migration1654731862537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`amount\` float NOT NULL, \`amount_in\` float NOT NULL DEFAULT '0', \`amount_out\` float NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NOT NULL, \`entity_name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client_operation_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` enum ('entrée', 'sortie') NOT NULL DEFAULT 'entrée', \`operationTypeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`amount\` float NOT NULL, \`amount_in\` float NOT NULL, \`amount_out\` float NOT NULL, \`balance\` float NOT NULL, \`description\` varchar(255) NOT NULL, \`document_id\` int NULL, \`operation_type_id\` int NULL, \`client_operation_type_id\` int NULL, UNIQUE INDEX \`REL_15a535205d6084391c14fa6471\` (\`document_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operation_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` enum ('entrée', 'sortie') NOT NULL DEFAULT 'entrée', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`licence\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`expiry_date\` datetime NOT NULL, \`amount\` float NOT NULL, \`code\` varchar(255) NOT NULL, \`payment_type\` enum ('physique', 'kkiapay') NOT NULL DEFAULT 'kkiapay', \`transaction_id\` int NOT NULL, \`transaction_info\` varchar(255) NOT NULL, \`company_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workfield\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`city\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`address\` varchar(255) NULL, \`country\` varchar(255) NULL, \`ifu\` varchar(255) NULL, \`rccm\` varchar(255) NULL, \`agent_number\` int NULL, \`company_category_id\` int NULL, \`account_id\` int NULL, UNIQUE INDEX \`REL_6a56c16291e3654a159998f621\` (\`account_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agent_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`firstname\` varchar(255) NULL, \`lastname\` varchar(255) NULL, \`email\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`ifu\` varchar(255) NULL, \`birth_date\` datetime NULL, \`birth_place\` varchar(255) NULL, \`address\` varchar(255) NULL, \`country\` varchar(255) NULL, \`city\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`user_type\` enum ('admin', 'system engineer', 'user') NOT NULL DEFAULT 'user', \`verification_token\` varchar(255) NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`profile_picture_id\` int NULL, UNIQUE INDEX \`REL_e4238c3828bc51ff8ca27c4638\` (\`profile_picture_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agent\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`creator_id\` int NULL, \`updater_id\` int NULL, \`slug\` varchar(255) NOT NULL, \`agent_id\` int NULL, \`company_id\` int NULL, \`agent_role_id\` int NULL, UNIQUE INDEX \`REL_10432ce0277aa0b68fd085a362\` (\`agent_role_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies_workfields\` (\`companyId\` int NOT NULL, \`workfieldId\` int NOT NULL, INDEX \`IDX_906ec9978aa4cbc16d635405f1\` (\`companyId\`), INDEX \`IDX_e048a2b6fdc6b89c3ea8565a38\` (\`workfieldId\`), PRIMARY KEY (\`companyId\`, \`workfieldId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`client_operation_type\` ADD CONSTRAINT \`FK_0797025c4bdcac637255ffd5de1\` FOREIGN KEY (\`operationTypeId\`) REFERENCES \`operation_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`operation\` ADD CONSTRAINT \`FK_15a535205d6084391c14fa64715\` FOREIGN KEY (\`document_id\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`operation\` ADD CONSTRAINT \`FK_a3ae8f466f04ad4e8de987db807\` FOREIGN KEY (\`operation_type_id\`) REFERENCES \`operation_type\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`operation\` ADD CONSTRAINT \`FK_4997881e8971fefcd8ebbb17227\` FOREIGN KEY (\`client_operation_type_id\`) REFERENCES \`client_operation_type\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`licence\` ADD CONSTRAINT \`FK_7aff118ec29d76f955cd5e565ff\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_9633c0cb30e59b3c11e773a20a8\` FOREIGN KEY (\`company_category_id\`) REFERENCES \`company_category\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_6a56c16291e3654a159998f621b\` FOREIGN KEY (\`account_id\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_e4238c3828bc51ff8ca27c46385\` FOREIGN KEY (\`profile_picture_id\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agent\` ADD CONSTRAINT \`FK_ccb938d9faac409291066b2f0d3\` FOREIGN KEY (\`agent_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agent\` ADD CONSTRAINT \`FK_81fca3f58e8f54e10c46adb07d9\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agent\` ADD CONSTRAINT \`FK_10432ce0277aa0b68fd085a362c\` FOREIGN KEY (\`agent_role_id\`) REFERENCES \`agent_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` ADD CONSTRAINT \`FK_906ec9978aa4cbc16d635405f1d\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` ADD CONSTRAINT \`FK_e048a2b6fdc6b89c3ea8565a38e\` FOREIGN KEY (\`workfieldId\`) REFERENCES \`workfield\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` DROP FOREIGN KEY \`FK_e048a2b6fdc6b89c3ea8565a38e\``);
        await queryRunner.query(`ALTER TABLE \`companies_workfields\` DROP FOREIGN KEY \`FK_906ec9978aa4cbc16d635405f1d\``);
        await queryRunner.query(`ALTER TABLE \`agent\` DROP FOREIGN KEY \`FK_10432ce0277aa0b68fd085a362c\``);
        await queryRunner.query(`ALTER TABLE \`agent\` DROP FOREIGN KEY \`FK_81fca3f58e8f54e10c46adb07d9\``);
        await queryRunner.query(`ALTER TABLE \`agent\` DROP FOREIGN KEY \`FK_ccb938d9faac409291066b2f0d3\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_e4238c3828bc51ff8ca27c46385\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_6a56c16291e3654a159998f621b\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_9633c0cb30e59b3c11e773a20a8\``);
        await queryRunner.query(`ALTER TABLE \`licence\` DROP FOREIGN KEY \`FK_7aff118ec29d76f955cd5e565ff\``);
        await queryRunner.query(`ALTER TABLE \`operation\` DROP FOREIGN KEY \`FK_4997881e8971fefcd8ebbb17227\``);
        await queryRunner.query(`ALTER TABLE \`operation\` DROP FOREIGN KEY \`FK_a3ae8f466f04ad4e8de987db807\``);
        await queryRunner.query(`ALTER TABLE \`operation\` DROP FOREIGN KEY \`FK_15a535205d6084391c14fa64715\``);
        await queryRunner.query(`ALTER TABLE \`client_operation_type\` DROP FOREIGN KEY \`FK_0797025c4bdcac637255ffd5de1\``);
        await queryRunner.query(`DROP INDEX \`IDX_e048a2b6fdc6b89c3ea8565a38\` ON \`companies_workfields\``);
        await queryRunner.query(`DROP INDEX \`IDX_906ec9978aa4cbc16d635405f1\` ON \`companies_workfields\``);
        await queryRunner.query(`DROP TABLE \`companies_workfields\``);
        await queryRunner.query(`DROP INDEX \`REL_10432ce0277aa0b68fd085a362\` ON \`agent\``);
        await queryRunner.query(`DROP TABLE \`agent\``);
        await queryRunner.query(`DROP INDEX \`REL_e4238c3828bc51ff8ca27c4638\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`agent_role\``);
        await queryRunner.query(`DROP INDEX \`REL_6a56c16291e3654a159998f621\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP TABLE \`workfield\``);
        await queryRunner.query(`DROP TABLE \`licence\``);
        await queryRunner.query(`DROP TABLE \`company_category\``);
        await queryRunner.query(`DROP TABLE \`operation_type\``);
        await queryRunner.query(`DROP INDEX \`REL_15a535205d6084391c14fa6471\` ON \`operation\``);
        await queryRunner.query(`DROP TABLE \`operation\``);
        await queryRunner.query(`DROP TABLE \`client_operation_type\``);
        await queryRunner.query(`DROP TABLE \`file\``);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
