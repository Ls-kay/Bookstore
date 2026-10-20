import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema.js";

const globalForDatabase = globalThis;

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL must be set to connect to the Neon database.");
  }

  if (!globalForDatabase.bookstorePool) {
    globalForDatabase.bookstorePool = new Pool({ connectionString });
    globalForDatabase.bookstoreDb = drizzle(globalForDatabase.bookstorePool, {
      schema,
    });
  }

  return globalForDatabase.bookstoreDb;
}

export async function closeDb() {
  if (globalForDatabase.bookstorePool) {
    await globalForDatabase.bookstorePool.end();
    globalForDatabase.bookstorePool = undefined;
    globalForDatabase.bookstoreDb = undefined;
  }
}
