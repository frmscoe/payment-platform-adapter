/* eslint-disable @typescript-eslint/no-empty-function */
import { configuration } from '../config';
import { LoggerService } from './logger';

const logger = LoggerService.getLogger();
const loggerSource = configuration.functionName;
const getTestRegex = (
  msg: string,
  type: 'INFO' | 'ERROR' | 'WARN',
  operation = '',
) =>
  new RegExp(
    `\\[\\d{4}-\\d{2}-\\d{2}\\s\\d{2}:\\d{2}:\\d{2}\\]\\[${loggerSource}${
      operation ? ' - ' + operation : operation
    }\\]\\[${type}\\] - ${msg}`,
  );

const fixErrorStackRegex = (msg: string) =>
  msg
    .replace(/\\/gm, () => '\\\\')
    .replace(/\(/gm, () => '\\(')
    .replace(/\)/gm, () => '\\)')
    .replace(/\n/gm, () => '\\n');

describe('Logger Service', () => {
  let consoleLoggerSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLoggerSpy = jest.spyOn(logger, 'info').mockImplementation();
    consoleWarnSpy = jest.spyOn(logger, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(logger, 'error').mockImplementation();
  });

  describe('Log', () => {
    it('should log a message with defined operation', async () => {
      LoggerService.isDebugging = true;

      const expectedMessage = 'ExpectedLogMessage';
      const operation = 'TestService';
      await LoggerService.log(expectedMessage, operation);
      await LoggerService.log(expectedMessage);

      expect(consoleLoggerSpy).toHaveBeenCalledTimes(2);

      consoleLoggerSpy.mockRestore();
    });

    it('should not log a message with defined operation', async () => {
      LoggerService.isDebugging = false;
      const expectedMessage = 'UnexpectedLogMessage';
      const operation = 'TestService';
      await LoggerService.log(expectedMessage, operation);
      await LoggerService.log(expectedMessage);
      expect(consoleLoggerSpy).toHaveBeenCalledTimes(0);

      consoleLoggerSpy.mockRestore();
    });
  });

  describe('Warn', () => {
    it('should log a Warn message with defined operation', async () => {
      LoggerService.isDebugging = true;
      const expectedMessage = 'ExpectedWarnMessage';
      const operation = 'TestService';
      await LoggerService.warn(expectedMessage, operation);
      await LoggerService.warn(expectedMessage);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(2);

      consoleWarnSpy.mockRestore();
    });

    it('should not log a Warn message with defined operation', async () => {
      LoggerService.isDebugging = false;
      const expectedMessage = 'ExpectedWarnMessage';
      const operation = 'TestService';
      await LoggerService.warn(expectedMessage, operation);
      await LoggerService.warn(expectedMessage);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(0);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('Error', () => {
    it('should log a Error message with defined operation', async () => {
      const expectedMessage = 'ExpectedWarnMessage';
      const operation = 'TestService';
      LoggerService.internalTimestamps = true;
      await LoggerService.error(
        expectedMessage,
        new Error('some error'),
        operation,
      );
      const measuredArgs = consoleErrorSpy.mock.calls[0][0];
      expect(measuredArgs).toMatch(
        getTestRegex(expectedMessage, 'ERROR', operation),
      );
    });

    it('should log a Error message with message as Error', async () => {
      const expectedMessage = 'ExpectedWarnMessage';
      const operation = 'TestService';
      const error = new Error('some error');
      error.stack = 'Some stack';
      await LoggerService.error(error, new Error('some internal error'));
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });
  });
});
