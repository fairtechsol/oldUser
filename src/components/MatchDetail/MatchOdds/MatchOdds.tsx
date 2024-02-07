import { Box } from "@mui/material";
import MarketOdds from "./MarketOdds";
import { memo, useEffect, useState } from "react";
import QuickSessionMarket from "../QuickSession/QuickSessionMarket";
import SessionMarket from "../SessionOdds/SessionMarket";
import { MatchType } from "../../../utils/enum";
import moment from "moment-timezone";

const MatchOdds = ({ matchDetails, data, teamRates }: any) => {
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

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  const upcoming =
    Number(timeLeft.days) === 0 &&
    Number(timeLeft.hours) === 0 &&
    Number(timeLeft.minutes) <= 30;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 0);
    return () => clearTimeout(timer);
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {matchDetails?.matchOdd?.isActive && (
        <MarketOdds
          // upcoming={!upcoming}
          betLock={data?.blockMarket?.MATCH_ODDS?.block}
          showDely={true}
          showBox={!matchDetails?.matchOdd}
          newData={data}
          data={
            matchDetails?.matchOdd?.runners?.length > 0
              ? matchDetails?.matchOdd?.runners
              : []
          }
          lock={matchDetails?.matchOdd.activeStatus !== "live" ? true : false}
          teamARates={matchDetails?.teamRates?.teamARate || 0}
          teamBRates={matchDetails?.teamRates?.teamBRate || 0}
          teamCRates={matchDetails?.teamRates?.teamCRate || 0}
          min={matchDetails?.matchOdd?.minBet || 0}
          max={matchDetails?.matchOdd?.maxBet || 0}
          title={matchDetails?.matchOdd?.name}
          typeOfBet={"MATCH ODDS"}
          marketDetails={matchDetails?.matchOdd}
          // handleRateChange={handleRateChange}
        />
      )}

      {matchDetails?.bookmaker?.isActive && (
        <MarketOdds
          betLock={data?.blockMarket?.BOOKMAKER?.block}
          showBox={!matchDetails?.bookmaker}
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
            matchDetails?.bookmaker?.runners?.length > 0
              ? matchDetails?.bookmaker?.runners
              : []
          }
          teamARates={matchDetails?.teamRates?.teamARate || 0}
          teamBRates={matchDetails?.teamRates?.teamBRate || 0}
          teamCRates={matchDetails?.teamRates?.teamCRate || 0}
          min={matchDetails?.bookmaker?.minBet || 0}
          max={matchDetails?.bookmaker?.maxBet || 0}
          title={matchDetails?.bookmaker?.name}
          isRound={false}
          session={"bookmaker"}
          typeOfBet={"BOOKMAKER"}
          marketDetails={matchDetails?.bookmaker}
        />
      )}

      {matchDetails?.apiTideMatch?.isActive && (
        <MarketOdds
          betLock={data?.blockMarket?.BOOKMAKER?.block}
          showBox={!matchDetails?.apiTideMatch}
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
            matchDetails?.apiTideMatch?.runners?.length > 0
              ? matchDetails?.apiTideMatch?.runners
              : []
          }
          // suspended={false}
          teamARates={matchDetails?.teamRates?.yesRateTie || 0}
          teamBRates={matchDetails?.teamRates?.noRateTie || 0}
          min={matchDetails?.apiTideMatch?.minBet || 0}
          max={matchDetails?.apiTideMatch?.maxBet || 0}
          title={matchDetails?.apiTideMatch?.name}
          isRound={false}
          session={"bookmaker"}
          typeOfBet={"BOOKMAKER"}
          marketDetails={matchDetails?.apiTideMatch}
        />
      )}

      {matchDetails?.quickBookmaker?.map((bookmaker: any) => (
        <MarketOdds
          key={bookmaker?.id}
          upcoming={!upcoming}
          betLock={data?.blockMarket?.MANUALBOOKMAKER?.block}
          newData={data}
          lock={false}
          showDely={false}
          session={"manualBookMaker"}
          showFast={true}
          suspended={false}
          data={data}
          teamARates={matchDetails?.teamRates?.teamARate || 0}
          teamBRates={matchDetails?.teamRates?.teamBRate || 0}
          teamCRates={matchDetails?.teamRates?.teamCRate || 0}
          min={bookmaker?.minBet || 0}
          max={bookmaker?.maxBet || 0}
          title={bookmaker?.name}
          typeOfBet={"MANUAL BOOKMAKER"}
          matchOddsData={bookmaker}
          marketDetails={bookmaker}
        />
      ))}

      {matchDetails?.manualTiedMatch?.isActive && (
        <MarketOdds
          upcoming={!upcoming}
          betLock={data?.blockMarket?.MANUALBOOKMAKER?.block}
          newData={data}
          lock={false}
          showDely={false}
          session={"manualBookMaker"}
          showFast={true}
          suspended={false}
          data={data}
          teamARates={matchDetails?.teamRates?.yesRateTie || 0}
          teamBRates={matchDetails?.teamRates?.noRateTie || 0}
          min={matchDetails?.manualTiedMatch?.minBet || 0}
          max={matchDetails?.manualTiedMatch?.maxBet || 0}
          title={matchDetails?.manualTiedMatch?.name}
          typeOfBet={"MANUAL BOOKMAKER"}
          matchOddsData={matchDetails?.manualTiedMatch}
          marketDetails={matchDetails?.manualTiedMatch}
        />
      )}

      {matchDetails?.marketCompleteMatch?.isActive && (
        <MarketOdds
          betLock={data?.blockMarket?.BOOKMAKER?.block}
          showBox={!matchDetails?.marketCompleteMatch}
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
            matchDetails?.marketCompleteMatch?.runners?.length > 0
              ? matchDetails?.marketCompleteMatch?.runners
              : []
          }
          // suspended={false}
          teamARates={matchDetails?.teamRates?.teamARate || 0}
          teamBRates={matchDetails?.teamRates?.teamBRate || 0}
          teamCRates={matchDetails?.teamRates?.teamCRate || 0}
          min={matchDetails?.marketCompleteMatch?.minBet || 0}
          max={matchDetails?.marketCompleteMatch?.maxBet || 0}
          title={matchDetails?.marketCompleteMatch?.name}
          isRound={false}
          session={"bookmaker"}
          typeOfBet={"BOOKMAKER"}
          marketDetails={matchDetails?.marketCompleteMatch}
        />
      )}

      <>
        {matchDetails?.apiSessionActive?.isActive && (
          <SessionMarket
            key={matchDetails?.id}
            newData={matchDetails?.apiSessionActive}
            matchOddsData={matchDetails?.apiSessionActive}
            typeOfBet={matchDetails?.type}
            title={"Session Market"}
            type={MatchType.API_SESSION_MARKET}
            data={matchDetails?.apiSession}
          />
        )}
      </>
      <>
        {matchDetails?.manualSessionActive && (
          <QuickSessionMarket
            key={matchDetails?.id}
            title={"Quick Session Market"}
            type={MatchType.SESSION_MARKET}
            matchOddsData={matchDetails?.sessionBettings}
            newData={matchDetails.sessionBettings}
            eventType={matchDetails?.matchType}
            minBet={matchDetails?.betFairSessionMinBet}
            maxBet={matchDetails?.betFairSessionMaxBet}
            typeOfBet={matchDetails?.type}
          />
        )}
      </>
    </Box>
  );
};

export default memo(MatchOdds);
