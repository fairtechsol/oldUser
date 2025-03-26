import { Box } from "@mui/material";
import moment from "moment-timezone";
import { Fragment, memo, useEffect, useState } from "react";
import { customSortBySessionMarketName, formatToINR } from "../../../helper";
import { sessionBettingType } from "../../../utils/Constants";
import { MatchType } from "../../../utils/enum";
import CricketCasinoMarket from "../CricketCasinoOdds/CricketCasinoMarket";
import QuickSessionMarket from "../QuickSession/QuickSessionMarket";
import SessionMarket from "../SessionOdds/SessionMarket";
import TournamentOdds from "./TournamentOdds";

const MatchOdds = ({ matchDetails, setShow, show }: any) => {
  function calculateTimeLeft() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const targetDate = moment(matchDetails?.startAt).tz(timezone);

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

  const [_, setTimeLeft] = useState<any>(calculateTimeLeft);

  const upcoming = true;
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

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
            return (
              <TournamentOdds
                key={market?.id}
                upcoming={!upcoming}
                betLock={matchDetails?.blockMarket?.BOOKMAKER?.block}
                showBox={market?.activeStatus === "save"}
                lock={
                  matchDetails?.bookmakerLive?.length > 0 &&
                  matchDetails?.bookmakerLive[0]?.betStatus === 0
                    ? true
                    : false
                }
                teamARates={
                  JSON.parse(
                    matchDetails?.profitLossDataMatch?.[
                      (market?.parentBetId || market?.id) +
                        "_profitLoss_" +
                        matchDetails?.id
                    ] || "{}"
                  )?.[
                    market?.runners?.[0]?.parentRunnerId ||
                      market?.runners?.[0]?.id
                  ] ?? 0
                }
                teamBRates={
                  JSON.parse(
                    matchDetails?.profitLossDataMatch?.[
                      (market?.parentBetId || market?.id) +
                        "_profitLoss_" +
                        matchDetails?.id
                    ] || "{}"
                  )?.[
                    market?.runners?.[1]?.parentRunnerId ||
                      market?.runners?.[1]?.id
                  ] ?? 0
                }
                teamCRates={
                  JSON.parse(
                    matchDetails?.profitLossDataMatch?.[
                      (market?.parentBetId || market?.id) +
                        "_profitLoss_" +
                        matchDetails?.id
                    ] || "{}"
                  )?.[
                    market?.runners?.[2]?.parentRunnerId ||
                      market?.runners?.[2]?.id
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
        matchDetails?.sessionBettings?.filter(
          (betting: any) =>
            JSON.parse(betting)?.selectionId === null &&
            JSON.parse(betting)?.activeStatus === "live"
        ).length > 0 && (
          <QuickSessionMarket
            allBetsData={matchDetails?.profitLossDataSession}
            title={"Quick Session Market"}
            session={"sessionOdds"}
            setShow={setShow}
            show={show}
            upcoming={!upcoming}
            type={MatchType.SESSION_MARKET}
            matchOddsData={matchDetails?.sessionBettings}
            newData={matchDetails?.sessionBettings?.filter(
              (betting: any) =>
                JSON.parse(betting)?.selectionId === null &&
                !(
                  JSON.parse(betting)?.activeStatus === "unSave" ||
                  JSON.parse(betting)?.activeStatus === "result"
                )
            )}
            eventType={matchDetails?.matchType}
            minBet={formatToINR(matchDetails?.betFairSessionMinBet)}
            typeOfBet={matchDetails?.type}
            matchDetails={matchDetails}
          />
        )}

      {matchDetails?.apiSessionActive &&
        Object.entries(matchDetails?.apiSession || {})
          ?.filter(
            ([key, value]: any) =>
              value?.section?.length > 0 &&
              key !== sessionBettingType.cricketCasino
          )
          ?.slice()
          ?.sort(customSortBySessionMarketName)
          ?.map(([key, value]: any) => {
            return (
              <Fragment key={key}>
                {value?.section?.filter(
                  (item: any) =>
                    !item?.isManual &&
                    !(
                      item?.activeStatus === "unSave" ||
                      item?.activeStatus === "result"
                    )
                )?.length > 0 && (
                  <SessionMarket
                    key={key}
                    allBetsData={matchDetails?.profitLossDataSession}
                    newData={value?.section?.filter(
                      (items: any) =>
                        !(
                          items?.activeStatus === "unSave" ||
                          items?.activeStatus === "result"
                        )
                    )}
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
            );
          })}

      {matchDetails?.apiSessionActive &&
        (matchDetails?.apiSession?.cricketCasino?.section || [])
          ?.filter(
            (item: any) =>
              !(
                item?.activeStatus === "unSave" ||
                item?.activeStatus === "result"
              )
          )
          ?.map((item: any) => {
            return (
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
            );
          })}

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
            return (
              <TournamentOdds
                key={market?.id}
                upcoming={!upcoming}
                betLock={matchDetails?.blockMarket?.BOOKMAKER?.block}
                showBox={market?.activeStatus === "save"}
                lock={
                  matchDetails?.bookmakerLive?.length > 0 &&
                  matchDetails?.bookmakerLive[0]?.betStatus === 0
                    ? true
                    : false
                }
                teamARates={
                  JSON.parse(
                    matchDetails?.profitLossDataMatch?.[
                      (market?.parentBetId || market?.id) +
                        "_profitLoss_" +
                        matchDetails?.id
                    ] || "{}"
                  )?.[
                    market?.runners?.[0]?.parentRunnerId ||
                      market?.runners?.[0]?.id
                  ] ?? 0
                }
                teamBRates={
                  JSON.parse(
                    matchDetails?.profitLossDataMatch?.[
                      (market?.parentBetId || market?.id) +
                        "_profitLoss_" +
                        matchDetails?.id
                    ] || "{}"
                  )?.[
                    market?.runners?.[1]?.parentRunnerId ||
                      market?.runners?.[1]?.id
                  ] ?? 0
                }
                teamCRates={
                  JSON.parse(
                    matchDetails?.profitLossDataMatch?.[
                      (market?.parentBetId || market?.id) +
                        "_profitLoss_" +
                        matchDetails?.id
                    ] || "{}"
                  )?.[
                    market?.runners?.[2]?.parentRunnerId ||
                      market?.runners?.[2]?.id
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
    </Box>
  );
};

export default memo(MatchOdds);
