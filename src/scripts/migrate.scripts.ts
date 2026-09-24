import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { dbUrl } from "../configs/db.configs.js";

async function runMigration() {
  const migrationClient = postgres(dbUrl, { prepare: false, max: 1 });
  const migrationDb = drizzle(migrationClient);

  console.log("⏳ Running migrations...");
  try {
    await migrate(migrationDb, { migrationsFolder: "./drizzle" });
    console.log("✅ Migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1); 
  } finally {
    await migrationClient.end();
  }
}

runMigration();