/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Context } from 'koa';
import { configuration } from '../config';
import { LoggerService } from '../helpers';
import { Pain001 } from '../interfaces/kafka/iPain001Quote';
import { Pain013 } from '../interfaces/kafka/iPain013Quote';
import { Pacs002 } from '../interfaces/kafka/iPacs002Transfer';
import { Pacs008 } from '../interfaces/kafka/iPacs008Transfer';

const sendPacs002 = async (payload: Pacs002): Promise<any> => {
  try {
    LoggerService.log(
      `Sending body\n${JSON.stringify(payload, null, 2)}\n to endpoint\n${
        configuration.tmsPacs002Endpoint
      }`,
    );
    const tmsReply = await axios.post(
      configuration.tmsPacs002Endpoint,
      payload,
    );
    LoggerService.log(
      `Response from TMS Api: ${JSON.stringify(
        tmsReply.data?.message ? tmsReply.data.message : tmsReply.data,
        null,
        2,
      )}`,
    );
    return tmsReply;
  } catch (err: any) {
    LoggerService.error(err);
    return err;
  }
};
const sendPacs008 = async (payload: Pacs008): Promise<any> => {
  try {
    LoggerService.log(
      `Sending body\n${JSON.stringify(payload, null, 2)}\n to endpoint\n${
        configuration.tmsPacs008Endpoint
      }`,
    );
    const tmsReply = await axios.post(
      configuration.tmsPacs008Endpoint,
      payload,
    );
    LoggerService.log(
      `Response from TMS Api: ${
        tmsReply.data?.message
          ? tmsReply.data.message
          : JSON.stringify(tmsReply.data, null, 2)
      }`,
    );
    return tmsReply;
  } catch (err: any) {
    LoggerService.error(err);
    return err;
  }
};

const sendPain001 = async (payload: Pain001): Promise<any> => {
  try {
    LoggerService.log(
      `Sending body\n${JSON.stringify(payload, null, 2)}\n to endpoint\n${
        configuration.tmsPain001Endpoint
      }`,
    );
    const tmsReply = await axios.post(
      configuration.tmsPain001Endpoint,
      payload,
    );
    LoggerService.log(
      `Response from TMS Api: ${
        tmsReply.data?.message
          ? tmsReply.data.message
          : JSON.stringify(tmsReply.data, null, 2)
      }`,
    );
    return tmsReply;
  } catch (err: any) {
    LoggerService.error(err);
    return err;
  }
};

const sendPain013 = async (payload: Pain013): Promise<any> => {
  try {
    LoggerService.log(
      `Sending body\n${JSON.stringify(payload, null, 2)}\n to endpoint\n${
        configuration.tmsPain013Endpoint
      }`,
    );
    const tmsReply = await axios.post(
      configuration.tmsPain013Endpoint,
      payload,
    );
    LoggerService.log(
      `Response from TMS Api: ${
        tmsReply.data?.message
          ? tmsReply.data.message
          : JSON.stringify(tmsReply.data, null, 2)
      }`,
    );
    return tmsReply;
  } catch (err: any) {
    LoggerService.error(err);
    return err;
  }
};

const healthcheck = (ctx: Context): Context => {
  const data = {
    status: 'UP',
  };
  ctx.body = data;

  return ctx;
};

export { sendPain001, sendPain013, sendPacs002, sendPacs008, healthcheck };
