import { Box } from "@mui/material";
import moment from "moment-timezone";
import { memo, useEffect, useState } from "react";
import { customBookmakerSort, formatToINR } from "../../../helper";
import {
  profitLossDataForMatchConstants,
  sessionBettingType,
} from "../../../utils/Constants";
import { MatchType } from "../../../utils/enum";
import CricketCasinoMarket from "../CricketCasinoOdds/CricketCasinoMarket";
import QuickSessionMarket from "../QuickSession/QuickSessionMarket";
import SessionMarket from "../SessionOdds/SessionMarket";
import MarketOdds from "./MarketOdds";

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
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {matchDetails?.matchOdd?.activeStatus === "live" &&
        matchDetails?.matchOdd?.isActive && (
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
            teamARates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.matchOdd?.type
                    ]?.A +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.matchOdd?.type
                      ]?.A +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamBRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.matchOdd?.type
                    ]?.B +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.matchOdd?.type
                      ]?.B +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamCRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.matchOdd?.type
                    ]?.C +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.matchOdd?.type
                      ]?.C +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            min={formatToINR(matchDetails?.matchOdd?.minBet) || 0}
            max={formatToINR(matchDetails?.matchOdd?.maxBet) || 0}
            title={matchDetails?.matchOdd?.name}
            typeOfBet={"MATCH ODDS"}
            marketDetails={matchDetails?.matchOdd}
            // handleRateChange={handleRateChange}
          />
        )}

      {matchDetails?.bookmaker?.activeStatus === "live" &&
        matchDetails?.bookmaker?.isActive && (
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
            teamARates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.bookmaker?.type
                    ]?.A +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.bookmaker?.type
                      ]?.A +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamBRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.bookmaker?.type
                    ]?.B +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.bookmaker?.type
                      ]?.B +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamCRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.bookmaker?.type
                    ]?.C +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.bookmaker?.type
                      ]?.C +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            min={formatToINR(matchDetails?.bookmaker?.minBet) || 0}
            max={formatToINR(matchDetails?.bookmaker?.maxBet) || 0}
            title={matchDetails?.bookmaker?.name}
            isRound={false}
            session={"bookmaker"}
            typeOfBet={"BOOKMAKER"}
            marketDetails={matchDetails?.bookmaker}
          />
        )}
      {matchDetails?.marketBookmaker2?.activeStatus === "live" &&
        matchDetails?.marketBookmaker2?.isActive && (
          <MarketOdds
            upcoming={!upcoming}
            betLock={data?.blockMarket?.BOOKMAKER?.block}
            showBox={matchDetails?.marketBookmaker2?.activeStatus === "save"}
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
              matchDetails?.marketBookmaker2?.runners?.length > 0
                ? matchDetails?.marketBookmaker2?.runners
                : []
            }
            teamARates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.marketBookmaker2?.type
                    ]?.A +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.marketBookmaker2?.type
                      ]?.A +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamBRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.marketBookmaker2?.type
                    ]?.B +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.marketBookmaker2?.type
                      ]?.B +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamCRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.marketBookmaker2?.type
                    ]?.C +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.marketBookmaker2?.type
                      ]?.C +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            min={formatToINR(matchDetails?.marketBookmaker2?.minBet) || 0}
            max={formatToINR(matchDetails?.marketBookmaker2?.maxBet) || 0}
            title={matchDetails?.marketBookmaker2?.name}
            isRound={false}
            session={"bookmaker"}
            typeOfBet={"BOOKMAKER"}
            marketDetails={matchDetails?.marketBookmaker2}
          />
        )}

      {matchDetails?.quickBookmaker
        ?.filter((item: any) => item?.activeStatus === "live" && item?.isActive)
        ?.slice()
        ?.sort(customBookmakerSort)
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
            showBox={bookmaker?.activeStatus === "save"}
            teamARates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.bookmaker?.type
                    ]?.A +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.bookmaker?.type
                      ]?.A +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamBRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.bookmaker?.type
                    ]?.B +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.bookmaker?.type
                      ]?.B +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamCRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.bookmaker?.type
                    ]?.C +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.bookmaker?.type
                      ]?.C +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            min={formatToINR(bookmaker?.minBet) || 0}
            max={formatToINR(bookmaker?.maxBet) || 0}
            title={bookmaker?.name}
            typeOfBet={"MANUAL BOOKMAKER"}
            matchOddsData={bookmaker}
            marketDetails={bookmaker}
          />
        ))}
      {matchDetails?.other &&
        matchDetails?.other?.map((match: any) => (
          <MarketOdds
            upcoming={!upcoming}
            betLock={data?.blockMarket?.BOOKMAKER?.block}
            showBox={match?.activeStatus === "save"}
            newData={data}
            showFast={false}
            showDely={true}
            lock={
              data?.bookmakerLive?.length > 0 &&
              data?.bookmakerLive[0]?.betStatus === 0
                ? true
                : false
            }
            data={match?.runners?.length > 0 ? match?.runners : []}
            teamARates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[match?.type]?.A +
                      "_" +
                      match?.id +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[match?.type]?.A +
                        "_" +
                        match?.id +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamBRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[match?.type]?.B +
                      "_" +
                      match?.id +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[match?.type]?.B +
                        "_" +
                        match?.id +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamCRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[match?.type]?.C +
                      "_" +
                      match?.id +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[match?.type]?.C +
                        "_" +
                        match?.id +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            min={formatToINR(match?.minBet) || 0}
            max={formatToINR(match?.maxBet) || 0}
            title={match?.name}
            isRound={false}
            session={"bookmaker"}
            typeOfBet={"BOOKMAKER"}
            marketDetails={match}
          />
        ))}

      {matchDetails?.apiTideMatch?.activeStatus === "live" &&
        matchDetails?.apiTideMatch?.isActive && (
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
            teamARates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.apiTideMatch?.type
                    ]?.A +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.apiTideMatch?.type
                      ]?.A +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamBRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.apiTideMatch?.type
                    ]?.B +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.apiTideMatch?.type
                      ]?.B +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            min={formatToINR(matchDetails?.apiTideMatch?.minBet) || 0}
            max={formatToINR(matchDetails?.apiTideMatch?.maxBet) || 0}
            title={matchDetails?.apiTideMatch?.name}
            isRound={false}
            session={"bookmaker"}
            typeOfBet={"BOOKMAKER"}
            marketDetails={matchDetails?.apiTideMatch}
          />
        )}

      {matchDetails?.apiTideMatch2?.activeStatus === "live" &&
        matchDetails?.apiTideMatch2?.isActive && (
          <MarketOdds
            upcoming={!upcoming}
            betLock={data?.blockMarket?.BOOKMAKER?.block}
            showBox={matchDetails?.apiTideMatch2?.activeStatus === "save"}
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
              matchDetails?.apiTideMatch2?.runners?.length > 0
                ? matchDetails?.apiTideMatch2?.runners
                : []
            }
            // suspended={false}
            teamARates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.apiTideMatch2?.type
                    ]?.A +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.apiTideMatch2?.type
                      ]?.A +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamBRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.apiTideMatch2?.type
                    ]?.B +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.apiTideMatch2?.type
                      ]?.B +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            min={formatToINR(matchDetails?.apiTideMatch2?.minBet) || 0}
            max={formatToINR(matchDetails?.apiTideMatch2?.maxBet) || 0}
            title={matchDetails?.apiTideMatch2?.name}
            isRound={false}
            session={"bookmaker"}
            typeOfBet={"BOOKMAKER"}
            marketDetails={matchDetails?.apiTideMatch2}
          />
        )}

      {matchDetails?.manualTiedMatch?.activeStatus === "live" &&
        matchDetails?.manualTiedMatch?.isActive && (
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
            showBox={matchDetails?.manualTiedMatch?.activeStatus === "save"}
            teamARates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.manualTiedMatch?.type
                    ]?.A +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.manualTiedMatch?.type
                      ]?.A +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamBRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.manualTiedMatch?.type
                    ]?.B +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.manualTiedMatch?.type
                      ]?.B +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            min={formatToINR(matchDetails?.manualTiedMatch?.minBet) || 0}
            max={formatToINR(matchDetails?.manualTiedMatch?.maxBet) || 0}
            title={matchDetails?.manualTiedMatch?.name}
            typeOfBet={"MANUAL BOOKMAKER"}
            matchOddsData={matchDetails?.manualTiedMatch}
            marketDetails={matchDetails?.manualTiedMatch}
          />
        )}

      {matchDetails?.marketCompleteMatch?.activeStatus === "live" &&
        matchDetails?.marketCompleteMatch?.isActive && (
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
            teamARates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.marketCompleteMatch?.type
                    ]?.A +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.marketCompleteMatch?.type
                      ]?.A +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamBRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.marketCompleteMatch?.type
                    ]?.B +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.marketCompleteMatch?.type
                      ]?.B +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            min={formatToINR(matchDetails?.marketCompleteMatch?.minBet) || 0}
            max={formatToINR(matchDetails?.marketCompleteMatch?.maxBet) || 0}
            title={matchDetails?.marketCompleteMatch?.name}
            isRound={false}
            session={"bookmaker"}
            typeOfBet={"BOOKMAKER"}
            marketDetails={matchDetails?.marketCompleteMatch}
          />
        )}

      {matchDetails?.marketCompleteMatch1?.activeStatus === "live" &&
        matchDetails?.marketCompleteMatch1?.isActive && (
          <MarketOdds
            upcoming={!upcoming}
            betLock={data?.blockMarket?.BOOKMAKER?.block}
            showBox={
              matchDetails?.marketCompleteMatch1?.activeStatus === "save"
            }
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
              matchDetails?.marketCompleteMatch1?.runners?.length > 0
                ? matchDetails?.marketCompleteMatch1?.runners
                : []
            }
            // suspended={false}
            teamARates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.marketCompleteMatch1?.type
                    ]?.A +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.marketCompleteMatch1?.type
                      ]?.A +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamBRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.marketCompleteMatch1?.type
                    ]?.B +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.marketCompleteMatch1?.type
                      ]?.B +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            min={formatToINR(matchDetails?.marketCompleteMatch1?.minBet) || 0}
            max={formatToINR(matchDetails?.marketCompleteMatch1?.maxBet) || 0}
            title={matchDetails?.marketCompleteMatch1?.name}
            isRound={false}
            session={"bookmaker"}
            typeOfBet={"BOOKMAKER"}
            marketDetails={matchDetails?.marketCompleteMatch1}
          />
        )}
      {matchDetails?.manualCompleteMatch?.activeStatus === "live" &&
        matchDetails?.manualCompleteMatch?.isActive && (
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
            showBox={matchDetails?.manualCompleteMatch?.activeStatus === "save"}
            teamARates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.manualCompleteMatch?.type
                    ]?.A +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.manualCompleteMatch?.type
                      ]?.A +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            teamBRates={
              matchDetails?.profitLossDataMatch
                ? matchDetails?.profitLossDataMatch[
                    profitLossDataForMatchConstants[
                      matchDetails?.manualCompleteMatch?.type
                    ]?.B +
                      "_" +
                      matchDetails?.id
                  ]
                  ? matchDetails?.profitLossDataMatch[
                      profitLossDataForMatchConstants[
                        matchDetails?.manualCompleteMatch?.type
                      ]?.B +
                        "_" +
                        matchDetails?.id
                    ]
                  : 0
                : 0
            }
            min={formatToINR(matchDetails?.manualCompleteMatch?.minBet) || 0}
            max={formatToINR(matchDetails?.manualCompleteMatch?.maxBet) || 0}
            title={matchDetails?.manualCompleteMatch?.name}
            typeOfBet={"MANUAL BOOKMAKER"}
            matchOddsData={matchDetails?.manualCompleteMatch}
            marketDetails={matchDetails?.manualCompleteMatch}
          />
        )}
      {matchDetails?.manualSessionActive &&
        matchDetails?.sessionBettings?.filter(
          (betting: any) => JSON.parse(betting)?.selectionId === null
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
              (betting: any) => JSON.parse(betting)?.selectionId === null
            )}
            eventType={matchDetails?.matchType}
            minBet={formatToINR(matchDetails?.betFairSessionMinBet)}
            typeOfBet={matchDetails?.type}
            matchDetails={matchDetails}
          />
        )}

      {matchDetails?.apiSessionActive &&
        Object.entries(matchDetails?.updatedSessionBettings || {})
          ?.filter(
            ([key, value]: any) =>
              value?.section?.length > 0 &&
              key !== sessionBettingType.cricketCasino
          )
          ?.map(([key, value]: any) => {
            return (
              <SessionMarket
                key={key}
                allBetsData={matchDetails?.profitLossDataSession}
                newData={value?.section}
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
            );
          })}

      {matchDetails?.apiSessionActive &&
        (matchDetails?.apiSession?.cricketCasino?.section || [])
          ?.filter((item: any) => item?.activeStatus !== "unSave")
          ?.map((item: any) => {
            return (
              <CricketCasinoMarket
                key={item}
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

      {/* {matchDetails?.apiSessionActive &&
        matchDetails?.apiSession?.length > 0 && (
          <FancyMarkets
            show={show}
            setShow={setShow}
            upcoming={!upcoming}
            title={"Fancy Market"}
            matchDetails={matchDetails}
            typeOfBet={matchDetails?.type}
            data={matchDetails?.apiSession}
            newData={matchDetails?.apiSession}
            eventType={matchDetails?.matchType}
            allBetsData={matchDetails?.profitLossDataSession}
            min={formatToINR(matchDetails?.betFairSessionMinBet)}
          />
        )} */}
    </Box>
  );
};

export default memo(MatchOdds);
