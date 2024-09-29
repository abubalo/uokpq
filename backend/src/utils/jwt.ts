import * as jwt from 'jsonwebtoken';
import { User } from '../types';
import { getUserById } from '@/api/models/user.model';
import { env } from '@/config/env';

type Result<T> = 
  | { success: true; value: T }
  | { success: false; errorMessage: string };

export function generateJwtToken(user: Partial<User>): string {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTime = currentTimestamp + 24 * 60 * 60; // 24 hours

  const payload = {
    sub: user.id,
    iat: currentTimestamp,
    exp: expirationTime,
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    schoolId: user.schoolId,
    profileImage: user.profileImage,
    role: user.role,
  };

  return jwt.sign(payload, env.JWT_SECRET);
}

export async function verifyJwtToken(token: string): Promise<Result<User>> {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
    
    if (typeof decoded.sub !== 'number') {
      return { success: false, errorMessage: 'Invalid token payload' };
    }
    
    const userId = decoded.sub;
    const user = await getUserById(userId);

    if (!user) {
      return { success: false, errorMessage: 'User does not exist' };
    }

    return { success: true, value: user };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { success: false, errorMessage: 'Token has expired' };
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return { success: false, errorMessage: 'Invalid token' };
    }
    return { success: false, errorMessage: 'Unable to verify token' };
  }
}