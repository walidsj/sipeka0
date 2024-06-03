import { type Config } from 'drizzle-kit'
import dotenv from 'dotenv'

dotenv.config()

export default {
    schema: './src/server/db/schema.ts',
    out: './drizzle',
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        user: process.env.DB_USER ? process.env.DB_USER : 'walid',
        password: process.env.DB_PASSWORD
            ? process.env.DB_PASSWORD
            : 'S1nc3@2023',
        database: process.env.DB_NAME ? process.env.DB_NAME : 'sipeka_new',
    },
} satisfies Config
