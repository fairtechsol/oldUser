export interface User {
  id: string;
  userName: string;
}

export interface Match {
  id: string;
  title: string;
  startAt: string;
}

export interface Bet {
  id: string;
  createdAt: string;
  result: "PENDING" | "WON" | "LOST";
  teamName: string;
  amount: number;
  odds: number;
  winAmount: number;
  lossAmount: number;
  betType: "BACK" | "LAY";
  rate: number;
  marketType: string;
  marketBetType: string;
  deleteReason: string | null;
  ipAddress: string;
  browserDetail: string;
  eventName: string;
  eventType: string;
  bettingName: string;
  runnerId: string;
  isCommissionActive: boolean;
  user: User;
  match: Match;
}
