import { Pool, type PoolClient } from 'pg';
import { logger } from '../utils/logger';
import { Logging } from '../utils/Logging';
import Knex from 'knex';
import { env } from './env';

const pool = new Pool({
  user: env.DB_USERNAME,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
});

let client: PoolClient | null = null;

export const connect = async (): Promise<void> => {
  try {
    client = await pool.connect();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

export const getClient = (): PoolClient => {
  if (!client) {
    throw new Error('Database not connected. Call connect() first.');
  }
  return client;
};

export const disconnect = async (): Promise<void> => {
  if (client) {
    await client.release();
    await pool.end();
    logger.info('Database connection closed');
  }
};

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
  Logging.error(`Unexpected error on idle client ${err}`);
  process.exit(-1);
});

// For managing complex queries
export const knex = Knex({
  client: 'pg',
  connection: {
    user: env.DB_USERNAME,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
  },
});
