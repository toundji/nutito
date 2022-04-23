import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: process.env.MYSQL_DATABASE_HOST,
    port: (process.env.MYSQL_DATABASE_PORT as any) as number,
    username: process.env.MYSQL_DATABASE_USER,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    url: process.env.DATABASE_URL,
    //ssl: { rejectUnauthorized: false },
    synchronize: false,
    entities: ["dist/src/**/*/*.entity.js"],
    migrations: ["dist/src/db/migrations/*.js"],
    cli: {  
        migrationsDir: "src/db/migrations",
        entitiesDir: "src/**/*"
    }
}
export default config;