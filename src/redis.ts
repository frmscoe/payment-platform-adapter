import { configuration } from './config';
import { LoggerService } from './helpers';
import { createClient } from 'redis';

// Connect to redis
export const redisClient = createClient(
  configuration.redisPort,
  configuration.redisURL,
);

redisClient.on('ready', () => {
  LoggerService.log(
    `event: 'execute'; Redis client connected on PORT ${configuration.redisPort}`,
  );
});

redisClient.on('error', () => {
  LoggerService.log("event: 'error'; Could not connect to Redis");
});
