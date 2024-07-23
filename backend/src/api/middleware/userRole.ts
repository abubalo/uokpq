import { NextFunction, Request, Response } from 'express';

type Role = 'reqular' | 'admin' | 'super-admin';
export function userRole(requiredRole: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: User not authenticated' });
    }

    if (user.role !== requiredRole) {
      return res
        .status(401)
        .json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
}
