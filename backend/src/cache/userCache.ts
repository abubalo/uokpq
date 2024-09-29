import { User } from '@/types';
import { getFromCache, setInCache, deleteFromCache } from './cache';

const userCachePrefix = 'user:';

export async function getUserFromCache(userId: number): Promise<User | null> {
  return getFromCache(`${userCachePrefix}${userId}`);
}

export async function setUserInCache(userId: number, userData: User): Promise<void> {
  return setInCache(`${userCachePrefix}${userId}`, userData);
}

export async function deleteUserFromCache(userId: number): Promise<void> {
  return deleteFromCache(`${userCachePrefix}${userId}`);
}
