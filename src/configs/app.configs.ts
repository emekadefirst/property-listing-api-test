// Must stay first: the values below are read at module scope.
import "dotenv/config";

const appDefaults = {
  port: 3000,
  host: "0.0.0.0",
  nodeEnv: "development",
  apiVersion: "v1",
};

export const appConfig = {
  port: Number(process.env.APP_PORT ?? appDefaults.port),
  host: process.env.HOST ?? appDefaults.host,
  env: (process.env.NODE_ENV ?? appDefaults.nodeEnv) as
    | "development"
    | "staging"
    | "production"
    | "test",
  apiVersion: process.env.API_VERSION ?? appDefaults.apiVersion,
  isProd: process.env.NODE_ENV === "production",
} as const;

export const appBaseUrl = 
  process.env.APP_BASE_URL ?? `http://localhost:${appConfig.port}`;