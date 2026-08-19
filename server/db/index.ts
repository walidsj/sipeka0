import { drizzle } from "drizzle-orm/mysql2";
import { createPool, type Pool } from "mysql2/promise";
import * as schema from "./schema";
import dotenv from "dotenv";
import { env } from "#server/env";

dotenv.config();

export type TahunAnggaran = "2025" | "2026";

const databaseNames: Record<TahunAnggaran, string> = {
  "2025": env.DB_NAME_2025 || "sipeka2025",
  "2026": env.DB_NAME_2026 || env.DB_NAME || "sipeka2026",
};

const globalForDb = globalThis as unknown as {
  connections?: Partial<Record<TahunAnggaran, Pool>>;
};

const connections = globalForDb.connections ?? {};

function createConnection(database: string) {
  return createPool({
    host: env.DB_HOST ? env.DB_HOST : "localhost",
    port: env.DB_PORT ? Number(env.DB_PORT) : 3306,
    user: env.DB_USER ? env.DB_USER : "walid",
    password: env.DB_PASSWORD ? env.DB_PASSWORD : "S1nc3@2023",
    database,
  });
}

function getConnection(tahun: TahunAnggaran) {
  connections[tahun] ??= createConnection(databaseNames[tahun]);
  return connections[tahun];
}

if (process.env.NODE_ENV !== "production") {
  globalForDb.connections = connections;
}

export function getDbForYear(tahun: TahunAnggaran) {
  return drizzle(getConnection(tahun), { schema, mode: "default" });
}

export const db = getDbForYear("2026");

export const tables = schema;
