import { TimeLeftProps } from "..";

export interface OddsProps {
  top: boolean;
  blur: boolean;
  match: any;
  setSelectedMatchId: (val: string) => void;
}

export interface UpcomingsProps {
  match: any;
  timeLeft: TimeLeftProps;
  upcoming: boolean;
}

export interface TeamRowProps {
  teamName: string;
  match: any;
  runnerPosition: number;
}

export interface MatchRatesCommonCompProps {
  runnerPosition: number;
  match: any;
}

export interface MobileGameListProps {
  handleModal: (val: any) => void;
}

export interface CasinoModalProps {
  setShow: (val: boolean) => void;
}
