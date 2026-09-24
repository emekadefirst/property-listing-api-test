import pg from "pg";
import { dbUrl } from "../configs/db.configs.js";

const { Client } = pg;

async function enablePOSTGIS() {
  const client = new Client({
    connectionString: dbUrl,
  });

  try {
    await client.connect();
    await client.query("CREATE EXTENSION IF NOT EXISTS postgis;");
    console.log("PostGIS extension enabled successfully.");
  } catch (error) {
    console.error("Error enabling PostGIS extension:", error);
    throw error;
  } finally {
    await client.end();
  }
}

enablePOSTGIS();