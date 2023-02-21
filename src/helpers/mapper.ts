/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { v4 } from 'uuid';
import { Pacs002 } from '../interfaces/kafka/iPacs002Transfer';
import { Pacs008 } from '../interfaces/kafka/iPacs008Transfer';
import { Pain001 } from '../interfaces/kafka/iPain001Quote';
import { Pain013 } from '../interfaces/kafka/iPain013Quote';
import { toMobileNumber } from './numberConverter';

const eventToPain001 = (data: any): Pain001 => {
  const dateNow = new Date().toISOString();
  const payerInitgPty = {
    Nm: `${data.payer?.personalInfo?.complexName?.firstName ?? ''} ${
      data.payer?.personalInfo?.complexName?.lastName ?? ''
    }`,
    Id: {
      PrvtId: {
        DtAndPlcOfBirth: {
          BirthDt: data.payer?.personalInfo?.dateOfBirth ?? '0000-01-01',
          CityOfBirth: 'Unknown',
        },
        Othr: {
          Id: data.payer?.partyIdInfo?.partyIdentifier ?? '',
          SchmeNm: {
            Prtry: data.payer?.partyIdInfo?.partyIdType ?? '',
          },
        },
      },
    },
    CtctDtls: {
      MobNb: toMobileNumber(data.payer?.partyIdInfo?.partyIdentifier),
    },
  };

  const payeeInitgPty = {
    Nm: `${data.payee?.personalInfo?.complexName?.firstName ?? ''} ${
      data.payee?.personalInfo?.complexName?.lastName ?? ''
    }`,
    Id: {
      PrvtId: {
        DtAndPlcOfBirth: {
          BirthDt: data.payee?.personalInfo?.dateOfBirth ?? '1970-01-01',
          CityOfBirth: 'Unknown',
        },
        Othr: {
          Id: data.payee?.partyIdInfo?.partyIdentifier ?? '',
          SchmeNm: {
            Prtry: data.payee?.partyIdInfo?.partyIdType ?? '',
          },
        },
      },
    },
    CtctDtls: {
      MobNb: toMobileNumber(data.payee?.partyIdInfo?.partyIdentifier),
    },
  };
  return {
    TxTp: 'pain.001.001.11',
    CstmrCdtTrfInitn: {
      GrpHdr: {
        MsgId: v4().replace('-', ''),
        CreDtTm: dateNow,
        NbOfTxs: 1,
        InitgPty:
          data.transactionType.initiator === 'PAYER'
            ? payerInitgPty
            : payeeInitgPty,
      },
      PmtInf: {
        PmtInfId: data.quoteId.replace('-', ''),
        PmtMtd: 'TRA',
        ReqdAdvcTp: {
          DbtAdvc: {
            Cd: 'ADWD',
            Prtry: 'Advice with transaction details',
          },
        },
        ReqdExctnDt: {
          Dt: dateNow.slice(0, dateNow.indexOf('T')),
          DtTm: dateNow,
        },
        Dbtr: {
          Nm: `${data.payer?.personalInfo?.complexName?.firstName ?? ''} ${
            data.payer?.personalInfo?.complexName?.middleName ?? ''
          } ${data.payer?.personalInfo?.complexName?.lastName ?? ''}`,
          Id: {
            PrvtId: {
              DtAndPlcOfBirth: {
                BirthDt: data.payer.personalInfo.dateOfBirth,
                CityOfBirth: 'Unknown',
              },
              Othr: {
                Id: data.payer.partyIdInfo.partyIdentifier,
                SchmeNm: {
                  Prtry: data.payer.partyIdInfo.partyIdType,
                },
              },
            },
          },
          CtctDtls: {
            MobNb: toMobileNumber(data.payer.partyIdInfo.partyIdentifier),
          },
        },
        DbtrAcct: {
          Id: {
            Othr: {
              Id: data.payer.partyIdInfo.partyIdentifier,
              SchmeNm: {
                Prtry: data.payer.partyIdInfo.partyIdType,
              },
            },
          },
          Nm: `${data.payer.personalInfo.complexName.firstName} ${data.payer.personalInfo.complexName.lastName}`,
        },
        DbtrAgt: {
          FinInstnId: {
            ClrSysMmbId: {
              MmbId: data.payer.partyIdInfo.fspId,
            },
          },
        },
        CdtTrfTxInf: {
          PmtId: {
            EndToEndId: data.transactionId,
          },
          PmtTpInf: {
            CtgyPurp: {
              Prtry: data.transactionType.scenario,
            },
          },
          Amt: {
            InstdAmt: {
              Amt: {
                Amt: Number(data.amount.amount),
                Ccy: data.amount.currency,
              },
            },
            EqvtAmt: {
              Amt: {
                Amt: Number(data.amount.amount),
                Ccy: data.amount.currency,
              },
              CcyOfTrf: data.amount.currency,
            },
          },
          ChrgBr: 'DEBT',
          CdtrAgt: {
            FinInstnId: {
              ClrSysMmbId: {
                MmbId: data.payee.partyIdInfo.fspId,
              },
            },
          },
          Cdtr: {
            Nm: `${data.payee?.personalInfo?.complexName?.firstName} ${
              data.payee?.personalInfo?.complexName?.middleName ?? ''
            } ${data.payee?.personalInfo?.complexName?.lastName}`,
            Id: {
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt:
                    data.payee?.personalInfo?.dateOfBirth ?? '1970-01-01',
                  CityOfBirth: 'Unknown',
                },
                Othr: {
                  Id: data.payee?.partyIdInfo?.partyIdentifier,
                  SchmeNm: {
                    Prtry: data.payee?.partyIdInfo?.partyIdType,
                  },
                },
              },
            },
            CtctDtls: {
              MobNb: data.payee?.partyIdInfo?.partyIdentifier,
            },
          },
          CdtrAcct: {
            Id: {
              Othr: {
                Id: data.payee?.partyIdInfo?.partyIdentifier,
                SchmeNm: {
                  Prtry: data.payee?.partyIdInfo?.partyIdType,
                },
              },
            },
            Nm: `${data.payee?.personalInfo?.complexName?.firstName} ${data.payee?.personalInfo?.complexName?.lastName}`,
          },
          Purp: {
            Cd: 'MP2P',
          },
          RgltryRptg: {
            Dtls: {
              Cd: data.transactionType?.balanceOfPayments || '100',
              Tp: 'BALANCE OF PAYMENTS',
            },
          },
          RmtInf: {
            Ustrd: data.note,
          },
          SplmtryData: {
            Envlp: {
              Doc: {
                Dbtr: {
                  FrstNm:
                    data.payer?.personalInfo?.complexName?.firstName ?? '',
                  MddlNm:
                    data.payer?.personalInfo?.complexName?.middleName ?? '',
                  LastNm: data.payer?.personalInfo?.complexName?.lastName ?? '',
                  MrchntClssfctnCd:
                    data.payer?.merchantClassificationCode || '',
                },
                Cdtr: {
                  FrstNm:
                    data.payee?.personalInfo?.complexName?.firstName ??
                    'undefined',
                  MddlNm:
                    data.payee?.personalInfo?.complexName?.middleName ?? '',
                  LastNm:
                    data.payee?.personalInfo?.complexName?.lastName ??
                    'undefined',
                  MrchntClssfctnCd:
                    data.payee?.merchantClassificationCode || '',
                },
                DbtrFinSvcsPrvdrFees: {
                  Amt: 0,
                  Ccy: data.amount?.amount?.currency ?? data.amount.currency,
                },
                Xprtn: data.expiration ?? '',
              },
            },
          },
        },
      },
      SplmtryData: {
        Envlp: {
          Doc: {
            InitgPty: {
              InitrTp: data.transactionType.initiatorType,
              Glctn: {
                Lat: '',
                Long: '',
              },
            },
          },
        },
      },
    },
  };
};

const eventToPain013 = (
  data: any,
  pain001: Pain001,
  quoteId: string,
): Pain013 => {
  const dateNow = new Date().toISOString();
  return {
    TxTp: 'pain.013.001.09',
    CdtrPmtActvtnReq: {
      GrpHdr: {
        MsgId: v4().replace('-', ''),
        CreDtTm: dateNow,
        NbOfTxs: 1,
        InitgPty: {
          Nm: pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.Nm,
          Id: {
            PrvtId: {
              DtAndPlcOfBirth: {
                BirthDt:
                  pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.Id.PrvtId
                    .DtAndPlcOfBirth.BirthDt,
                CityOfBirth:
                  pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.Id.PrvtId
                    .DtAndPlcOfBirth.CityOfBirth,
              },
              Othr: {
                Id: pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.Id.PrvtId.Othr.Id,
                SchmeNm: {
                  Prtry:
                    pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.Id.PrvtId.Othr
                      .SchmeNm.Prtry,
                },
              },
            },
          },
          CtctDtls: {
            MobNb: pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.CtctDtls.MobNb,
          },
        },
      },
      PmtInf: {
        PmtInfId: quoteId,
        PmtMtd: pain001.CstmrCdtTrfInitn.PmtInf.PmtMtd,
        ReqdAdvcTp: {
          DbtAdvc: {
            Cd: pain001.CstmrCdtTrfInitn.PmtInf.ReqdAdvcTp.DbtAdvc.Cd,
            Prtry: pain001.CstmrCdtTrfInitn.PmtInf.ReqdAdvcTp.DbtAdvc.Prtry,
          },
        },
        ReqdExctnDt: {
          DtTm: pain001.CstmrCdtTrfInitn.PmtInf.ReqdExctnDt.DtTm,
        },
        XpryDt: {
          DtTm: data.expiration,
        },
        Dbtr: {
          Nm: pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.Nm,
          Id: {
            PrvtId: {
              DtAndPlcOfBirth: {
                BirthDt:
                  pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.Id.PrvtId.DtAndPlcOfBirth
                    .BirthDt,
                CityOfBirth:
                  pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.Id.PrvtId.DtAndPlcOfBirth
                    .CityOfBirth,
              },
              Othr: {
                Id: pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.Id.PrvtId.Othr.Id,
                SchmeNm: {
                  Prtry:
                    pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.Id.PrvtId.Othr.SchmeNm
                      .Prtry,
                },
              },
            },
          },
          CtctDtls: {
            MobNb: pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.CtctDtls.MobNb,
          },
        },
        DbtrAcct: {
          Id: {
            Othr: {
              Id: pain001.CstmrCdtTrfInitn.PmtInf.DbtrAcct.Id.Othr.Id,
              SchmeNm: {
                Prtry:
                  pain001.CstmrCdtTrfInitn.PmtInf.DbtrAcct.Id.Othr.SchmeNm
                    .Prtry,
              },
            },
          },
          Nm: pain001.CstmrCdtTrfInitn.PmtInf.DbtrAcct.Nm,
        },
        DbtrAgt: {
          FinInstnId: {
            ClrSysMmbId: {
              MmbId:
                pain001.CstmrCdtTrfInitn.PmtInf.DbtrAgt.FinInstnId.ClrSysMmbId
                  .MmbId,
            },
          },
        },
        CdtTrfTxInf: {
          PmtId: {
            EndToEndId:
              pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.PmtId.EndToEndId,
          },
          PmtTpInf: {
            CtgyPurp: {
              Prtry:
                pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.PmtTpInf.CtgyPurp
                  .Prtry,
            },
          },
          Amt: {
            InstdAmt: {
              Amt: {
                Amt: data.transferAmount.amount,
                Ccy: data.transferAmount.currency,
              },
            },
            EqvtAmt: {
              Amt: {
                Amt: data.transferAmount.amount,
                Ccy: data.transferAmount.currency,
              },
              CcyOfTrf:
                pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Amt.EqvtAmt
                  .CcyOfTrf,
            },
          },
          ChrgBr: 'DEBT',
          CdtrAgt: {
            FinInstnId: {
              ClrSysMmbId: {
                MmbId:
                  pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.CdtrAgt.FinInstnId
                    .ClrSysMmbId.MmbId,
              },
            },
          },
          Cdtr: {
            Nm: pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.Nm,
            Id: {
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt:
                    pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.Id.PrvtId
                      .DtAndPlcOfBirth.BirthDt,
                  CityOfBirth:
                    pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.Id.PrvtId
                      .DtAndPlcOfBirth.CityOfBirth,
                },
                Othr: {
                  Id: pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.Id.PrvtId
                    .Othr.Id,
                  SchmeNm: {
                    Prtry:
                      pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.Id.PrvtId
                        .Othr.SchmeNm.Prtry,
                  },
                },
              },
            },
            CtctDtls: {
              MobNb:
                pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.CtctDtls.MobNb,
            },
          },
          CdtrAcct: {
            Id: {
              Othr: {
                Id: pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.CdtrAcct.Id.Othr
                  .Id,
                SchmeNm: {
                  Prtry:
                    pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.CdtrAcct.Id.Othr
                      .SchmeNm.Prtry,
                },
              },
            },
            Nm: pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.CdtrAcct.Nm,
          },
          Purp: {
            Cd: 'MP2P',
          },
          RgltryRptg: {
            Dtls: {
              Tp: 'BALANCE OF PAYMENTS',
              Cd: pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.RgltryRptg.Dtls
                .Cd,
            },
          },
          SplmtryData: {
            Envlp: {
              Doc: {
                PyeeRcvAmt: {
                  Amt: {
                    Amt: data.transferAmount.amount,
                    Ccy: data.transferAmount.currency,
                  },
                },
                PyeeFinSvcsPrvdrFee: {
                  Amt: {
                    Amt: data.payeeFspCommission?.amount,
                    Ccy: data.payeeFspCommission?.currency,
                  },
                },
                PyeeFinSvcsPrvdrComssn: {
                  Amt: {
                    Amt: data.payeeFspFee?.amount,
                    Ccy: data.payeeFspFee?.currency,
                  },
                },
              },
            },
          },
        },
      },
      SplmtryData: {
        Envlp: {
          Doc: {
            InitgPty: {
              Glctn: {
                Lat: pain001.CstmrCdtTrfInitn.SplmtryData.Envlp.Doc.InitgPty
                  .Glctn.Lat,
                Long: pain001.CstmrCdtTrfInitn.SplmtryData.Envlp.Doc.InitgPty
                  .Glctn.Long,
              },
            },
          },
        },
      },
    },
  };
};

const eventToPacs008 = (data: any, pain001: Pain001): Pacs008 => {
  const dateNow = new Date().toISOString();

  return {
    TxTp: 'pacs.008.001.10',
    FIToFICstmrCdt: {
      GrpHdr: {
        MsgId: v4().replace('-', ''),
        CreDtTm: dateNow,
        NbOfTxs: 1,
        SttlmInf: {
          SttlmMtd: 'CLRG',
        },
      },
      CdtTrfTxInf: {
        PmtId: {
          InstrId: pain001.CstmrCdtTrfInitn.PmtInf.PmtInfId,
          EndToEndId: data.transferId.replace('-', ''),
        },
        IntrBkSttlmAmt: {
          Amt: {
            Amt: Number(data.amount.amount),
            Ccy: data.amount.currency,
          },
        },
        InstdAmt: {
          Amt: {
            Amt: Number(data.amount.amount),
            Ccy: data.amount.currency,
          },
        },
        ChrgBr: 'DEBT',
        ChrgsInf: {
          Amt: {
            Amt: Number(data.amount.amount),
            Ccy: data.amount.currency,
          },
          Agt: {
            FinInstnId: {
              ClrSysMmbId: {
                MmbId: data.payerFsp,
              },
            },
          },
        },
        InitgPty: {
          Nm: pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.Nm,
          Id: {
            PrvtId: {
              DtAndPlcOfBirth: {
                BirthDt:
                  pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.Id.PrvtId
                    .DtAndPlcOfBirth.BirthDt,
                CityOfBirth:
                  pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.Id.PrvtId
                    .DtAndPlcOfBirth.CityOfBirth,
                CtryOfBirth: 'ZZ',
              },
              Othr: {
                Id: pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.Id.PrvtId.Othr.Id,
                SchmeNm: {
                  Prtry:
                    pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.Id.PrvtId.Othr
                      .SchmeNm.Prtry,
                },
              },
            },
          },
          CtctDtls: {
            MobNb: pain001.CstmrCdtTrfInitn.GrpHdr.InitgPty.CtctDtls.MobNb,
          },
        },
        Dbtr: {
          Nm: pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.Nm,
          Id: {
            PrvtId: {
              DtAndPlcOfBirth: {
                BirthDt:
                  pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.Id.PrvtId.DtAndPlcOfBirth
                    .BirthDt,
                CityOfBirth:
                  pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.Id.PrvtId.DtAndPlcOfBirth
                    .CityOfBirth,
                CtryOfBirth: 'ZZ',
              },
              Othr: {
                Id: pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.Id.PrvtId.Othr.Id,
                SchmeNm: {
                  Prtry:
                    pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.Id.PrvtId.Othr.SchmeNm
                      .Prtry,
                },
              },
            },
          },
          CtctDtls: {
            MobNb: toMobileNumber(
              pain001.CstmrCdtTrfInitn.PmtInf.Dbtr.CtctDtls.MobNb,
            ),
          },
        },
        DbtrAcct: {
          Id: {
            Othr: {
              Id: pain001.CstmrCdtTrfInitn.PmtInf.DbtrAcct.Id.Othr.Id,
              SchmeNm: {
                Prtry:
                  pain001.CstmrCdtTrfInitn.PmtInf.DbtrAcct.Id.Othr.SchmeNm
                    .Prtry,
              },
            },
          },
          Nm: pain001.CstmrCdtTrfInitn.PmtInf.DbtrAcct.Nm,
        },
        DbtrAgt: {
          FinInstnId: {
            ClrSysMmbId: {
              MmbId: data.payerFsp,
            },
          },
        },
        CdtrAgt: {
          FinInstnId: {
            ClrSysMmbId: {
              MmbId: data.payeeFsp,
            },
          },
        },
        Cdtr: {
          Nm: pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.Nm,
          Id: {
            PrvtId: {
              DtAndPlcOfBirth: {
                BirthDt:
                  pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.Id.PrvtId
                    .DtAndPlcOfBirth.BirthDt,
                CityOfBirth:
                  pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.Id.PrvtId
                    .DtAndPlcOfBirth.CityOfBirth,
                CtryOfBirth: 'ZZ',
              },
              Othr: {
                Id: pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.Id.PrvtId
                  .Othr.Id,
                SchmeNm: {
                  Prtry:
                    pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.Id.PrvtId
                      .Othr.SchmeNm.Prtry,
                },
              },
            },
          },
          CtctDtls: {
            MobNb: toMobileNumber(
              pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.Cdtr.CtctDtls.MobNb,
            ),
          },
        },
        CdtrAcct: {
          Id: {
            Othr: {
              Id: pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.CdtrAcct.Id.Othr
                .Id,
              SchmeNm: {
                Prtry:
                  pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.CdtrAcct.Id.Othr
                    .SchmeNm.Prtry,
              },
            },
          },
          Nm: pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.CdtrAcct.Nm,
        },
        Purp: {
          Cd: 'MP2P',
        },
      },
      RgltryRptg: {
        Dtls: {
          Tp: 'BALANCE OF PAYMENTS',
          Cd: pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.RgltryRptg.Dtls.Cd,
        },
      },
      RmtInf: {
        Ustrd: '',
      },
      SplmtryData: {
        Envlp: {
          Doc: {
            Xprtn: data.expiration,
          },
        },
      },
    },
  };
};

const eventToPacs002 = (
  data: any,
  pain001: Pain001,
  transactionId: string,
): Pacs002 => {
  const dateNow = new Date().toISOString();

  let TxSts = '';
  if (data.transferState === 'RECEIVED') TxSts = 'RCVD';

  if (data.transferState === 'RESERVED') TxSts = 'ACSC';

  if (data.transferState === 'COMMITTED') TxSts = 'ACCC';

  if (data.transferState === 'ABORTED') TxSts = 'RJCT';

  return {
    TxTp: 'pacs.002.001.12',
    FIToFIPmtSts: {
      GrpHdr: {
        MsgId: v4().replace('-', ''),
        CreDtTm: dateNow,
      },
      TxInfAndSts: {
        OrgnlInstrId: pain001.CstmrCdtTrfInitn.PmtInf.PmtInfId,
        OrgnlEndToEndId: transactionId.replace('-', ''),
        TxSts: TxSts,
        ChrgsInf: [],
        AccptncDtTm: data.completedTimestamp,
        InstgAgt: {
          FinInstnId: {
            ClrSysMmbId: {
              MmbId:
                pain001.CstmrCdtTrfInitn.PmtInf.DbtrAgt.FinInstnId.ClrSysMmbId
                  .MmbId,
            },
          },
        },
        InstdAgt: {
          FinInstnId: {
            ClrSysMmbId: {
              MmbId:
                pain001.CstmrCdtTrfInitn.PmtInf.CdtTrfTxInf.CdtrAgt.FinInstnId
                  .ClrSysMmbId.MmbId,
            },
          },
        },
      },
    },
  };
};

export { eventToPain001, eventToPain013, eventToPacs008, eventToPacs002 };
