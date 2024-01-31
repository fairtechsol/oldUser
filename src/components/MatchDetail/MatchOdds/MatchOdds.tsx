import { Box } from "@mui/material";
import MarketOdds from "./MarketOdds";
import { memo } from "react";
import moment from "moment-timezone";
import QuickSessionMarket from "../QuickSession/QuickSessionMarket";
import SessionMarket from "../SessionOdds/SessionMarket";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { MatchType } from "../../../utils/enum";




interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds?: string;
}
const MatchOdds = ({
  data,
  newData,
  allRates,
  backTeamA,
  backTeamB,
  backTeamC

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
          key={matchDetails?.id}
          newData={matchDetails?.matchOdd}
          matchOddsData={matchDetails?.matchOdd}
          data={matchDetails}
          typeOfBet={matchDetails?.type
          }
          type={MatchType.MATCH_ODDS}
          
        />

      )}

      {matchDetails?.quickBookmaker?.map((item: any) => (
        <MarketOdds
          key={item?.id}
          newData={item}
          lock={false}
          showDely={false}
          session={"manualBookMaker"}
          showFast={true}
          suspended={false}
          data={matchDetails}
          min={item?.minBet || 0}
          max={item?.maxBet || 0}
          title={item?.name}
          typeOfBet={item?.type
          }
          matchOddsData={item}
          type={MatchType.BOOKMAKER}
           eventType={matchDetails?.matchType}
        />

      ))}


      {matchDetails?.bookmaker && (
        <MarketOdds
          key={matchDetails?.id}
          newData={matchDetails?.bookmaker}
          matchOddsData={matchDetails?.bookmaker}
          data={matchDetails}
          title={matchDetails?.bookmaker.name}
          teamA={matchDetails?.teamA}
          teamB={matchDetails?.teamB}
          minBet={matchDetails?.bookmaker?.minBet}
          maxBet={matchDetails?.bookmaker?.maxBet}
          valueA={matchDetails?.profitLossDataMatch?.teamRateA}
          valueB={matchDetails?.profitLossDataMatch?.teamRateB}
          typeOfBet={matchDetails?.type
          }
        />

      )}

      {matchDetails?.apiTideMatch && (
        <MarketOdds
          key={matchDetails?.id}
          newData={matchDetails?.apiTideMatch}
          matchOddsData={matchDetails?.apiTideMatch}
          data={matchDetails}
          title={matchDetails?.apiTideMatch.name}
          teamA={"Yes"}
          teamB={"No"}
          minBet={matchDetails?.apiTideMatch?.minBet}
          maxBet={matchDetails?.apiTideMatch?.maxBet}
          valueA={matchDetails?.profitLossDataMatch?.yesRateTie}
          valueB={matchDetails?.profitLossDataMatch?.noRateTie}
          typeOfBet={matchDetails?.type
          }
        />
      )}

      {matchDetails?.manualTiedMatch && (
        <MarketOdds
          key={matchDetails?.id}
          newData={matchDetails?.manualTiedMatch}
          matchOddsData={matchDetails?.manualTiedMatch}
          data={matchDetails}
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
          typeOfBet={matchDetails?.type
          }
        />
      )}


      {matchDetails?.marketCompleteMatch && (
        <MarketOdds
          key={matchDetails?.id}
          newData={matchDetails?.marketCompleteMatch}
          matchOddsData={matchDetails?.marketCompleteMatch}
          data={matchDetails}
          title={matchDetails?.marketCompleteMatch.name}
          teamA={"Yes"}
          teamB={"No"}
          typeOfBet={matchDetails?.type
          }
          minBet={matchDetails?.marketCompleteMatch?.minBet}
          maxBet={matchDetails?.marketCompleteMatch?.maxBet}
          valueA={matchDetails?.profitLossDataMatch?.yesRateTie}
          valueB={matchDetails?.profitLossDataMatch?.noRateTie}
        />
      )}




      <>
        {matchDetails?.apiSessionActive && (
          <SessionMarket
            key={matchDetails?.id}
            newData={matchDetails?.apiSessionActive}
            matchOddsData={matchDetails?.apiSessionActive}
            typeOfBet={matchDetails?.type
            }
            title={"Session Market"}
            type={MatchType.API_SESSION_MARKET}
            data={matchDetails?.apiSession}
          />
        )}
      </>
      <>
        {matchDetails?.sessionBettings && matchDetails.sessionBettings.length > 0 && (
          <QuickSessionMarket
            key={matchDetails?.id}
            title={"Quick Session Market"}
            type={MatchType.SESSION_MARKET}
            matchOddsData={matchDetails?.sessionBettings}
            name={JSON.parse(matchDetails.sessionBettings[0]).name}
            newData={matchDetails.sessionBettings}
            eventType={matchDetails?.matchType}
            minBet={matchDetails?.betFairSessionMinBet}
            maxBet={matchDetails?.betFairSessionMaxBet}
            typeOfBet={matchDetails?.type
            }
          />
        )}
      </>
    </Box>

  );
};

export default memo(MatchOdds);
