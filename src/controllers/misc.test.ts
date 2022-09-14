import { Context } from 'koa';
import { Pacs002 } from '../interfaces/kafka/iPacs002Transfer';
import { Pacs008 } from '../interfaces/kafka/iPacs008Transfer';
import { Pain001 } from '../interfaces/kafka/iPain001Quote';
import { Pain013 } from '../interfaces/kafka/iPain013Quote';
import {
  healthcheck,
  sendPacs002,
  sendPacs008,
  sendPain001,
  sendPain013,
} from './misc';

describe('test misc pain and pacs', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should sendPain001 for PAYER result is VALID', async () => {
    const payload: Pain001 = {
      TxTp: 'pain.001.001.11',
      CstmrCdtTrfInitn: {
        GrpHdr: {
          MsgId: '6a349c386d54-4bdd-b9c2-4fc04ed62b1a',
          CreDtTm: '2022-06-05T18:54:49.620Z',
          NbOfTxs: 1,
          InitgPty: {
            Nm: 'Firstname-Test Lastname-Test',
            Id: {
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt: '1984-01-01',
                  CityOfBirth: 'Unknown',
                },
                Othr: { Id: '17039811903', SchmeNm: { Prtry: 'MSISDN' } },
              },
            },
            CtctDtls: { MobNb: '+1-7039811903' },
          },
        },
        PmtInf: {
          PmtInfId: '0a3e0da076c9-4e27-8f22-0c6c5382b6f9',
          PmtMtd: 'TRA',
          ReqdAdvcTp: {
            DbtAdvc: { Cd: 'ADWD', Prtry: 'Advice with transaction details' },
          },
          ReqdExctnDt: { Dt: '2022-06-05', DtTm: '2022-06-05T18:54:49.620Z' },
          Dbtr: {
            Nm: 'Firstname-TestLastname-Test',
            Id: {
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt: '1984-01-01',
                  CityOfBirth: 'Unknown',
                },
                Othr: { Id: '17039811903', SchmeNm: { Prtry: 'MSISDN' } },
              },
            },
            CtctDtls: { MobNb: '+1-7039811903' },
          },
          DbtrAcct: {
            Id: { Othr: { Id: '17039811903', SchmeNm: { Prtry: 'MSISDN' } } },
            Nm: 'Firstname-Test Lastname-Test',
          },
          DbtrAgt: { FinInstnId: { ClrSysMmbId: { MmbId: 'testfsp1' } } },
          CdtTrfTxInf: {
            PmtId: { EndToEndId: '2f16297c-6eee-41ac-92c7-645e591637c7' },
            PmtTpInf: { CtgyPurp: { Prtry: 'TRANSFER' } },
            Amt: {
              InstdAmt: { Amt: { Amt: 60, Ccy: 'USD' } },
              EqvtAmt: { Amt: { Amt: 60, Ccy: 'USD' }, CcyOfTrf: 'USD' },
            },
            ChrgBr: 'DEBT',
            CdtrAgt: { FinInstnId: { ClrSysMmbId: { MmbId: 'testfsp2' } } },
            Cdtr: {
              Nm: 'undefined undefined undefined',
              Id: {
                PrvtId: {
                  DtAndPlcOfBirth: {
                    BirthDt: '2022-06-05',
                    CityOfBirth: 'Unknown',
                  },
                  Othr: { Id: '17039811904', SchmeNm: { Prtry: 'MSISDN' } },
                },
              },
              CtctDtls: { MobNb: '17039811904' },
            },
            CdtrAcct: {
              Id: { Othr: { Id: '17039811904', SchmeNm: { Prtry: 'MSISDN' } } },
              Nm: 'undefined undefined',
            },
            Purp: { Cd: 'MP2P' },
            RgltryRptg: { Dtls: { Cd: '100', Tp: 'BALANCE OF PAYMENTS' } },
            RmtInf: { Ustrd: 'test' },
            SplmtryData: {
              Envlp: {
                Doc: {
                  Dbtr: {
                    FrstNm: 'Firstname-Test',
                    MddlNm: '',
                    LastNm: 'Lastname-Test',
                    MrchntClssfctnCd: '',
                  },
                  Cdtr: {
                    FrstNm: 'Firstname-Test',
                    MddlNm: '',
                    LastNm: 'Lastname-Test',
                    MrchntClssfctnCd: '',
                  },
                  DbtrFinSvcsPrvdrFees: { Amt: 0, Ccy: 'USD' },
                  Xprtn: '',
                },
              },
            },
          },
        },
        SplmtryData: {
          Envlp: {
            Doc: {
              InitgPty: { InitrTp: 'CONSUMER', Glctn: { Lat: '', Long: '' } },
            },
          },
        },
      },
    };
    const result = await sendPain001(payload);
    expect(result.status.toLocaleString()).toMatch('200');
    expect(result.data).toBeDefined();
    expect(result.data.message).toBe('Transaction is valid');
  });

  test('should sendPain013 for PAYER result is VALID', async () => {
    const payload: Pain013 = {
      TxTp: 'pain.013.001.09',
      CdtrPmtActvtnReq: {
        GrpHdr: {
          MsgId: 'be61c34890ab-4038-81d7-a4ea30e2b498',
          CreDtTm: '2022-06-05T18:57:23.219Z',
          NbOfTxs: 1,
          InitgPty: {
            Nm: 'Firstname-Test Lastname-Test',
            Id: {
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt: '1984-01-01',
                  CityOfBirth: 'Unknown',
                },
                Othr: { Id: '17039811903', SchmeNm: { Prtry: 'MSISDN' } },
              },
            },
            CtctDtls: { MobNb: '+1-7039811903' },
          },
        },
        PmtInf: {
          PmtInfId: '0a3e0da076c9-4e27-8f22-0c6c5382b6f9',
          PmtMtd: 'TRA',
          ReqdAdvcTp: {
            DbtAdvc: { Cd: 'ADWD', Prtry: 'Advice with transaction details' },
          },
          ReqdExctnDt: { DtTm: '2022-06-05T18:54:49.620Z' },
          XpryDt: { DtTm: '2021-09-03T08:06:02.012Z' },
          Dbtr: {
            Nm: 'Firstname-TestLastname-Test',
            Id: {
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt: '1984-01-01',
                  CityOfBirth: 'Unknown',
                },
                Othr: { Id: '17039811903', SchmeNm: { Prtry: 'MSISDN' } },
              },
            },
            CtctDtls: { MobNb: '+1-7039811903' },
          },
          DbtrAcct: {
            Id: { Othr: { Id: '17039811903', SchmeNm: { Prtry: 'MSISDN' } } },
            Nm: 'Firstname-Test Lastname-Test',
          },
          DbtrAgt: { FinInstnId: { ClrSysMmbId: { MmbId: 'testfsp1' } } },
          CdtTrfTxInf: {
            PmtId: { EndToEndId: '2f16297c-6eee-41ac-92c7-645e591637c7' },
            PmtTpInf: { CtgyPurp: { Prtry: 'TRANSFER' } },
            Amt: {
              InstdAmt: { Amt: { Amt: 60.1234, Ccy: 'USD' } },
              EqvtAmt: { Amt: { Amt: 60.1234, Ccy: 'USD' }, CcyOfTrf: 'USD' },
            },
            ChrgBr: 'DEBT',
            CdtrAgt: { FinInstnId: { ClrSysMmbId: { MmbId: 'testfsp2' } } },
            Cdtr: {
              Nm: 'undefined undefined undefined',
              Id: {
                PrvtId: {
                  DtAndPlcOfBirth: {
                    BirthDt: '1984-01-01',
                    CityOfBirth: 'Unknown',
                  },
                  Othr: { Id: '17039811904', SchmeNm: { Prtry: 'MSISDN' } },
                },
              },
              CtctDtls: { MobNb: '17039811904' },
            },
            CdtrAcct: {
              Id: { Othr: { Id: '17039811904', SchmeNm: { Prtry: 'MSISDN' } } },
              Nm: 'undefined undefined',
            },
            Purp: { Cd: 'MP2P' },
            RgltryRptg: { Dtls: { Cd: '100', Tp: 'BALANCE OF PAYMENTS' } },
            SplmtryData: {
              Envlp: {
                Doc: {
                  PyeeRcvAmt: { Amt: { Amt: 60.1234, Ccy: 'USD' } },
                  PyeeFinSvcsPrvdrFee: { Amt: { Amt: 3, Ccy: 'USD' } },
                  PyeeFinSvcsPrvdrComssn: { Amt: { Amt: 3, Ccy: 'USD' } },
                },
              },
            },
          },
        },
        SplmtryData: {
          Envlp: { Doc: { InitgPty: { Glctn: { Lat: '', Long: '' } } } },
        },
      },
    };
    const result: Context = await sendPain013(payload);
    expect(result.data).toBeDefined();
    expect(result.status.toLocaleString()).toMatch('200');
    expect(result.data.message).toBe('Transaction is valid');
  });

  test('should sendPacs002 for PAYER result is VALID', async () => {
    const payload: Pacs002 = {
      TxTp: 'pacs.002.001.12',
      FIToFIPmtSts: {
        GrpHdr: {
          MsgId: '0706324256bc43119e292b9a4cbb2d1b',
          CreDtTm: '2022-03-01T12:26:35.000Z',
        },
        TxInfAndSts: {
          OrgnlInstrId: '5ab4fc7355de4ef8a75b78b00a681ed2',
          OrgnlEndToEndId: '2c516801007642dfb892944dde1cf845',
          TxSts: 'ACCC',
          ChrgsInf: [
            {
              Amt: { Amt: 307.14, Ccy: 'USD' },
              Agt: { FinInstnId: { ClrSysMmbId: { MmbId: 'dfsp001' } } },
            },
            {
              Amt: { Amt: 153.57, Ccy: 'USD' },
              Agt: { FinInstnId: { ClrSysMmbId: { MmbId: 'dfsp001' } } },
            },
            {
              Amt: { Amt: 30.71, Ccy: 'USD' },
              Agt: { FinInstnId: { ClrSysMmbId: { MmbId: 'dfsp002' } } },
            },
          ],
          AccptncDtTm: '2022-03-01T12:26:34.000Z',
          InstgAgt: { FinInstnId: { ClrSysMmbId: { MmbId: 'dfsp001' } } },
          InstdAgt: { FinInstnId: { ClrSysMmbId: { MmbId: 'dfsp002' } } },
        },
      },
    };
    const result: Context = await sendPacs002(payload);
    expect(result.status.toLocaleString()).toMatch('200');
    expect(result.data).toBeDefined();
    expect(result.data.message).toBe('Transaction is valid');
  });

  test('should sendPacs008 for PAYER result is VALID', async () => {
    const payload: Pacs008 = {
      TxTp: 'pacs.008.001.10',
      FIToFICstmrCdt: {
        GrpHdr: {
          MsgId: '92661a5729a7-4b22-a3f9-bef6c3210aa3',
          CreDtTm: '2022-06-05T18:57:32.901Z',
          NbOfTxs: 1,
          SttlmInf: { SttlmMtd: 'CLRG' },
        },
        CdtTrfTxInf: {
          PmtId: {
            InstrId: '0a3e0da076c9-4e27-8f22-0c6c5382b6f9',
            EndToEndId: '87d2437a8caa42ba9f7f5d12b809dbb1',
          },
          IntrBkSttlmAmt: { Amt: { Amt: 60.1234, Ccy: 'USD' } },
          InstdAmt: { Amt: { Amt: 60.1234, Ccy: 'USD' } },
          ChrgBr: 'DEBT',
          ChrgsInf: {
            Amt: { Amt: 60.1234, Ccy: 'USD' },
            Agt: {
              FinInstnId: { ClrSysMmbId: { MmbId: 'testingtoolkitdfsp' } },
            },
          },
          InitgPty: {
            Nm: 'Firstname-Test Lastname-Test',
            Id: {
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt: '1984-01-01',
                  CtryOfBirth: 'ZZ',
                  CityOfBirth: 'Unknown',
                },
                Othr: { Id: '17039811903', SchmeNm: { Prtry: 'MSISDN' } },
              },
            },
            CtctDtls: { MobNb: '+1-7039811903' },
          },
          Dbtr: {
            Nm: 'Firstname-TestLastname-Test',
            Id: {
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt: '1984-01-01',
                  CityOfBirth: 'Unknown',
                  CtryOfBirth: 'ZZ',
                },
                Othr: { Id: '17039811903', SchmeNm: { Prtry: 'MSISDN' } },
              },
            },
            CtctDtls: { MobNb: '+1-7039811903' },
          },
          DbtrAcct: {
            Id: { Othr: { Id: '17039811903', SchmeNm: { Prtry: 'MSISDN' } } },
            Nm: 'Firstname-Test Lastname-Test',
          },
          DbtrAgt: {
            FinInstnId: { ClrSysMmbId: { MmbId: 'testingtoolkitdfsp' } },
          },
          CdtrAgt: { FinInstnId: { ClrSysMmbId: { MmbId: 'payeefsp' } } },
          Cdtr: {
            Nm: 'undefined undefined undefined',
            Id: {
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt: '1984-01-01',
                  CityOfBirth: 'Unknown',
                  CtryOfBirth: 'ZZ',
                },
                Othr: { Id: '17039811904', SchmeNm: { Prtry: 'MSISDN' } },
              },
            },
            CtctDtls: { MobNb: '+1-7039811904' },
          },
          CdtrAcct: {
            Id: { Othr: { Id: '17039811904', SchmeNm: { Prtry: 'MSISDN' } } },
            Nm: 'undefined undefined',
          },
          Purp: { Cd: 'MP2P' },
        },
        RgltryRptg: { Dtls: { Cd: '100', Tp: 'BALANCE OF PAYMENTS' } },
        RmtInf: { Ustrd: '' },
        SplmtryData: { Envlp: { Doc: { Xprtn: '2021-09-02T08:02:12.839Z' } } },
      },
    };
    const result: Context = await sendPacs008(payload);
    expect(result.data).toBeDefined();
    expect(result.status.toLocaleString()).toMatch('200');
  });
});

describe('test health functions', () => {
  test('should healtcheck return UP', () => {
    const ctx = {
      body: {
        status: 'DOWN',
      },
    };

    const ctxTest = healthcheck(ctx as Context);

    expect(ctxTest.body).toMatchObject({
      status: 'UP',
    });
  });
});
