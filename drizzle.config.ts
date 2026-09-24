import { defineConfig } from "drizzle-kit";
import { dbUrl } from "./src/configs/db.configs.js";



export default defineConfig({
  out: "./drizzle", 
  schema: "./src/core/models.core.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl!,
   
  },
  verbose: true,
  strict: true,
});