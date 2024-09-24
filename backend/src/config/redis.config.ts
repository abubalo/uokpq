import { env } from './env';

export const redisConfig = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  username: env.REDIS_USERNAME,
  ttl: env.REDIS_CACHE_TTL,
  maxRetriesPerRequest: 10,
  connectTimeout: 10000,
};