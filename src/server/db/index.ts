import { drizzle } from 'drizzle-orm/mysql2'
import { createPool, type Pool } from 'mysql2/promise'
import * as schema from './schema'
import dotenv from 'dotenv'
import { env } from '@/env.server'

dotenv.config()

const globalForDb = globalThis as unknown as {
    conn: Pool | undefined
}

const conn =
    globalForDb.conn ??
    createPool({
        host: env.DB_HOST ? env.DB_HOST : 'localhost',
        port: env.DB_PORT ? Number(env.DB_PORT) : 3306,
        user: env.DB_USER ? env.DB_USER : 'walid',
        password: env.DB_PASSWORD ? env.DB_PASSWORD : 'S1nc3@2023',
        database: env.DB_NAME ? env.DB_NAME : 'sipeka_new',
    })
if (env.NODE_ENV !== 'production') globalForDb.conn = conn

export const db = drizzle(conn, { schema, mode: 'default' })
