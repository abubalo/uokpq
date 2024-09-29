import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../models/user.model';
import { getUserFromCache, setUserInCache } from '@/cache/userCache';

export async function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req;

    if (!userId) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: User ID is missing' });
    }

    const cacheduser = await getUserFromCache(userId);

    if (cacheduser) {
      req.user = cacheduser;
    } else {
      const user = await getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await setUserInCache(userId, user);

      req.user = user;
    }

    req.userId = userId;

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
