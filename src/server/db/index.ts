import { drizzle } from 'drizzle-orm/mysql2'
import { createPool, type Pool } from 'mysql2/promise'
import * as schema from './schema'
import dotenv from 'dotenv'

dotenv.config()

const globalForDb = globalThis as unknown as {
    conn: Pool | undefined
}

const conn =
    globalForDb.conn ??
    createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn

export const db = drizzle(conn, { schema, mode: 'default' })
