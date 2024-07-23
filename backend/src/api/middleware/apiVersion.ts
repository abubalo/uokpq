import { Request, Response, NextFunction } from 'express';

export const apiVersion = (version: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.apiVersion = version;
    next();
  };
};

