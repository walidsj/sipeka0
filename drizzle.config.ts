import { type Config } from 'drizzle-kit'
import { env } from '@/env.server'

export default {
    schema: './src/server/db/schema.ts',
    out: './drizzle',
    dialect: 'mysql',
    dbCredentials: {
        host: env.DB_HOST ? env.DB_HOST : 'localhost',
        port: env.DB_PORT ? Number(env.DB_PORT) : 3306,
        user: env.DB_USER ? env.DB_USER : 'walid',
        password: env.DB_PASSWORD ? env.DB_PASSWORD : 'S1nc3@2023',
        database: env.DB_NAME ? env.DB_NAME : 'sipeka_new',
    },
} satisfies Config
