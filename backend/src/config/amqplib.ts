import amqplib, { Channel, Connection } from 'amqplib';
import { Logging } from '@/utils/Logging';
import { env } from './env';

export async function connectRabbitMQ(): Promise<{
  channel: Channel;
  connection: Connection;
}> {
  try {
    const connection = await amqplib.connect(env.RABBITMQ_URL);
    Logging.info('Successuly connected to RabbitMQ!');

    const channel = await connection.createChannel();
    Logging.info('RabbitMQ channal created!');

    return { connection, channel };
  } catch (error) {
    Logging.error(`Error connecting to RabbitMQ: ${error}`);
    throw error;
  }
}
