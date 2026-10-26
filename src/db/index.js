import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema.js";

const globalForDatabase = globalThis;

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL must be set to connect to the Neon database.");
  }

  if (!globalForDatabase.bookstoreDb) {
    const client = neon(connectionString);
    globalForDatabase.bookstoreDb = drizzle({ client, schema });
  }

  return globalForDatabase.bookstoreDb;
}
