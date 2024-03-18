import { Box } from "@mui/material";
import moment from "moment-timezone";
import { memo, useEffect, useState } from "react";
import { MatchType } from "../../../utils/enum";
import QuickSessionMarket from "../QuickSession/QuickSessionMarket";
import SessionMarket from "../SessionOdds/SessionMarket";
import MarketOdds from "./MarketOdds";
import { formatToINR } from "../../../helper";

const MatchOdds = ({ matchDetails, data, setShow, show }: any) => {
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

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft);

  const upcoming =
    Number(timeLeft.days) === 0 &&
    Number(timeLeft.hours) === 0 &&
    Number(timeLeft.minutes) <= 60;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft);
    }, 0);
    return () => clearTimeout(timer);
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {matchDetails?.matchOdd?.isActive && (
        <MarketOdds
          upcoming={!upcoming}
          betLock={data?.blockMarket?.MATCH_ODDS?.block}
          showDely={true}
          showBox={matchDetails?.matchOdd?.activeStatus === "save"}
          newData={data}
          data={
            matchDetails?.matchOdd?.runners?.length > 0
              ? matchDetails?.matchOdd?.runners
              : []
          }
          lock={matchDetails?.matchOdd.activeStatus !== "live" ? true : false}
          teamARates={matchDetails?.profitLossDataMatch?.teamARate || 0}
          teamBRates={matchDetails?.profitLossDataMatch?.teamBRate || 0}
          teamCRates={matchDetails?.profitLossDataMatch?.teamCRate || 0}
          min={formatToINR(matchDetails?.matchOdd?.minBet) || 0}
          max={formatToINR(matchDetails?.matchOdd?.maxBet) || 0}
          title={matchDetails?.matchOdd?.name}
          typeOfBet={"MATCH ODDS"}
          marketDetails={matchDetails?.matchOdd}
          // handleRateChange={handleRateChange}
        />
      )}

      {matchDetails?.bookmaker?.isActive && (
        <MarketOdds
          upcoming={!upcoming}
          betLock={data?.blockMarket?.BOOKMAKER?.block}
          showBox={matchDetails?.bookmaker?.activeStatus === "save"}
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
          teamARates={matchDetails?.profitLossDataMatch?.teamARate || 0}
          teamBRates={matchDetails?.profitLossDataMatch?.teamBRate || 0}
          teamCRates={matchDetails?.profitLossDataMatch?.teamCRate || 0}
          min={formatToINR(matchDetails?.bookmaker?.minBet) || 0}
          max={formatToINR(matchDetails?.bookmaker?.maxBet) || 0}
          title={matchDetails?.bookmaker?.name}
          isRound={false}
          session={"bookmaker"}
          typeOfBet={"BOOKMAKER"}
          marketDetails={matchDetails?.bookmaker}
        />
      )}
      {matchDetails?.quickBookmaker
        ?.filter((item: any) => item?.isActive)
        ?.map((bookmaker: any) => (
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
            teamARates={matchDetails?.profitLossDataMatch?.teamARate || 0}
            teamBRates={matchDetails?.profitLossDataMatch?.teamBRate || 0}
            teamCRates={matchDetails?.profitLossDataMatch?.teamCRate || 0}
            min={formatToINR(bookmaker?.minBet) || 0}
            max={formatToINR(bookmaker?.maxBet) || 0}
            title={bookmaker?.name}
            typeOfBet={"MANUAL BOOKMAKER"}
            matchOddsData={bookmaker}
            marketDetails={bookmaker}
          />
        ))}

      {matchDetails?.apiTideMatch?.isActive && (
        <MarketOdds
          upcoming={!upcoming}
          betLock={data?.blockMarket?.BOOKMAKER?.block}
          showBox={matchDetails?.apiTideMatch?.activeStatus === "save"}
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
          teamARates={matchDetails?.profitLossDataMatch?.yesRateTie || 0}
          teamBRates={matchDetails?.profitLossDataMatch?.noRateTie || 0}
          min={formatToINR(matchDetails?.apiTideMatch?.minBet) || 0}
          max={formatToINR(matchDetails?.apiTideMatch?.maxBet) || 0}
          title={matchDetails?.apiTideMatch?.name}
          isRound={false}
          session={"bookmaker"}
          typeOfBet={"BOOKMAKER"}
          marketDetails={matchDetails?.apiTideMatch}
        />
      )}

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
          teamARates={matchDetails?.profitLossDataMatch?.yesRateTie || 0}
          teamBRates={matchDetails?.profitLossDataMatch?.noRateTie || 0}
          min={formatToINR(matchDetails?.manualTiedMatch?.minBet) || 0}
          max={formatToINR(matchDetails?.manualTiedMatch?.maxBet) || 0}
          title={matchDetails?.manualTiedMatch?.name}
          typeOfBet={"MANUAL BOOKMAKER"}
          matchOddsData={matchDetails?.manualTiedMatch}
          marketDetails={matchDetails?.manualTiedMatch}
        />
      )}

      {matchDetails?.marketCompleteMatch?.isActive && (
        <MarketOdds
          upcoming={!upcoming}
          betLock={data?.blockMarket?.BOOKMAKER?.block}
          showBox={matchDetails?.marketCompleteMatch?.activeStatus === "save"}
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
          teamARates={matchDetails?.profitLossDataMatch?.yesRateComplete || 0}
          teamBRates={matchDetails?.profitLossDataMatch?.noRateComplete || 0}
          teamCRates={matchDetails?.profitLossDataMatch?.teamCRate || 0}
          min={formatToINR(matchDetails?.marketCompleteMatch?.minBet) || 0}
          max={formatToINR(matchDetails?.marketCompleteMatch?.maxBet) || 0}
          title={matchDetails?.marketCompleteMatch?.name}
          isRound={false}
          session={"bookmaker"}
          typeOfBet={"BOOKMAKER"}
          marketDetails={matchDetails?.marketCompleteMatch}
        />
      )}

      <>
        {matchDetails?.apiSessionActive &&
          matchDetails?.apiSession?.length > 0 && (
            <SessionMarket
              key={matchDetails?.id}
              allBetsData={matchDetails?.profitLossDataSession}
              newData={matchDetails?.apiSession}
              matchOddsData={matchDetails?.apiSession}
              typeOfBet={matchDetails?.type}
              title={"Session Market"}
              setShow={setShow}
              show={show}
              type={MatchType.API_SESSION_MARKET}
              data={matchDetails?.apiSession}
              eventType={matchDetails?.matchType}
              min={formatToINR(matchDetails?.betFairSessionMinBet)}
              max={formatToINR(matchDetails?.betFairSessionMaxBet)}
              upcoming={!upcoming}
              matchDetails={matchDetails}
            />
          )}
      </>
      <>
        {matchDetails?.manualSessionActive &&
          matchDetails?.sessionBettings?.filter(
            (betting: any) => JSON.parse(betting)?.selectionId === null
          ).length > 0 && (
            <QuickSessionMarket
              key={matchDetails?.id}
              allBetsData={matchDetails?.profitLossDataSession}
              title={"Quick Session Market"}
              session={"sessionOdds"}
              setShow={setShow}
              show={show}
              upcoming={!upcoming}
              type={MatchType.SESSION_MARKET}
              matchOddsData={matchDetails?.sessionBettings}
              newData={matchDetails?.sessionBettings?.filter(
                (betting: any) => JSON.parse(betting)?.selectionId === null
              )}
              eventType={matchDetails?.matchType}
              minBet={formatToINR(matchDetails?.betFairSessionMinBet)}
              maxBet={formatToINR(matchDetails?.betFairSessionMaxBet)}
              typeOfBet={matchDetails?.type}
            />
          )}
      </>
    </Box>
  );
};

export default memo(MatchOdds);
