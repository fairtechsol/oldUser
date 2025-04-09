import { Box } from "@mui/material";
import { Fragment, memo } from "react";
import { customSortBySessionMarketName, formatToINR } from "../../../helper";
import { sessionBettingType } from "../../../utils/Constants";
import { MatchType } from "../../../utils/enum";
import CricketCasinoMarket from "../CricketCasinoOdds/CricketCasinoMarket";
import QuickSessionMarket from "../QuickSession/QuickSessionMarket";
import SessionMarket from "../SessionOdds/SessionMarket";
import TournamentOdds from "./TournamentOdds";

interface MatchOddsProps {
  matchDetails: any;
  setShow: (val: any) => void;
  show: {
    open: boolean;
    id: string;
  };
}

const MatchOdds = ({ matchDetails, setShow, show }: MatchOddsProps) => {
  const upcoming = true;

  const isActiveSession = (betting: any) => {
    const parsedBetting = JSON.parse(betting);
    return (
      parsedBetting?.selectionId === null &&
      parsedBetting?.activeStatus === "live"
    );
  };

  const filterActiveSessions = (betting: any) => {
    const parsedBetting = JSON.parse(betting);
    return (
      parsedBetting?.selectionId === null &&
      !["unSave", "result"].includes(parsedBetting?.activeStatus)
    );
  };

  const filterApiSessions = ([key, value]: any) =>
    value?.section?.length > 0 && key !== sessionBettingType.cricketCasino;

  const filterValidItems = (item: any) =>
    !["unSave", "result"].includes(item?.activeStatus);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {matchDetails?.tournament &&
        matchDetails?.tournament
          ?.filter(
            (items: any) =>
              items.activeStatus === "live" &&
              !["completed_match", "tied_match"].includes(
                items?.name?.toLowerCase()
              )
          )
          ?.sort((a: any, b: any) => a.sNo - b.sNo)
          ?.map((market: any) => {
            const profitLossKey =
              (market?.parentBetId || market?.id) +
              "_profitLoss_" +
              matchDetails?.id;
            const profitLossData = JSON.parse(
              matchDetails?.profitLossDataMatch?.[profitLossKey] || "{}"
            );
            return (
              <TournamentOdds
                key={market?.id}
                upcoming={!upcoming}
                betLock={matchDetails?.blockMarket?.BOOKMAKER?.block}
                showBox={market?.activeStatus === "save"}
                teamARates={
                  profitLossData?.[
                    market?.runners?.[0]?.parentRunnerId ||
                      market?.runners?.[0]?.id
                  ] ?? 0
                }
                teamBRates={
                  profitLossData?.[
                    market?.runners?.[1]?.parentRunnerId ||
                      market?.runners?.[1]?.id
                  ] ?? 0
                }
                min={formatToINR(market?.minBet) || 0}
                max={formatToINR(market?.maxBet) || 0}
                title={market?.name}
                isRound={false}
                marketDetails={market}
                matchDetails={matchDetails}
              />
            );
          })}
      {matchDetails?.manualSessionActive &&
        matchDetails?.sessionBettings?.some(isActiveSession) && (
          <QuickSessionMarket
            allBetsData={matchDetails?.profitLossDataSession}
            title="Quick Session Market"
            session="sessionOdds"
            setShow={setShow}
            show={show}
            upcoming={!upcoming}
            type={MatchType.SESSION_MARKET}
            matchOddsData={matchDetails?.sessionBettings}
            newData={matchDetails?.sessionBettings?.filter(
              filterActiveSessions
            )}
            eventType={matchDetails?.matchType}
            minBet={formatToINR(matchDetails?.betFairSessionMinBet)}
            typeOfBet={matchDetails?.type}
            matchDetails={matchDetails}
          />
        )}
      {matchDetails?.apiSessionActive &&
        Object.entries(matchDetails?.apiSession || {})
          .filter(filterApiSessions)
          .sort(customSortBySessionMarketName)
          .map(([key, value]: any) => (
            <Fragment key={key}>
              {value?.section?.some(filterValidItems) && (
                <SessionMarket
                  key={key}
                  allBetsData={matchDetails?.profitLossDataSession}
                  newData={value?.section?.filter(filterValidItems)}
                  matchOddsData={value?.section}
                  typeOfBet={matchDetails?.type}
                  title={value?.mname || key}
                  setShow={setShow}
                  show={show}
                  type={key}
                  data={value}
                  eventType={matchDetails?.matchType}
                  min={formatToINR(matchDetails?.betFairSessionMinBet)}
                  upcoming={!upcoming}
                  matchDetails={matchDetails}
                  mid={value?.mid}
                />
              )}
            </Fragment>
          ))}
      {matchDetails?.apiSessionActive &&
        (matchDetails?.apiSession?.cricketCasino?.section || [])
          .filter(filterValidItems)
          .map((item: any) => (
            <CricketCasinoMarket
              key={item?.id}
              allBetsData={matchDetails?.profitLossDataSession}
              newData={item}
              matchOddsData={item}
              typeOfBet={matchDetails?.type}
              title={item?.RunnerName}
              setShow={setShow}
              show={show}
              type={sessionBettingType.cricketCasino}
              data={item}
              eventType={matchDetails?.matchType}
              min={formatToINR(matchDetails?.betFairSessionMinBet)}
              upcoming={!upcoming}
              matchDetails={matchDetails}
            />
          ))}
      {matchDetails?.tournament &&
        matchDetails?.tournament
          ?.filter(
            (items: any) =>
              items.activeStatus === "live" &&
              ["completed_match", "tied_match"].includes(
                items?.name?.toLowerCase()
              )
          )
          ?.sort((a: any, b: any) => a.sNo - b.sNo)
          ?.map((market: any) => {
            const profitLossKey =
              (market?.parentBetId || market?.id) +
              "_profitLoss_" +
              matchDetails?.id;
            const profitLossData = JSON.parse(
              matchDetails?.profitLossDataMatch?.[profitLossKey] || "{}"
            );
            return (
              <TournamentOdds
                key={market?.id}
                upcoming={!upcoming}
                betLock={matchDetails?.blockMarket?.BOOKMAKER?.block}
                showBox={market?.activeStatus === "save"}
                teamARates={
                  profitLossData?.[
                    market?.runners?.[0]?.parentRunnerId ||
                      market?.runners?.[0]?.id
                  ] || 0
                }
                teamBRates={
                  profitLossData?.[
                    market?.runners?.[1]?.parentRunnerId ||
                      market?.runners?.[1]?.id
                  ] || 0
                }
                min={formatToINR(market?.minBet) || 0}
                max={formatToINR(market?.maxBet) || 0}
                title={market?.name}
                isRound={false}
                marketDetails={market}
                matchDetails={matchDetails}
              />
            );
          })}
    </Box>
  );
};

export default memo(MatchOdds);
