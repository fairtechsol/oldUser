import { Box } from "@mui/material";
import MarketOdds from "./MarketOdds";
import { memo } from "react";
import moment from "moment-timezone";
import { useLocation } from "react-router-dom";
import QuickSessionMarket from "../QuickSession/QuickSessionMarket";
import SessionMarket from "../SessionOdds/SessionMarket";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { MatchType } from "../../../utils/enum";
import { useDispatch } from "react-redux";




interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds?: string;
}
const MatchOdds = ({
  data,
  newData,

}: any) => {




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

  const { matchDetails } = useSelector(
    (state: RootState) => state.match.matchList
  );


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>


      {matchDetails?.matchOdd?.isActive && (

        <MarketOdds
          teamA={matchDetails?.teamA}
          title={matchDetails?.matchOdd.name}
          teamB={matchDetails?.teamB}
          minBet={matchDetails?.matchOdd?.minBet}
          maxBet={matchDetails?.matchOdd?.maxBet}
          valueA={matchDetails?.profitLossDataMatch?.teamRateA}
          valueB={matchDetails?.profitLossDataMatch?.teamRateB}
        />

      )}

      {matchDetails?.quickBookmaker?.map((item: any) => (
        <MarketOdds
          key={item?.id}
          // upcoming={!upcoming}
          betLock={data?.blockMarket?.MANUALBOOKMAKER?.block}
          newData={item}
          lock={false}
          showDely={false}
          session={"manualBookMaker"}
          showFast={true}
          suspended={false}
          data={matchDetails}
          // teamARates={teamRates?.teamA}
          // teamBRates={teamRates?.teamB}
          // teamCRates={teamRates?.teamC}
          min={item?.minBet || 0}
          max={item?.maxBet || 0}
          title={item?.name}
          typeOfBet={item?.type
          }
          matchOddsData={item}
        // setFastAmount={setFastAmount}
        // fastAmount={fastAmount?.[item?.marketType]}
        // handleRateChange={handleRateChange}
        />

      ))}


      {matchDetails?.bookmaker && (
        <MarketOdds
          // key={id}
          title={matchDetails?.bookmaker.name}
          teamA={matchDetails?.teamA}
          teamB={matchDetails?.teamB}
          minBet={matchDetails?.bookmaker?.minBet}
          maxBet={matchDetails?.bookmaker?.maxBet}
          valueA={matchDetails?.profitLossDataMatch?.teamRateA}
          valueB={matchDetails?.profitLossDataMatch?.teamRateB}

        />

      )}

      {matchDetails?.apiTideMatch && (
        <MarketOdds
          title={matchDetails?.apiTideMatch.name}
          teamA={"Yes"}
          teamB={"No"}
          minBet={matchDetails?.apiTideMatch?.minBet}
          maxBet={matchDetails?.apiTideMatch?.maxBet}
          valueA={matchDetails?.profitLossDataMatch?.yesRateTie}
          valueB={matchDetails?.profitLossDataMatch?.noRateTie}
        />
      )}

      {matchDetails?.manualTiedMatch && (
        <MarketOdds
          title={matchDetails?.manualTiedMatch.name}
          teamA={"Yes"}
          teamB={"No"}
          minBet={matchDetails?.manualTiedMatch?.minBet}
          maxBet={matchDetails?.manualTiedMatch?.maxBet}
          valueA={matchDetails?.profitLossDataMatch?.yesRateTie}
          valueB={matchDetails?.profitLossDataMatch?.noRateTie}
          statusTeamA={matchDetails?.manualTiedMatch?.statusTeamA}
          statusTeamB={matchDetails?.manualTiedMatch?.statusTeamB}
          statusTeamC={matchDetails?.manualTiedMatch?.statusTeamC}
        />
      )}


      {matchDetails?.marketCompleteMatch && (
        <MarketOdds
          title={matchDetails?.marketCompleteMatch.name}
          teamA={"Yes"}
          teamB={"No"}

          minBet={matchDetails?.marketCompleteMatch?.minBet}
          maxBet={matchDetails?.marketCompleteMatch?.maxBet}
          valueA={matchDetails?.profitLossDataMatch?.yesRateTie}
          valueB={matchDetails?.profitLossDataMatch?.noRateTie}
        />
      )}




      <>
        {matchDetails?.apiSessionActive && (
          <SessionMarket
            title={"Session Market"}
            type={MatchType.API_SESSION_MARKET}
            data={matchDetails?.apiSession}
          />
        )}
      </>
      <>
        {matchDetails?.sessionBettings && matchDetails.sessionBettings.length > 0 && (
          <QuickSessionMarket
            title={"Quick Session Market"}
            type={MatchType.SESSION_MARKET}
            name={JSON.parse(matchDetails.sessionBettings[0]).name}
            newData={matchDetails.sessionBettings}
            eventType={matchDetails?.matchType}
            minBet={matchDetails?.betFairSessionMinBet}
            maxBet={matchDetails?.betFairSessionMaxBet}
          />
        )}
      </>
    </Box>

  );
};

export default memo(MatchOdds);
