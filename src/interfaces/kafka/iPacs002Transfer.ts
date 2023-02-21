interface GrpHdr {
  MsgId: string;
  CreDtTm: string;
}

interface Amt {
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
  Amt: Amt;
  Agt: Agt;
}

interface InstgAgt {
  FinInstnId: FinInstnId;
}

interface InstdAgt {
  FinInstnId: FinInstnId;
}

interface TxInfAndSts {
  OrgnlInstrId: string;
  OrgnlEndToEndId: string;
  TxSts: string;
  ChrgsInf: ChrgsInf[];
  AccptncDtTm: string;
  InstgAgt: InstgAgt;
  InstdAgt: InstdAgt;
}

interface FIToFIPmtSts {
  GrpHdr: GrpHdr;
  TxInfAndSts: TxInfAndSts;
}

export interface Pacs002 {
  TxTp: string;
  FIToFIPmtSts: FIToFIPmtSts;
}
