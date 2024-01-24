import React, { useEffect } from "react";

import { Box } from "@mui/material";



import MarketOdds from "./MarketOdds";

// import SessionMarket from "./SessionOdds/SessionMarket";
import { memo } from "react";

import { useState } from "react";
import moment from "moment-timezone";
// import QuickSessionMarket from "./SessionOdds/QuickSessionMarket";
import { useLocation } from "react-router-dom";
import QuickSessionMarket from "../QuickSession/QuickSessionMarket";
import SessionMarket from "../SessionOdds/SessionMarket";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { MatchType } from "../../../utils/enum";
import { useDispatch } from "react-redux";
import { matchDetailAction } from "../../../store/actions/match/matchListAction";



interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds?: string;
}
const MatchOdds = ({
  data,

  
}: any) => {
  //   const { manualBookMarkerRates, quickBookmaker } = useSelector(
  //     (state) => state?.matchDetails
  //   );
  const [matchOddsData, setMatchOddsData] = useState([]);
  const [bookMakerRateLive, setBookMakerRateLive] = useState(false);
  const [matchOddRateLive, setMatchOddRateLive] = useState(false);
  const [localQuickBookmaker, setLocalQuickBookmaker] = useState([]);
  const [bookmakerHttp, setBookmakerHttp] = useState([]);
  const [manualSessions, setManualSessions] = useState([]);
  const [sessionExposerHttp, setSessionExposerHttp] = useState([])
  const location = useLocation();



  function calculateTimeLeft(): TimeLeft {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const targetDate = moment(data?.startAt).tz(timezone);
    const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
    let timeLeft: TimeLeft = {
      days: "",
      hours: "",
      minutes: ""
    }; // Initialize with the defined type

    if (difference > 0) {
      timeLeft = {
        days: ("0" + Math.floor(difference / (1000 * 60 * 60 * 24))).slice(-2) || "00",
        hours: ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(-2) || "00",
        minutes: ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2) || "00",
        seconds: ("0" + Math.floor((difference / 1000) % 60)).slice(-2) || "00",
      };
    } else {
      timeLeft = {
        days: "00",
        hours: "00",
        minutes: "00",
      };
    }

    return timeLeft;
  }



  // const upcoming = Number(timeLeft.days) === 0 && Number(timeLeft.hours) === 0 && Number(timeLeft.minutes) <= 10;

  const dispatch: AppDispatch = useDispatch()
  const { state } = useLocation()
  const { matchDetails } = useSelector(
    (state: RootState) => state.match.matchList
  );

  // useEffect(() => {
  //   if (state?.matchId) {
  //     dispatch(matchDetailAction(state?.matchId))
  //   }

  // }, [state?.matchId])
  const timeLeft = calculateTimeLeft();

  { console.log(matchDetails?.bookmaker.name) }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>


      {matchDetails?.matchOdd?.isActive && (

        <MarketOdds

        title={matchDetails?.matchOdd.name}

        />

      )}

      {matchDetails?.quickBookmaker?.map((item: any, index: number) => (
        <MarketOdds
          key={item.id}
          title={item?.name}
        />

      ))}


      {matchDetails?.bookmaker && (
        <MarketOdds
          // key={id}
          title={matchDetails?.bookmaker.name}

        />

      )}


      <MarketOdds
  title={"tied_match"}


      />
       <MarketOdds
        title={"tied_manual"}
      />
       <MarketOdds
        title={"complete_match"}
      />

      {console.log(matchDetails?.quickBookmaker?.name)}
      <>
        {/* {matchDetails?.quickBookmaker.length > 0 &&
          matchDetails?.quickBookmaker?.map(
            (item: any, index: number) => (
              <div key={index}>
                {item?.isActive && ( */}

        <QuickSessionMarket

        />
        {/* )}
              </div>
            )
          )} */}
      </>

      <>
        <SessionMarket

        />
      </>

    </Box>
  );
};

export default memo(MatchOdds);
