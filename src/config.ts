/* eslint-disable @typescript-eslint/no-non-null-assertion */
// config settings, env variables
import path from 'path';
import { config as dotenv } from 'dotenv';
import { IConfig } from './interfaces';

// Load .env file into process.env if it exists. This is convenient for running locally.
dotenv({
  path: path.resolve(__dirname, '../.env'),
});

export const configuration: IConfig = {
  functionName: <string>process.env.FUNCTION_NAME,
  port: parseInt(process.env.PORT!, 10),
  tmsEndpoint: <string>process.env.TMS_ENDPOINT,
  tmsPain001Endpoint: <string>process.env.TMS_PAIN001_ENDPOINT,
  tmsPain013Endpoint: <string>process.env.TMS_PAIN013_ENDPOINT,
  tmsPacs002Endpoint: <string>process.env.TMS_PACS002_ENDPOINT,
  tmsPacs008Endpoint: <string>process.env.TMS_PACS008_ENDPOINT,
  kafkaURI: <string>process.env.KAFKA_URI,
  kafkaClientId: <string>process.env.KAFKA_CLIENT_ID,
  kafkaConsumerGroup: <string>process.env.KAFKA_CONSUMER_GROUP,
  kafkaTopic: <string>process.env.KAFKA_TOPIC_TO_CONSUME,
  redisURL: <string>process.env.REDIS_URL,
  redisPort: parseInt(process.env.REDIS_PORT!, 10),
  dev: <string>process.env.NODE_ENV,
};
