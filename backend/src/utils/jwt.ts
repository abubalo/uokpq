import * as jwt from 'jsonwebtoken';
import { User, ResponseData } from '../types';
import { getUserById } from '@/api/models/user.model';

export async function generateJwtToken(user: Partial<User>): Promise<string> {
  try {
    const payload = {
      sub: user.id,
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '48h',
    });

    return token;
  } catch (error) {
    throw error;
  }
}

export async function verifyJwtToken(
  token: string
): Promise<ResponseData<User>> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      sub: string;
    };
    const userId = decoded.sub;

    const user = await getUserById(userId);

    if (!user) {
      return { errorMessage: 'User does not exist', success: false };
    }

    return { value: user, success: true };
  } catch (error) {
    return { errorMessage: 'Unable to verify token', success: false };
  }
}
