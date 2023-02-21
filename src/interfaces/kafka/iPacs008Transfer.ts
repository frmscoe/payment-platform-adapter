interface SttlmInf {
  SttlmMtd: string;
}

interface GrpHdr {
  MsgId: string;
  CreDtTm: string;
  NbOfTxs: number;
  SttlmInf: SttlmInf;
}

interface PmtId {
  InstrId: string;
  EndToEndId: string;
}

interface Amt {
  Amt: number;
  Ccy: string;
}

interface IntrBkSttlmAmt {
  Amt: Amt;
}

interface Amt2 {
  Amt: number;
  Ccy: string;
}

interface InstdAmt {
  Amt: Amt2;
}

interface Amt3 {
  Amt: number;
  Ccy: string;
}

interface ClrSysMmbId {
  MmbId: string;
}

interface FinInstnId {
  ClrSysMmbId: ClrSysMmbId;
}

interface Agt {
  FinInstnId: FinInstnId;
}

interface ChrgsInf {
  Amt: Amt3;
  Agt: Agt;
}

interface DtAndPlcOfBirth {
  BirthDt: string;
  CityOfBirth: string;
  CtryOfBirth: string;
}

interface SchmeNm {
  Prtry: string;
}

interface Othr {
  Id: string;
  SchmeNm: SchmeNm;
}

interface PrvtId {
  DtAndPlcOfBirth: DtAndPlcOfBirth;
  Othr: Othr;
}

interface Id {
  PrvtId: PrvtId;
}

interface CtctDtls {
  MobNb: string;
}

interface InitgPty {
  Nm: string;
  Id: Id;
  CtctDtls: CtctDtls;
}

interface DtAndPlcOfBirth2 {
  BirthDt: string;
  CityOfBirth: string;
  CtryOfBirth: string;
}

interface SchmeNm2 {
  Prtry: string;
}

interface Othr2 {
  Id: string;
  SchmeNm: SchmeNm2;
}

interface PrvtId2 {
  DtAndPlcOfBirth: DtAndPlcOfBirth2;
  Othr: Othr2;
}

interface Id2 {
  PrvtId: PrvtId2;
}

interface CtctDtls2 {
  MobNb: string;
}

interface Dbtr {
  Nm: string;
  Id: Id2;
  CtctDtls: CtctDtls2;
}

interface SchmeNm3 {
  Prtry: string;
}

interface Othr3 {
  Id: string;
  SchmeNm: SchmeNm3;
}

interface Id3 {
  Othr: Othr3;
}

interface DbtrAcct {
  Id: Id3;
  Nm: string;
}

interface ClrSysMmbId2 {
  MmbId: string;
}

interface FinInstnId2 {
  ClrSysMmbId: ClrSysMmbId2;
}

interface DbtrAgt {
  FinInstnId: FinInstnId2;
}

interface ClrSysMmbId3 {
  MmbId: string;
}

interface FinInstnId3 {
  ClrSysMmbId: ClrSysMmbId3;
}

interface CdtrAgt {
  FinInstnId: FinInstnId3;
}

interface DtAndPlcOfBirth3 {
  BirthDt: string;
  CityOfBirth: string;
  CtryOfBirth: string;
}

interface SchmeNm4 {
  Prtry: string;
}

interface Othr4 {
  Id: string;
  SchmeNm: SchmeNm4;
}

interface PrvtId3 {
  DtAndPlcOfBirth: DtAndPlcOfBirth3;
  Othr: Othr4;
}

interface Id4 {
  PrvtId: PrvtId3;
}

interface CtctDtls3 {
  MobNb: string;
}

interface Cdtr {
  Nm: string;
  Id: Id4;
  CtctDtls: CtctDtls3;
}

interface SchmeNm5 {
  Prtry: string;
}

interface Othr5 {
  Id: string;
  SchmeNm: SchmeNm5;
}

interface Id5 {
  Othr: Othr5;
}

interface CdtrAcct {
  Id: Id5;
  Nm: string;
}

interface Purp {
  Cd: string;
}

interface CdtTrfTxInf {
  PmtId: PmtId;
  IntrBkSttlmAmt: IntrBkSttlmAmt;
  InstdAmt: InstdAmt;
  ChrgBr: string;
  ChrgsInf: ChrgsInf;
  InitgPty: InitgPty;
  Dbtr: Dbtr;
  DbtrAcct: DbtrAcct;
  DbtrAgt: DbtrAgt;
  CdtrAgt: CdtrAgt;
  Cdtr: Cdtr;
  CdtrAcct: CdtrAcct;
  Purp: Purp;
}

interface Dtls {
  Tp: string;
  Cd: string;
}

interface RgltryRptg {
  Dtls: Dtls;
}

interface RmtInf {
  Ustrd: string;
}

interface Doc {
  Xprtn: string;
}

interface Envlp {
  Doc: Doc;
}

interface SplmtryData {
  Envlp: Envlp;
}

interface FIToFICstmrCdt {
  GrpHdr: GrpHdr;
  CdtTrfTxInf: CdtTrfTxInf;
  RgltryRptg: RgltryRptg;
  RmtInf: RmtInf;
  SplmtryData: SplmtryData;
}

export interface Pacs008 {
  TxTp: string;
  FIToFICstmrCdt: FIToFICstmrCdt;
}
