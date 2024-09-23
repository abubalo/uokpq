// app.ts
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as db from './config/db';
import httpLogger from './api/middleware/httpLogger';
import { errorHandler } from './api/middleware/errorHandler';
import { apiRateLimiter, authLimiter } from './api/middleware/limiter';
import userRoutes from './api/routes/v1/user.routes';
import paperRoutes from './api/routes/v1/paper.routes';
import adminRoutes from './api/routes/v1/admin.routes';
import { corsOptions } from './config/corsOptions';
import swaggerSetup from './../swagger';

const app = express();

db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
    frameguard: { action: 'deny' },
  })
);
app.use(compression());
app.use(httpLogger);
app.use(errorHandler);
app.use(authLimiter);

swaggerSetup(app);

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/papers', apiRateLimiter, paperRoutes);
app.use('/api/v1/admin', apiRateLimiter, adminRoutes);

export default app;
