import { loadEnvConfig } from "@next/env";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { getDb } from "./index.js";

loadEnvConfig(process.cwd());

await migrate(getDb(), { migrationsFolder: "./drizzle" });

console.log("Database migrations applied.");
