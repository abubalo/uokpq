import { cleanEnv, num, str, url } from 'envalid';
import {config} from "dotenv"

config();

export const env = cleanEnv(process.env, {
  JWT_SECRET: str(),
  SERVER_PORT: num(),
  SESSION_MAX_AGE: num(),
  DB_USERNAME: str(),
  DB_HOST: str(),
  DB_NAME: str(),
  DB_PASSWORD: str(),
  DB_PORT: num(),
  REDIS_UPSTACH_URL: url(),
  REDIS_HOST: str(),
  REDIS_PORT: num(),
  REDIS_PASSWORD: str(),
  REDIS_USERNAME: str(),
  REDIS_CACHE_TTL: num(),
  REGION: str(),
  ACCESS_KEY_ID: str(),
  SECRET_ACCESS_KEY: str(),
  BUCKET_NAME: str(),
  R2_ENDPOINT: url(),
  LOG_LEVEL: str()
});

