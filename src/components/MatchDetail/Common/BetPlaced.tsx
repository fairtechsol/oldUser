import { useEffect, useState } from "react";
import CountDownTimer from "./CountDownTimer";

interface BetPlacedProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  not?: boolean;
  time?: number;
}

const BetPlaced = ({ visible, setVisible, not, time }: BetPlacedProps) => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (visible && !not && time) {
      setTimeout(
        () => {
          setFlag(true);
        },
        !time ? 1000 : 5000
      );
    } else {
      setFlag(false);
    }
    if (visible && !flag) {
      setTimeout(
        () => {
          setVisible(false);
        },
        not || !time ? 1000 : 6200
      );
    }
  }, [visible]);
  if (!flag && visible && time) {
    return <CountDownTimer visible={true} setVisible={setFlag} time={time} />;
  }
};
export default BetPlaced;
