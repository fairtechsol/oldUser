export interface LiveScoreBoardProps {
  data: any;
  width: string;
  setIsTv: (val: any) => void;
}

export interface LiveMatchHomeProps {
  eventId: string | number;
}

export interface MatchOddsProps {
  matchDetails: any;
  setShow: (val: any) => void;
  show: any;
}

export interface TournamentOddsProps {
  teamARates: string | number | any;
  teamBRates: string | number | any;
  title: string;
  min: string | number;
  max: string | number;
  showBox: boolean;
  isRound: boolean;
  betLock: boolean;
  upcoming: boolean;
  marketDetails: any;
  matchDetails: any;
}

export interface BookRatioBoxProps {
  valueA: number | any;
  valueB: number | any;
}

export interface BoxComponentProps {
  name: string;
  color: string;
  data: any;
  rate: number | string;
  matchDetails: any;
  showBox: boolean;
  isRound: boolean;
  marketDetails: any;
  upcoming: boolean;
  show6Box: boolean;
}

export interface SeparateModalProps {
  color: string;
  po: number;
  value: any;
  value2: any;
  lock: boolean;
  type: any;
  data: any;
  betType: string;
  marketDetails: any;
  upcoming: boolean;
  mid: number | string;
  matchDetails: any;
  selectionId: string;
  show6Box: boolean;
  lastIndex?: boolean;
}

export interface OddsPlaceBetProps {
  handleClose: () => void;
  type: any;
}

export interface PlaceBetMoneyBoxProps {
  color: string;
  trendingDown?: boolean;
  trendingUp?: boolean;
  rate: string | number;
}

export interface TeamsOdssDataProps {
  input?: boolean;
  title: string;
  value: string;
  containerStyle: any;
  valueContainerStyle: any;
}

export interface BoxInputProps {
  title: string;
  stakeValue: string | number;
  containerStyle: any;
  setStakeValue: (val: any) => void;
  selectedColorBox: string;
}

export interface NumberDataProps {
  value: any;
  containerStyle: any;
  setStakeValue: (val: any) => void;
  selectedBetAction: (val: any) => void;
}

export interface QuickSessionMarketProps {
  newData: any[];
  allBetsData: any[];
  session: any;
  upcoming: boolean;
  title: string;
  minBet: number | string;
  typeOfBet: string | null | undefined | any;
  eventType: string | null | undefined;
  setShow: (val: any) => void;
  matchDetails?: any;
  show: any;
}

export interface SmallBoxSeasonProps {
  allBetsData: any;
}

export interface QuickSessionMarketBoxProps {
  index: number;
  typeOfBet: string;
  data: any;
  sessionMain: any;
  setFastAmount?: (val: any) => void;
  setShowFastTimeBox: (val: any) => void;
  showFastTimeBox: boolean;
  upcoming: boolean;
  fastAmount?: number;
  selectedItem?: string | null | undefined;
  eventType: string | null | undefined;
  profitLossData: any[] | null | undefined;
  show?: boolean;
  setShow: (val: any) => void;
}

export interface PlaceBetComponentProps {
  profitLoss: any;
  data: any;
  show: { open: boolean; id: string } | any;
  setShow: (val: any) => void;
  hideCount?: boolean;
  index?: number | any;
}

export interface PlaceBetComponentWebProps {
  profitLoss: any;
  data: any;
  show: { open: boolean; id: string } | any;
  setShow: (val: any) => void;
  hideCount?: boolean;
  index?: number | any;
}

export interface RunsDropDownProps {
  list: any;
}