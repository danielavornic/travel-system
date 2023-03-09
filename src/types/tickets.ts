export enum TicketType {
  OneWay = "one-way",
  Return = "return",
}

export enum TicketMode {
  Flight = "flight",
  Train = "train",
  Bus = "bus",
}

export enum TicketPaxType {
  Adult = "paxadult",
  Child = "paxchild",
}

export interface Ticket {
  oName: string;
  dName: string;
  oDateTime: string;
  iDateTime: string;
  mode: TicketMode;
  isTimeManuallySet?: boolean;
  currencyCode: string;
  languageCode: string;
  paxTypes: TicketPaxType;
  paxAges: string;
  paxCards: string;
  uid: string;
  aqid: string;
}
