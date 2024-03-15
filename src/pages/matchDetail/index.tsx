import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import AllRateSeperate from "../../components/MatchDetail/AllRateBets/AllRateSeperate";
import BetPlaced from "../../components/MatchDetail/Common/BetPlaced";
import LiveScore from "../../components/MatchDetail/LiveMatchScore";
import LiveMatchHome from "../../components/MatchDetail/LiveMatchScore/LiveMatchHome";
import MatchOdds from "../../components/MatchDetail/MatchOdds/MatchOdds";
import SessionBetSeperate from "../../components/MatchDetail/SessionOdds/SessionBetSeperate";
import service from "../../service";
import { expertSocketService, socketService } from "../../socketManager";
import {
  getPlacedBets,
  resetRunAmount,
  updateBetsPlaced,
  updateDeleteReasonBet,
} from "../../store/actions/betPlace/betPlaceActions";
import {
  matchDetailAction,
  selectedBetAction,
  updateMatchRates,
} from "../../store/actions/match/matchListAction";
import {
  betDataFromSocket,
  getButtonValue,
  updateBalance,
  updateBalanceOnBetDelete,
  updateBalanceSession,
  updateBetDataOnDeclare,
  updateBetDataOnUndeclare,
  updateMaxLossForBet,
  updateProfitLossForBet,
  updateProfitLossOnDeleteSession,
  updateRunAmount,
  updateRunAmountOnDeleteBet,
  updateTeamRatesOnDeleteMatch,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";

const MatchDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState({ open: false, id: "" });
  const [liveScoreBoardData, setLiveScoreBoardData] = useState(null);
  const [liveMatchData] = useState(null);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const { matchDetails, success, matchDetailloading } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { placedBets } = useSelector((state: RootState) => state.bets);

  const setMatchRatesInRedux = (event: any) => {
    try {
      if (state?.matchId === event?.id) {
        dispatch(updateMatchRates(event));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const setSessionBetsPlaced = (event: any) => {
    try {
      if (event?.betPlaced?.placedBet?.matchId === state?.matchId) {
        dispatch(updateBetsPlaced(event?.betPlaced?.placedBet));
        dispatch(betDataFromSocket(event));
        dispatch(updateBalanceSession(event));
        dispatch(
          updateRunAmount({
            betId: event?.betPlaced?.placedBet?.betId,
            profitLossData: event?.profitLossData,
          })
        );
        dispatch(updateMaxLossForBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setMatchBetsPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === state?.matchId) {
        dispatch(updateBetsPlaced(event?.jobData?.newBet));
        dispatch(updateBalance(event?.jobData));
        dispatch(updateProfitLossForBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMatchbetDeleted = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updateTeamRatesOnDeleteMatch(event));
        dispatch(
          updateBalanceOnBetDelete({
            exposure: event?.exposure,
            currentBalance: event?.currentBalance,
          })
        );
        dispatch(updateDeleteReasonBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionBetDeleted = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(
          updateProfitLossOnDeleteSession({
            betId: event?.betId,
            profitLoss: event?.profitLoss,
            matchId: event?.matchId,
          })
        );
        dispatch(
          updateRunAmountOnDeleteBet({
            betId: event?.bets[0].betId,
            profitLoss: event?.profitLoss,
          })
        );
        dispatch(
          updateBalanceOnBetDelete({
            exposure: event?.exposure,
            currentBalance: event?.currentBalance,
          })
        );
        dispatch(updateDeleteReasonBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        navigate("/match");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionResultDeclare = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        setShow({ open: false, id: "" });
        dispatch(
          updateBetDataOnDeclare({
            betId: event?.betId,
            matchId: event?.matchId,
          })
        );
        dispatch(resetRunAmount());
        dispatch(getPlacedBets(state?.matchId));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionResultUnDeclare = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(
          updateBetDataOnUndeclare({
            betId: event?.betId,
            profitLoss: event?.profitLossData,
            matchId: event?.matchId,
          })
        );
        setTimeout(() => {
          dispatch(getPlacedBets(state?.matchId));
        }, 300);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      if (state?.matchId) {
        dispatch(getPlacedBets(state?.matchId));
        dispatch(getButtonValue());
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.matchId]);

  useEffect(() => {
    if (matchDetails && matchDetails?.stopAt) {
      navigate("/match/list");
    }
  }, [matchDetails]);

  useEffect(() => {
    try {
      if (state?.matchId && getProfile?.roleName) {
        dispatch(selectedBetAction(null));
        dispatch(matchDetailAction(state?.matchId));
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.matchId, getProfile?.roleName]);

  useEffect(() => {
    try {
      if (success) {
        expertSocketService.match.getMatchRatesOff(
          state?.matchId,
          setMatchRatesInRedux
        );
        socketService.userBalance.userSessionBetPlacedOff(setSessionBetsPlaced);
        socketService.userBalance.userMatchBetPlacedOff(setMatchBetsPlaced);
        socketService.userBalance.matchResultDeclaredOff(resultDeclared);
        socketService.userBalance.matchDeleteBetOff(handleMatchbetDeleted);
        socketService.userBalance.sessionDeleteBetOff(handleSessionBetDeleted);
        socketService.userBalance.sessionResultOff(handleSessionResultDeclare);
        socketService.userBalance.sessionNoResultOff(
          handleSessionResultDeclare
        );
        socketService.userBalance.sessionResultUnDeclareOff(
          handleSessionResultUnDeclare
        );
        expertSocketService.match.joinMatchRoom(
          state?.matchId,
          getProfile?.roleName
        );
        expertSocketService.match.getMatchRates(
          state?.matchId,
          setMatchRatesInRedux
        );
        socketService.userBalance.userSessionBetPlaced(setSessionBetsPlaced);
        socketService.userBalance.userMatchBetPlaced(setMatchBetsPlaced);
        socketService.userBalance.matchResultDeclared(resultDeclared);
        socketService.userBalance.matchDeleteBet(handleMatchbetDeleted);
        socketService.userBalance.sessionDeleteBet(handleSessionBetDeleted);
        socketService.userBalance.sessionResult(handleSessionResultDeclare);
        socketService.userBalance.sessionNoResult(handleSessionResultDeclare);
        socketService.userBalance.sessionResultUnDeclare(
          handleSessionResultUnDeclare
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [success]);

  useEffect(() => {
    return () => {
      expertSocketService.match.leaveMatchRoom(state?.matchId);
      expertSocketService.match.getMatchRatesOff(
        state?.matchId,
        setMatchRatesInRedux
      );
      socketService.userBalance.userSessionBetPlacedOff(setSessionBetsPlaced);
      socketService.userBalance.userMatchBetPlacedOff(setMatchBetsPlaced);
      socketService.userBalance.matchResultDeclaredOff(resultDeclared);
      socketService.userBalance.matchDeleteBetOff(handleMatchbetDeleted);
      socketService.userBalance.sessionDeleteBetOff(handleSessionBetDeleted);
      socketService.userBalance.sessionResultOff(handleSessionResultDeclare);
      socketService.userBalance.sessionNoResultOff(handleSessionResultDeclare);
      socketService.userBalance.sessionResultUnDeclareOff(
        handleSessionResultUnDeclare
      );
    };
  }, []);

  const getScoreBord = async (marketId: string) => {
    try {
      const response = await service.get(
        `https://score.fairgame.club/score/getMatchScore/${marketId}`
      );
      setLiveScoreBoardData(response?.data);
    } catch (e: any) {
      console.log("Error:", e?.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getScoreBord(matchDetails?.marketId);
    }, 60000);

    return () => clearInterval(interval);
  }, [matchDetails?.marketId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchId) {
          dispatch(selectedBetAction(null));
          dispatch(matchDetailAction(state?.matchId));
          dispatch(getPlacedBets(state?.matchId));
        }
      } else if (document.visibilityState === "hidden") {
        expertSocketService.match.getMatchRatesOff(
          state?.matchId,
          setMatchRatesInRedux
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (state?.matchId) {
      const intervalId = setInterval(() => {
        dispatch(selectedBetAction(null));
        dispatch(matchDetailAction(state?.matchId));
        dispatch(getPlacedBets(state?.matchId));
      }, 14100 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  return (
    <>
      {matchDetailloading && <Loader text="" />}
      {!matchDetailloading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <BetPlaced visible={visible} setVisible={setVisible} />
          <>
            {matchesMobile && (
              <div
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  // gap: { lg: "8px", xs: "0px", md: "0px" },
                  marginTop: "2%",
                  flexDirection: "column",
                }}
              >
                {liveScoreBoardData && <LiveScore />}
                {liveMatchData && <LiveMatchHome />}
                <div style={{ width: "100%" }}>
                  <MatchOdds
                    setShow={setShow}
                    show={show}
                    matchDetails={matchDetails && matchDetails}
                    data={matchDetails && matchDetails}
                  />
                </div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "98%",
                    }}
                  >
                    {Array.from(
                      placedBets.reduce(
                        (acc: any, obj: any) =>
                          acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                        new Set()
                      ),
                      (id) => placedBets.find((obj: any) => obj.id === id)
                    ).filter((bet: any) => bet?.marketType === "session")
                      .length > 0 && (
                      <SessionBetSeperate
                        placedBets={Array.from(
                          placedBets.reduce(
                            (acc: any, obj: any) =>
                              acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                            new Set()
                          ),
                          (id) => placedBets.find((obj: any) => obj.id === id)
                        ).filter((bet: any) => bet?.marketType === "session")}
                        mark
                      />
                    )}
                    {Array.from(
                      placedBets.reduce(
                        (acc: any, obj: any) =>
                          acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                        new Set()
                      ),
                      (id) => placedBets.find((obj: any) => obj.id === id)
                    ).filter((bet: any) => bet?.marketType !== "session")
                      .length > 0 && (
                      <AllRateSeperate
                        allBetsData={Array.from(
                          placedBets.reduce(
                            (acc: any, obj: any) =>
                              acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                            new Set()
                          ),
                          (id) => placedBets.find((obj: any) => obj.id === id)
                        ).filter((bet: any) => bet?.marketType !== "session")}
                        mark
                      />
                    )}
                  </Box>
                </Box>
              </div>
            )}
            {!matchesMobile && (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: "8px",
                  marginTop: "1%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "70%",
                  }}
                >
                  <MatchOdds
                    setShow={setShow}
                    show={show}
                    matchDetails={matchDetails && matchDetails}
                    data={matchDetails && matchDetails}
                  />
                </Box>
                <Box sx={{ width: "30%", paddingRight: "1%" }}>
                  {liveScoreBoardData && <LiveScore />}
                  {liveMatchData && <LiveMatchHome />}
                  {Array.from(
                    placedBets.reduce(
                      (acc: any, obj: any) =>
                        acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                      new Set()
                    ),
                    (id) => placedBets.find((obj: any) => obj.id === id)
                  ).filter((bet: any) => bet?.marketType !== "session").length >
                    0 && (
                    <AllRateSeperate
                      mark
                      allBetsData={Array.from(
                        placedBets.reduce(
                          (acc: any, obj: any) =>
                            acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                          new Set()
                        ),
                        (id) => placedBets.find((obj: any) => obj.id === id)
                      ).filter((bet: any) => bet?.marketType !== "session")}
                    />
                  )}
                  {Array.from(
                    placedBets.reduce(
                      (acc: any, obj: any) =>
                        acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                      new Set()
                    ),
                    (id) => placedBets.find((obj: any) => obj.id === id)
                  ).filter((bet: any) => bet?.marketType === "session").length >
                    0 && (
                    <SessionBetSeperate
                      placedBets={Array.from(
                        placedBets.reduce(
                          (acc: any, obj: any) =>
                            acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                          new Set()
                        ),
                        (id) => placedBets.find((obj: any) => obj.id === id)
                      ).filter((bet: any) => bet?.marketType === "session")}
                      mark
                    />
                  )}
                </Box>
              </Box>
            )}
          </>
        </Box>
      )}
    </>
  );
};

export default MatchDetail;
