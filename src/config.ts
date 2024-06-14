// SPDX-License-Identifier: Apache-2.0

// config settings, env variables
import path from 'path';
import { config as dotenv } from 'dotenv';
import { type IConfig } from './interfaces';

// Load .env file into process.env if it exists. This is convenient for running locally.
dotenv({
  path: path.resolve(__dirname, '../.env'),
});

export const configuration: IConfig = {
  functionName: process.env.FUNCTION_NAME!,
  port: parseInt(process.env.PORT!, 10),
  tmsEndpoint: process.env.TMS_ENDPOINT!,
  tmsPain001Endpoint: process.env.TMS_PAIN001_ENDPOINT!,
  tmsPain013Endpoint: process.env.TMS_PAIN013_ENDPOINT!,
  tmsPacs002Endpoint: process.env.TMS_PACS002_ENDPOINT!,
  tmsPacs008Endpoint: process.env.TMS_PACS008_ENDPOINT!,
  kafkaURI: process.env.KAFKA_URI!,
  kafkaClientId: process.env.KAFKA_CLIENT_ID!,
  kafkaConsumerGroup: process.env.KAFKA_CONSUMER_GROUP!,
  kafkaTopic: process.env.KAFKA_TOPIC_TO_CONSUME!,
  redisURL: process.env.REDIS_URL!,
  redisPort: parseInt(process.env.REDIS_PORT!, 10),
  dev: process.env.NODE_ENV!,
};
