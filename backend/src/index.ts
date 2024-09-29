import 'tsconfig-paths/register';
import http from 'http';
import app from './app';
import { Logging } from './utils/Logging';
import { env } from '@config/env';
import * as db from '@config/db';
import { connectRabbitMQ } from './config/amqplib';

const server = http.createServer(app);

server.listen(env.SERVER_PORT, () => {
  Logging.log(`Server is running on localhost:${env.SERVER_PORT}`);
});

const gracefulShutdown = async (signal: string) => {
  Logging.log(`Received ${signal}. Initiating graceful shutdown...`);

  server.close(async (error) => {
    if (error) {
      Logging.error(`Error occured durring server shutdown: ${error}`);
      process.exit(1);
    }
    try {
      await db.disconnect();
      Logging.log('Database disconnected successfully');

      await connectRabbitMQ();
      Logging.log('RabbitMq disconnected successfully');

      Logging.log('All connections closed. Exiting process.');
      process.exit(0);
    } catch (shutdownError) {
      Logging.error(`Error occured durring shutdown process. ${shutdownError}`);
      process.exit(1);
    }
  });

  setTimeout(() => {
    Logging.warn('Graceful shutdown timed out. Forcing exit.');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
