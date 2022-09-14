export interface IConfig {
  functionName: string;
  port: number;
  tmsEndpoint: string;
  tmsPain001Endpoint: string;
  tmsPain013Endpoint: string;
  tmsPacs002Endpoint: string;
  tmsPacs008Endpoint: string;
  kafkaURI: string;
  kafkaClientId: string;
  kafkaConsumerGroup: string;
  kafkaTopic: string;
  redisURL: string;
  redisPort: number;
  dev: string;
}
