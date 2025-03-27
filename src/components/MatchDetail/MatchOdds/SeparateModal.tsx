import { Box, Typography } from "@mui/material";
import MUIModal from "@mui/material/Modal";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Lock } from "../../../assets/index";
import {
  selectedBetAction,
  selectedBetMinMax,
} from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { sessionBettingType } from "../../../utils/Constants";
import OddsPlaceBet from "./Bets/OddsPlacebet";

const SeparateModal = ({
  color,
  po,
  empty,
  value,
  value2,
  lock,
  session,
  currentMatch,
  type,
  name,
  data,
  typeOfBet,
  mainData,
  betType,
  selectedFastAmount,
  setFastBetLoading,
  eventType,
  bettingOn,
  marketDetails,
  upcoming,
  selectionId,
  width,
  mid,
  teamName,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const { loading } = useSelector((state: RootState) => state.match.bet);

  const handleClick = (team: any, data: any) => {
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
    dispatch(
      selectedBetMinMax({
        team,
        data,
      })
    );
  };

  const handleBoxClick = () => {
    if (lock || [0, "0", null, undefined].includes(value) || upcoming) {
      return false;
    }
    if (loading) {
      return false;
    } else {
      if (selectedFastAmount) {
        setFastBetLoading(true);

        let payload = {
          id: currentMatch?.id,
          matchType: currentMatch?.gameType,

          betType: type?.color === "#A7DCFF" ? "back" : "lay",
          odds: Number(value),
          betOn: name,
          stack: Number(selectedFastAmount),
          team_bet: name,
          selectionId: selectionId,
          stake: Number(selectedFastAmount),
          teamA_name: currentMatch?.teamA,
          teamB_name: currentMatch?.teamB,
          teamC_name: currentMatch?.teamC,
          marketType: typeOfBet === "MATCH ODDS" ? "MATCH ODDS" : typeOfBet,
        };
        if (session) {
          delete payload.betOn;
          payload.matchType = data?.matchType;
          payload.teamA_name = mainData?.teamA;
          payload.teamB_name = mainData?.teamB;
          payload.id = data?.matchId;
          payload.betType = type?.color === "#A7DCFF" ? "yes" : "no";
          payload.marketType = typeOfBet;
          payload.odds = Number(value);
        }
      } else {
        setIsPopoverOpen(true);
        if (bettingOn === "session") {
          handleClick(
            {
              betId: data?.id,
              name: data?.name ?? data?.RunnerName ?? data?.nat,
              rate: value,
              type: betType,
              stake: 0,
              percent: [
                sessionBettingType.fancy1,
                sessionBettingType.cricketCasino,
                sessionBettingType.oddEven,
              ].includes(data?.type)
                ? value
                : value2,
              eventType: eventType,
              matchId: data?.matchId,
              betPlaceIndex: po,
              mid: mid || data?.mid,
              teamName: teamName,
              runnerId: data?.id,
            },
            data
          );
        } else {
          handleClick(
            {
              betOnTeam: name,
              rate: value,
              type: betType,
              stake: 0,
              teamA:
                marketDetails?.type === "tiedMatch2" ||
                marketDetails?.type === "tiedMatch1" ||
                marketDetails?.type === "tiedMatch3" ||
                marketDetails?.type === "completeMatch" ||
                marketDetails?.type === "completeManual"
                  ? "YES"
                  : ["matchOdd", "bookmaker", "bookmaker2"].includes(
                      marketDetails?.type
                    )
                  ? currentMatch?.teamA
                  : marketDetails?.runners?.[0]?.nat
                  ? marketDetails?.runners?.[0]?.nat
                  : currentMatch?.teamA,
              teamB:
                marketDetails?.type === "tiedMatch2" ||
                marketDetails?.type === "tiedMatch1" ||
                marketDetails?.type === "tiedMatch3" ||
                marketDetails?.type === "completeMatch" ||
                marketDetails?.type === "completeManual"
                  ? "NO"
                  : ["matchOdd", "bookmaker", "bookmaker2"].includes(
                      marketDetails?.type
                    )
                  ? currentMatch?.teamB
                  : marketDetails?.runners?.[1]?.nat
                  ? marketDetails?.runners?.[1]?.nat
                  : currentMatch?.teamB,
              teamC:
                marketDetails?.type === "tiedMatch2" ||
                marketDetails?.type === "tiedMatch3" ||
                marketDetails?.type === "tiedMatch1" ||
                marketDetails?.type === "completeMatch" ||
                marketDetails?.type === "completeManual"
                  ? ""
                  : marketDetails?.runners?.[2]?.nat
                  ? marketDetails?.runners?.[2]?.nat
                  : currentMatch?.teamC
                  ? currentMatch?.teamC
                  : "",
              betId: marketDetails?.id,
              eventType: marketDetails?.eventType,
              matchId: currentMatch?.id,
              placeIndex: po,
              matchBetType: marketDetails?.type,
              bettingName: marketDetails?.name,
              selectionId: selectionId,
            },
            data
          );
        }
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          cursor: loading ? "not-allowed" : "pointer",
          padding: { xs: "0px", lg: "0px", md: "0px" },
          width: { xs: "100%", lg: width ?? "20%" },
          height: "100%",
        }}
      >
        <Box
          onClick={handleBoxClick}
          style={{ position: "relative" }}
          sx={{
            background: lock || [0, "0"].includes(value) ? "#FDF21A" : color,
            border:
              color != "white" ? "1px solid #2626264D" : "0px solid white",
            width: { lg: "99%", sm: "101%" },
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            cursor: !empty && !lock && value && value2 && "pointer",
          }}
        >
          {!empty && !lock && ![0, "0", null, undefined].includes(value) && (
            <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
              <Typography
                sx={{
                  fontSize: "15px",
                  color: color == "white" ? "white" : "black",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {value}
              </Typography>
              {typeOfBet != "MANUAL BOOKMAKER" ? (
                <Typography
                  sx={{
                    fontSize: "8px",
                    marginTop: -0.4,
                    color: color == "white" ? "white" : "black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {value2}
                </Typography>
              ) : null}
            </Box>
          )}
          {(lock || [0, "0"].includes(value)) && (
            <img
              src={Lock}
              style={{ width: "10px", height: "15px" }}
              alt="lock"
            />
          )}
        </Box>

        <MUIModal
          open={isPopoverOpen}
          onClose={() => {
            setIsPopoverOpen(false);
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              top: "33%",
              overflow: "hidden",
              justifyContent: "center",
              outline: "none",
            }}
          >
            <OddsPlaceBet
              handleClose={() => {
                setIsPopoverOpen(false);
              }}
              session={session}
              type={type}
            />
          </Box>
        </MUIModal>
      </Box>
    </>
  );
};

export default memo(SeparateModal);
