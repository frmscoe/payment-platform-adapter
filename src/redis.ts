// SPDX-License-Identifier: Apache-2.0

import { configuration } from './config';
import { LoggerService } from './helpers';
import { Redis } from 'ioredis';

// Connect to redis
export const redisClient = new Redis(configuration.redisPort, configuration.redisURL);

redisClient.on('ready', () => {
  LoggerService.log(`event: 'execute'; Redis client connected on PORT ${configuration.redisPort}`);
});

redisClient.on('error', () => {
  LoggerService.log("event: 'error'; Could not connect to Redis");
});
