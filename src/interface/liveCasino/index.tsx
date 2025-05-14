export interface LiveCasinoTabProps {
  data2: any;
  type2: string;
  setGame: (val: any) => void;
  setType2: (val: any) => void;
}

export interface LiveCasinoGamesProps {
  data3: any;
  handleGame: (val: any) => void;
  width: string;
  gap: string;
}

export interface LiveCasinoModalProps {
  isShow: boolean;
  setIsShow: (val: boolean) => void;
}