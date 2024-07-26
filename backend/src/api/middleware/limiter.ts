import { Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';

const rateLimitError = (req: Request, res: Response) => {
  return res.status(429).json({
    error: 'Rate limit exceeded',
    message: 'Too many request attempt, please try again',
  });
};

export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes window
  max: 100,
  message: 'Too many login or regisration attempts, please try again later.',
  handler: rateLimitError,
});

export const apiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  handler: rateLimitError,
});

export const fileUploadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: 'Too many file uploads from this IP, please try again later.',
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many file uploads from this IP, please try again later.',
    });
  },
});
