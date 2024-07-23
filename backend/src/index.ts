import 'tsconfig-paths/register';
import * as db from './config/db';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import httpLogger from './api/middleware/httpLogger';
import { errorHandler } from './api/middleware/errorHandler';
import { authLimiter } from './api/middleware/limiter';
import cookieParser from 'cookie-parser';
import userRoutes from './api/routes/v1/user.routes';
import paperRoutes from './api/routes/v1/paper.routes';
import adminRoutes from './api/routes/v1/admin.routes';
import { configDotenv } from 'dotenv';
import dotenv from 'dotenv';
import { corsOptions } from './config/corsConfig';
import { Logging } from './utils/Logging';
dotenv.config();

configDotenv();
const app = express();

db.connect();

process.on('SIGINT', async () => {
  await db.disconnect();
  process.exit(0);
});

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
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin',
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
    frameguard: {
      action: 'deny',
    },
  })
);
app.use(compression());
app.use(httpLogger);
app.use(errorHandler);
app.use(authLimiter);

app.use('/user', userRoutes);
app.use('/papers', paperRoutes);
app.use('/admin', adminRoutes);

app.listen(process.env.SERVER_PORT, () => {
  Logging.log(`Server is running on localhost:${process.env.SERVER_PORT}`);
});
