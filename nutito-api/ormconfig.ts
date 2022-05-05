import 'dotenv/config'
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    url: process.env.DB_URL,
    host: process.env.DATABASE_HOST,
    port: (process.env.DATABASE_PORT as any) as number,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: { rejectUnauthorized: false },
    synchronize: false,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/src/db/migrations/*.js"],
    cli: {  
        migrationsDir: "src/db/migrations",
        entitiesDir: "src/**/*"
    }
}
export default config;