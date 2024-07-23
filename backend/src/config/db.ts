import { Pool, PoolClient } from 'pg';
import { logger } from '../utils/logger';
import { Logging } from '../utils/Logging';
import Knex from 'knex';
import { env } from './env';

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
});

let client: PoolClient | null = null;

export const connect = async (): Promise<void> => {
  try {
    client = await pool.connect();
    logger.info('Database connected successfully');
    Logging.info('Database connected successfully');
  } catch (error) {
    logger.error('Failed to connect to the database', error);
    Logging.error(`Failed to connect to the database ${error}`);
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
    Logging.info('Database connection closed');
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
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
