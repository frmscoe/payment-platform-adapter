/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
import { Context } from 'koa';
import log4js from 'log4js';
import App from './app';
import { configuration } from './config';
import { LoggerService } from './helpers';
import { EventsService } from './helpers/events';
import { redisClient } from './redis';

const app = new App();

export function handleError(err: Error, ctx: Context): void {
  if (ctx == null) {
    LoggerService.error(
      `Unhandled exception occured; event: 'error'; Error: ${err}`,
    );
  }
}

export function terminate(signal: NodeJS.Signals): void {
  try {
    log4js.shutdown();
    app.terminate();
  } finally {
    LoggerService.warn(
      `Signal: ${signal}; event: 'terminate'; 'App is terminated'`,
    );
    process.kill(process.pid, signal);
  }
}

// Handle uncaught errors
app.on('error', handleError);

// Start server
if (
  Object.values(require.cache).filter(async (m) => m?.children.includes(module))
) {
  const server = app.listen(configuration.port, () => {
    LoggerService.log(
      `event: 'execute'; API server listening on PORT ${configuration.port}`,
    );
  });
  server.on('error', handleError);

  const errors = ['unhandledRejection', 'uncaughtException'];
  errors.forEach((error) => {
    process.on(error, handleError);
  });

  const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

  signals.forEach((signal) => {
    process.once(signal, () => terminate(signal));
  });

  // Start events service
  const eventService = new EventsService();
  const initialized = eventService.initialize(redisClient);

  if (initialized) {
    eventService.startConsumer((args: any) => {
      eventService.messageHandler(args);
    });
  } else {
    LoggerService.log("event: 'error'; Could not start up Events Service");
  }
}

export default app;
