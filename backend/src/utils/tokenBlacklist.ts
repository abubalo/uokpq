import { getRedisClient } from '@/utils/redis';
import { promisify } from 'util';

const redis = getRedisClient();

// Utility to set token in Redis with expiration
const setexAsync = promisify(redis.setex).bind(redis);

// Utility to check if a token exists in the blacklist
const getAsync = promisify(redis.get).bind(redis);

// Token blacklist prefix for Redis keys
const tokenBlacklistPrefix = 'blacklist:jwt:';

// Blacklist a token (on logout, admin revoke, etc.)
export async function blacklistToken(token: string, expiresIn: number): Promise<void> {
  try {
    // Store the token in the blacklist with its expiration time
    await setexAsync(`${tokenBlacklistPrefix}${token}`, expiresIn, 'blacklisted');
  } catch (error) {
    console.error('Error blacklisting token:', error);
    throw error;
  }
}

// Check if a token is blacklisted
export async function isTokenBlacklisted(token: string): Promise<boolean> {
  try {
    const result = await getAsync(`${tokenBlacklistPrefix}${token}`);
    return !!result; // Return true if token is blacklisted, false otherwise
  } catch (error) {
    console.error('Error checking token blacklist:', error);
    throw error;
  }
}
