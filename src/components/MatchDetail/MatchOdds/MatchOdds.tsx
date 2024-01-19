import React from "react";

import { Box } from "@mui/material";



import MarketOdds from "./MarketOdds";

// import SessionMarket from "./SessionOdds/SessionMarket";
import { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
// import QuickSessionMarket from "./SessionOdds/QuickSessionMarket";
import { useLocation } from "react-router-dom";
import QuickSessionMarket from "../QuickSession/QuickSessionMarket";

const MatchOdds = ({
  data,
  matchOddsLive,
  bookmakerLive,
  sessionOddsLive,
  allBetsData,
  sessionExposer,
  sessionBets,
  sessionOffline,
  setFastAmount,
  fastAmount,
  handleRateChange,
  LSelectedSessionBetting,
  localQuickSession,
}:any) => {
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
 

  const matchId = location?.state?.matchId;

  // const [localSession, setLocalSession] = useState([]);
  // const [localQuickSession, setLocalQuickSession] = useState([]);



//   useEffect(() => {
//     if (quickBookmaker) {
//       setLocalQuickBookmaker(quickBookmaker);
//     }
//   }, [quickBookmaker]);

  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 0);
  //   return () => clearTimeout(timer);
  // });

  function calculateTimeLeft() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const targetDate = moment(data?.startAt).tz(timezone);
    const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days:
          ("0" + Math.floor(difference / (1000 * 60 * 60 * 24))).slice(-2) || 0,
        hours:
          ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(-2) ||
          0,
        minutes:
          ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2) || 0,
        seconds: ("0" + Math.floor((difference / 1000) % 60)).slice(-2) || 0,
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

  
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>

        <MarketOdds
        //   upcoming={!upcoming}
          betLock={data?.blockMarket?.MATCH_ODDS?.block}
          showDely={true}
          showBox={!matchOddRateLive}
          newData={data}
          data={
            matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners : []
          }
        //   lock={
        //     matchOddsData?.length > 0 && matchOddsData[0]?.betStatus === 0
        //       ? true
        //       : false
        //   }
        //   teamARates={teamRates?.teamA}
        //   teamBRates={teamRates?.teamB}
        //   teamCRates={teamRates?.teamC}
          min={data?.betfair_match_min_bet || 0}
          max={data?.betfair_match_max_bet || 0}
          title={"Match Odds"}
          typeOfBet={"MATCH ODDS"}
          handleRateChange={handleRateChange}
        />


            <MarketOdds
            //   key={idx}
            //   upcoming={!upcoming}
              betLock={data?.blockMarket?.MANUALBOOKMAKER?.block}
              newData={data}
              lock={false}
              showDely={false}
              session={"manualBookMaker"}
              showFast={true}
              suspended={false}
              data={data}
            //   teamARates={teamRates?.teamA}
            //   teamBRates={teamRates?.teamB}
            //   teamCRates={teamRates?.teamC}
            //   min={bookmaker?.min_bet || 0}
            //   max={bookmaker?.max_bet || 0}
            //   title={bookmaker.marketName}
            //   typeOfBet={"MANUAL BOOKMAKER"}
            //   matchOddsData={bookmaker}
              setFastAmount={setFastAmount}
              fastAmount={fastAmount?.mannualBookMaker}
              handleRateChange={handleRateChange}
            />
      


            <MarketOdds
            //   key={bookmaker?.id}
            //   upcoming={!upcoming}
              betLock={data?.blockMarket?.MANUALBOOKMAKER?.block}
              newData={data}
              lock={false}
              showDely={false}
              session={"manualBookMaker"}
              showFast={true}
              suspended={false}
              data={data}
            //   teamARates={teamRates?.teamA}
            //   teamBRates={teamRates?.teamB}
            //   teamCRates={teamRates?.teamC}
            //   min={bookmaker?.min_bet || 0}
            //   max={bookmaker?.max_bet || 0}
            //   title={bookmaker?.marketName}
            //   typeOfBet={bookmaker?.marketType}
            //   matchOddsData={bookmaker}
            //   setFastAmount={setFastAmount}
            //   fastAmount={fastAmount?.[bookmaker?.marketType]}
              handleRateChange={handleRateChange}
            />
      

      
        <MarketOdds
        //   upcoming={!upcoming}
          betLock={data?.blockMarket?.BOOKMAKER?.block}
          showBox={!bookMakerRateLive}
          newData={data}
          showFast={false}
          showDely={true}
          lock={
            data?.bookmakerLive?.length > 0 &&
            data?.bookmakerLive[0]?.betStatus === 0
              ? true
              : false
          }
          data={
            bookmakerLive?.runners?.length > 0 ? bookmakerLive?.runners : []
          }
          // suspended={false}
        //   teamARates={teamRates?.teamA}
        //   teamBRates={teamRates?.teamB}
        //   teamCRates={teamRates?.teamC}
          min={data?.betfair_bookmaker_min_bet || 0}
          max={data?.betfair_bookmaker_max_bet || 0}
          title={"Bookmaker Market "}
          isRound={false}
          session={"bookmaker"}
          typeOfBet={"BOOKMAKER"}
          setFastAmount={setFastAmount}
          fastAmount={fastAmount?.bookMaker}
          handleRateChange={handleRateChange}
        />
    
        <>
          <QuickSessionMarket
            min={data?.manaual_session_min_bet || 0}
            max={data?.manaual_session_max_bet || 0}
            title={"Quick Session Market 1"}
            // upcoming={!upcoming}
            betLock={data?.blockMarket?.SESSION?.block}
            showFast={true}
            session={"sessionOdds"}
            sessionBets={sessionBets}
            typeOfBet={"session"}
            data={sessionOddsLive}
            apiSessionActive={data?.apiSessionActive}
            manualSessionActive={data?.manualSessionActive}
            newData={manualSessions}
            sessionOffline={sessionOffline}
            sessionExposer={sessionExposerHttp}
            // dataProfit={dataProfit}
            // teamARates={teamRates?.teamA}
            // teamBRates={teamRates?.teamB}
            // teamCRates={teamRates?.teamC}
            allBetsData={allBetsData}
            setFastAmount={setFastAmount}
            fastAmount={fastAmount?.sessionOdds}
            handleRateChange={handleRateChange}
          />
        </>
    
        {/* <>
          <SessionMarket
            min={data?.betfair_session_min_bet || 0}
            max={data?.betfair_session_max_bet || 0}
            title={"Session Market"}
            typeOfBet={"session"}
            // upcoming={!upcoming}
            betLock={data?.blockMarket?.SESSION?.block}
            showFast={false}
            session={"sessionOdds"}
            sessionBets={sessionBets}
            data={sessionOddsLive}
            apiSessionActive={data?.apiSessionActive}
            manualSessionActive={data?.manualSessionActive}
            newData={LSelectedSessionBetting}
            sessionOffline={sessionOffline}
            sessionExposer={sessionExposer}
            // dataProfit={dataProfit}
            // teamARates={teamRates?.teamA}
            // teamBRates={teamRates?.teamB}
            // teamCRates={teamRates?.teamC}
            allBetsData={allBetsData}
            setFastAmount={setFastAmount}
            fastAmount={fastAmount?.sessionOdds}
            handleRateChange={handleRateChange}
          />
        </>  */}
  
    </Box>
  );
};

export default memo(MatchOdds);
