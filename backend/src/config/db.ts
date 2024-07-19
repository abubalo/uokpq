import { Pool, PoolClient } from 'pg';
import { logger } from '../utils/logger';
import Knex from 'knex';

const pool = new Pool({
  user: 'abubalo',
  host: 'localhost',
  database: 'uokpq',
  password: '',
  port: 5432,
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
  process.exit(-1);
});

// For managing complex queries
export const knex = Knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'abubalo',
    password: '',
    database: 'uokpq',
  },
});
