interface DtAndPlcOfBirth {
  BirthDt: string;
  CityOfBirth: string;
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

interface GrpHdr {
  MsgId: string;
  CreDtTm: string;
  NbOfTxs: number;
  InitgPty: InitgPty;
}

interface DbtAdvc {
  Cd: string;
  Prtry: string;
}

interface ReqdAdvcTp {
  DbtAdvc: DbtAdvc;
}

interface ReqdExctnDt {
  DtTm: string;
}

interface XpryDt {
  DtTm: string;
}

interface DtAndPlcOfBirth2 {
  BirthDt: string;
  CityOfBirth: string;
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

interface ClrSysMmbId {
  MmbId: string;
}

interface FinInstnId {
  ClrSysMmbId: ClrSysMmbId;
}

interface DbtrAgt {
  FinInstnId: FinInstnId;
}

interface PmtId {
  EndToEndId: string;
}

interface CtgyPurp {
  Prtry: string;
}

interface PmtTpInf {
  CtgyPurp: CtgyPurp;
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

interface EqvtAmt {
  Amt: Amt3;
  CcyOfTrf: string;
}

interface Amt {
  InstdAmt: InstdAmt;
  EqvtAmt: EqvtAmt;
}

interface ClrSysMmbId2 {
  MmbId: string;
}

interface FinInstnId2 {
  ClrSysMmbId: ClrSysMmbId2;
}

interface CdtrAgt {
  FinInstnId: FinInstnId2;
}

interface DtAndPlcOfBirth3 {
  BirthDt: string;
  CityOfBirth: string;
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

interface Dtls {
  Tp: string;
  Cd: string;
}

interface RgltryRptg {
  Dtls: Dtls;
}

interface Amt4 {
  Amt: number;
  Ccy: string;
}

interface PyeeRcvAmt {
  Amt: Amt4;
}

interface Amt5 {
  Amt: number;
  Ccy: string;
}

interface PyeeFinSvcsPrvdrFee {
  Amt: Amt5;
}

interface Amt6 {
  Amt: number;
  Ccy: string;
}

interface PyeeFinSvcsPrvdrComssn {
  Amt: Amt6;
}

interface Doc {
  PyeeRcvAmt: PyeeRcvAmt;
  PyeeFinSvcsPrvdrFee: PyeeFinSvcsPrvdrFee;
  PyeeFinSvcsPrvdrComssn: PyeeFinSvcsPrvdrComssn;
}

interface Envlp {
  Doc: Doc;
}

interface SplmtryData {
  Envlp: Envlp;
}

interface CdtTrfTxInf {
  PmtId: PmtId;
  PmtTpInf: PmtTpInf;
  Amt: Amt;
  ChrgBr: string;
  CdtrAgt: CdtrAgt;
  Cdtr: Cdtr;
  CdtrAcct: CdtrAcct;
  Purp: Purp;
  RgltryRptg: RgltryRptg;
  SplmtryData: SplmtryData;
}

interface PmtInf {
  PmtInfId: string;
  PmtMtd: string;
  ReqdAdvcTp: ReqdAdvcTp;
  ReqdExctnDt: ReqdExctnDt;
  XpryDt: XpryDt;
  Dbtr: Dbtr;
  DbtrAcct: DbtrAcct;
  DbtrAgt: DbtrAgt;
  CdtTrfTxInf: CdtTrfTxInf;
}

interface Glctn {
  Lat: string;
  Long: string;
}

interface InitgPty2 {
  Glctn: Glctn;
}

interface Doc2 {
  InitgPty: InitgPty2;
}

interface Envlp2 {
  Doc: Doc2;
}

interface SplmtryData2 {
  Envlp: Envlp2;
}

interface CdtrPmtActvtnReq {
  GrpHdr: GrpHdr;
  PmtInf: PmtInf;
  SplmtryData: SplmtryData2;
}

export interface Pain013 {
  TxTp: string;
  CdtrPmtActvtnReq: CdtrPmtActvtnReq;
}
