import 'tsconfig-paths/register';
import http from 'http';
import app from './app';
import { Logging } from './utils/Logging';
import { env } from '@config/env';
import * as db from '@config/db';

const server = http.createServer(app);

process.on('SIGINT', async () => {
  await db.disconnect();
  process.exit(0);
});


server.listen(env.SERVER_PORT, () => {
  Logging.log(`Server is running on localhost:${env.SERVER_PORT}`);
});
