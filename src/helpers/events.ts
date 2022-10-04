/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kafka } from 'kafkajs';
import { Logger } from 'log4js';
import { RedisClient } from 'redis';
import { configuration } from '../config';
import { eventType } from '../constants/event-types';
import { quotesConstants } from '../constants/quote-constants';
import { transferConstants } from '../constants/transfer-constants';
import {
  sendPacs002,
  sendPacs008,
  sendPain001,
  sendPain013,
} from '../controllers/misc';
import { Pacs002 } from '../interfaces/kafka/iPacs002Transfer';
import { Pacs008 } from '../interfaces/kafka/iPacs008Transfer';
import { Pain001 } from '../interfaces/kafka/iPain001Quote';
import { Pain013 } from '../interfaces/kafka/iPain013Quote';
import { LoggerService } from './logger';
import {
  eventToPacs002,
  eventToPacs008,
  eventToPain001,
  eventToPain013,
} from './mapper';

export class EventsService {
  initialized: boolean;
  kafkaClient: any;
  redis: any | RedisClient;

  constructor() {
    this.initialized = false;
    this.kafkaClient = undefined;
    this.redis = undefined;
  }

  initialize(redis: RedisClient) {
    let result = false;
    let error;

    this.redis = redis;
    const brokerURI = configuration.kafkaURI;
    const clientID = configuration.kafkaClientId;
    try {
      this.kafkaClient = new Kafka({
        brokers: [`${brokerURI}`],
        clientId: clientID,
      });
      result = true;
    } catch (err) {
      error = err;
    }

    if (!result) {
      const message = 'Failed to connect to Kafka Client';
      LoggerService.error(`${message} - ${error}`);
    }

    this.initialized = result;

    return result;
  }

  async startConsumer(messageHandleFunction: any) {
    const consumerGroup = configuration.kafkaConsumerGroup;
    const listeningTopic = configuration.kafkaTopic;

    const consumer = this.kafkaClient.consumer({ groupId: consumerGroup });

    await consumer.connect();

    await consumer.subscribe({ topic: listeningTopic, fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }: any) =>
        messageHandleFunction({ topic, partition, message }),
    });
  }

  // handler
  async messageHandler(args: any) {
    const listeningTopic = configuration.kafkaTopic;

    if (args.topic === listeningTopic) {
      let msg;

      try {
        msg = JSON.parse(args.message.value.toString());
      } catch (error) {
        LoggerService.error(`Failed to parse event message\n${error} - ${msg}`);
        return;
      }

      if (!this.isAudit(msg)) {
        return;
      }

      const typeResult = this.determineEventType(msg);

      if (typeResult === eventType.UNSUPPORTED) {
        return;
      }

      try {
        const record = await this.processEvent(msg);

        if (record == null) return;

        const TxTp = record.TxTp;
        if (TxTp === 'pain.001.001.11') {
          (this.redis as RedisClient).set(
            `[pain001]${(record as Pain001).CstmrCdtTrfInitn.PmtInf.PmtInfId}`,
            JSON.stringify(record).replace('undefined', ''),
            'EX',
            600,
          );
          (this.redis as RedisClient).set(
            `[pain001]${
              (record as Pain001).CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.PmtId
                .EndToEndId
            }`,
            JSON.stringify(record).replace('undefined', ''),
            'EX',
            600,
          );
        } else if (TxTp === 'pain.013.001.09') {
          (this.redis as RedisClient).set(
            `[pain013]${(record as Pain013).CdtrPmtActvtnReq.PmtInf.PmtInfId}`,
            JSON.stringify(record),
            'EX',
            600,
          );
        } else if (TxTp === 'pacs.008.001.10') {
          (this.redis as RedisClient).set(
            `[pacs008]${
              (record as Pacs008).FIToFICstmrCdt.CdtTrfTxInf.PmtId.InstrId
            }`,
            JSON.stringify(record),
            'EX',
            600,
          );
        } else {
          (this.redis as RedisClient).set(
            `[pacs002]${
              (record as Pacs002).FIToFIPmtSts.TxInfAndSts.OrgnlInstrId
            }`,
            JSON.stringify(record),
            'EX',
            600,
          );
        }

        await this.executeTMS(record);
      } catch (error) {
        LoggerService.error(`${error}`);
      }
    }
  }

  async executeTMS(record: any) {
    const TxTp = record.TxTp;

    const options: any = {
      'pain.001.001.11': "event: 'execute'; sendPain001",
      'pain.013.001.09': "event: 'execute'; sendPain013",
      'pacs.008.001.10': "event: 'execute'; sendPacs008",
      'pacs.002.001.12': "event: 'execute'; sendPacs002",
    };

    LoggerService.log(`${options[TxTp]}`);

    const options2: any = {
      'pain.001.001.11': sendPain001,
      'pain.013.001.09': sendPain013,
      'pacs.008.001.10': sendPacs008,
      'pacs.002.001.12': sendPacs002,
    };

    await options2[TxTp](record);
  }

  isAudit(msg: any): boolean {
    return msg?.metadata?.event?.type === eventType.AUDIT || false;
  }

  determineEventType(msg: any) {
    if (msg.metadata?.trace?.service) {
      for (const service of quotesConstants) {
        if (msg.metadata.trace.service === service) {
          return eventType.QUOTE;
        }
      }
      for (const service of transferConstants) {
        if (msg.metadata.trace.service === service) {
          return eventType.TRANSFER;
        }
      }
    }
    return eventType.UNSUPPORTED;
  }

  async processEvent(
    msg: any,
  ): Promise<Pain001 | Pain013 | Pacs008 | Pacs002 | null> {
    // pain001 - ML Quote
    if (
      msg.metadata.trace.service === 'qs_quote_forwardQuoteRequest' &&
      msg.metadata.event.action === 'egress' && // start
      msg.metadata.event.type !== 'trace' &&
      msg.metadata.trace.tags.transactionType === 'quote'
    ) {
      LoggerService.log("event: 'transformation'; Event to pain001 - ML Quote");
      const data = JSON.parse(msg.content.data);

      return eventToPain001(data);
    }

    // pain013 - ML Quote Reply
    if (
      msg.metadata.trace.tags.transactionType === 'quote' &&
      msg.metadata.trace.tags.transactionAction !== 'prepare' &&
      msg.metadata.trace.service === 'qs_quote_forwardQuoteUpdate' &&
      msg.metadata.event.action === 'egress'
    ) {
      LoggerService.log(
        "event: 'transformation'; Event to pain013 - ML Quote Reply",
      );
      const data = JSON.parse(msg.content.data);
      const quoteId = msg.content.url
        .toLowerCase()
        .slice(msg.content.url.indexOf('quotes/') + 7)
        .replace('/', '');

      const parentQuote = await this.getKey(
        `[pain001]${quoteId.replace('-', '')}`,
      );
      if (!parentQuote) {
        LoggerService.log(
          `error: 'processEvent'; [pain001]${quoteId} not found`,
        );
        return null;
      }

      const pain001: Pain001 = JSON.parse(parentQuote as string);

      return eventToPain013(data, pain001, quoteId);
    }

    // pacs008 - ML Transfer
    if (
      msg.content.method === 'POST' &&
      msg.metadata.event.type === 'audit' &&
      msg.metadata.event.action === 'egress' &&
      msg.metadata.trace.service === 'ml_notification_event'
    ) {
      LoggerService.log(
        "event: 'transformation'; Event to pacs008 - ML Transfer",
      );
      const data = JSON.parse(msg.content.data);
      const transactionId = data.transferId;

      const parentTransaction = await this.getKey(`[pain001]${transactionId}`);
      if (!parentTransaction) {
        LoggerService.log(
          `error: 'processEvent'; [pain001]${transactionId} not found`,
        );
        return null;
      }

      const pain001: Pain001 = JSON.parse(parentTransaction as string);

      return eventToPacs008(data, pain001);
    }

    // pacs002 - ML Transfer Reply
    if (
      msg.content.method === 'PUT' &&
      msg.metadata.event.type === 'audit' &&
      msg.metadata.event.action === 'egress' &&
      msg.metadata.trace.service === 'ml_notification_event' &&
      msg.content.data.includes('COMMITTED')
    ) {
      LoggerService.log(
        "event: 'transformation'; Event to pacs002 - ML Transfer Reply",
      );
      const data = JSON.parse(msg.content.data);
      const transactionId = msg.content.url
        .toLowerCase()
        .slice(msg.content.url.indexOf('transfers/') + 10)
        .replace('/', '');

      const parentTransaction = await this.getKey(`[pain001]${transactionId}`);
      if (!parentTransaction) {
        LoggerService.log(
          `error: 'processEvent'; [pain001]${transactionId} not found`,
        );
        return null;
      }

      const pain001: Pain001 = JSON.parse(parentTransaction as string);

      return eventToPacs002(data, pain001, transactionId);
    }

    return null; // none matched
  }

  private async getKey(key: string) {
    return new Promise((resolve) => {
      this.redis.get(key, function (err: any, resp: string) {
        if (err) {
          resolve(null);
        } else {
          resolve(resp);
        }
      });
    });
  }
}
