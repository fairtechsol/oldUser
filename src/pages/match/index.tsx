
import { memo, useEffect, useState } from "react";

import Match from "../../components/MatchDetail/MatchOdds/Match";
import MatchDetail from "../matchDetail";
import MyAccount from "../myAccount";
import { useLocation } from "react-router-dom";
import ProfitLoss from "../reports/ProfitLoss";



const Matches = () => {
  const location = useLocation();

  const [selected, setSelected] = useState(
    location.state?.activeTab || "CRICKET"
  );

  useEffect(() => {
    if (location.state?.activeTab) {
      setSelected(location.state?.activeTab);
    }
  }, [location.state?.activeTab]);

  return (
    <>
       {/* {["INPLAY", "CRICKET"].includes(selected) &&
              window.location.pathname !== "/matchDetail" && ( */}
      <Match/>
              {/* )} */}
      {/* <MatchDetail/> */}
      {window.location.pathname === "/matchDetail" && (
        <MatchDetail />
      )}
       {window.location.pathname === "/my-account" && (
      <MyAccount />
       )}
        { window.location.pathname === "/profit_loss" && (
                <ProfitLoss/>
              )}
    </>
  );
};
export default memo(Matches);
