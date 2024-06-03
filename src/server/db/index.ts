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
        host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        user: process.env.DB_USER ? process.env.DB_USER : 'walid',
        password: process.env.DB_PASSWORD
            ? process.env.DB_PASSWORD
            : 'S1nc3@2023',
        database: process.env.DB_NAME ? process.env.DB_NAME : 'sipeka_new',
    })
if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn

export const db = drizzle(conn, { schema, mode: 'default' })
