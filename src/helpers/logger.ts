/* eslint-disable @typescript-eslint/no-explicit-any */
import { configuration } from '../config';
import log4js from 'log4js';

const layoutType = { type: 'pattern', pattern: '%[[%d]%]%m' }; // { type: 'colored' }
log4js.configure({
  appenders: { console: { type: 'console', layout: layoutType } },
  categories: { default: { appenders: ['console'], level: 'info' } },
});

export abstract class LoggerService {
  private static source = configuration.functionName;
  private static logger = log4js.getLogger();
  public static isDebugging = configuration.dev === 'dev';
  public static internalTimestamps = layoutType.type !== 'pattern';

  private static timeStamp() {
    if (!this.internalTimestamps) return '';
    const dateObj = new Date();
    let date = dateObj.toISOString();
    date = date.substring(0, date.indexOf('T'));
    const time = dateObj.toLocaleTimeString([], { hour12: false });
    return `[${date} ${time}]`;
  }

  static getLogger() {
    return this.logger;
  }

  static log(message: string, serviceOperation?: string): Promise<void> | any {
    this.isDebugging &&
      this.logger.info(
        `${LoggerService.timeStamp()}[${LoggerService.source}${
          serviceOperation ? ' - ' + serviceOperation : ''
        }][INFO] - ${message}`,
      );
  }

  static warn(message: string, serviceOperation?: string): Promise<void> | any {
    this.isDebugging &&
      this.logger.warn(
        `${LoggerService.timeStamp()}[${LoggerService.source}${
          serviceOperation ? ' - ' + serviceOperation : ''
        }][WARN] - ${message}`,
      );
  }

  static error(
    message: string | Error,
    innerError?: Error,
    serviceOperation?: string,
  ): Promise<void> | any {
    let errMessage = typeof message === 'string' ? message : message.stack;

    if (innerError) {
      errMessage += `\r\n${innerError.message}`;
    }

    this.logger.error(
      `${LoggerService.timeStamp()}[${LoggerService.source}${
        serviceOperation ? ' - ' + serviceOperation : ''
      }][ERROR] - ${errMessage}`,
    );
  }
}
