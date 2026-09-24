// Must stay first: the values below are read at module scope.
// Node does not load .env on its own (Bun does), so entry points like
// `nest start` and drizzle-kit would silently fall back to the defaults.
import "dotenv/config";

const dbDefaults = {
  port: 5432,
  host: "localhost",
  database: "postgres",
  user: "postgres",
  password: "postgres",
};

export const dbConfig = {
  port: Number(process.env.DB_PORT ?? dbDefaults.port),
  host: process.env.DB_HOST ?? dbDefaults.host,
  database: process.env.DB_DATABASE ?? dbDefaults.database,
  user: process.env.DB_USER ?? dbDefaults.user,
  password: process.env.DB_PASSWORD ?? dbDefaults.password,
} as const;

export const dbUrl = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;