import { Paper } from '@/types';
import { getFromCache, setInCache, deleteFromCache } from './cache';

const paperCachePrefix = 'paper:';

export async function getPaperFromCache(paperId: string) {
  return getFromCache(`${paperCachePrefix}${paperId}`);
}

export async function setPaperInCache(paperId: string, paperData: Paper) {
  return setInCache(`${paperCachePrefix}${paperId}`, paperData);
}

export async function deletePaperFromCache(paperId: string) {
  return deleteFromCache(`${paperCachePrefix}${paperId}`);
}
