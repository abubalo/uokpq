import { redisConfig } from '@/config/redis.config';
import { getRedisClient } from '@/utils/redis';

const redis = getRedisClient();

export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function setInCache<T>(key: string, value: T): Promise<void> {
  try {
    await redis.setex(key, redisConfig.ttl, JSON.stringify(value));
  } catch (error) {
    console.error('Cache set error:', error);
    throw error
  }
}

export async function deleteFromCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error('Cache delete error:', error);
    throw error
  }
}

export async function invalidateCacheOnEvent<T>(
  event: string,
  key: string,
  value: T
) {
  try {
    switch (event) {
      case 'DATA_UPDATE':
        if (value !== null) {
          await setInCache(key, value);
        } else {
          console.warn('No value provided for DATA_UPDATE event.');
        }
        break;
      case 'DATA_DELETE':
        await deleteFromCache(key);
        break;
      // Add more event cases as needed
      default:
        console.warn('Unhandled cache event:', event);
    }
  } catch (error) {
    console.error('Cache event handling error:', error);
  }
}
