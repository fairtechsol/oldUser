import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AllRateSeperate from "../../components/MatchDetail/AllRateBets/AllRateSeperate";
import BetPlaced from "../../components/MatchDetail/Common/BetPlaced";
import LiveScore from "../../components/MatchDetail/LiveMatchScore";
import LiveMatchHome from "../../components/MatchDetail/LiveMatchScore/LiveMatchHome";
import MatchOdds from "../../components/MatchDetail/MatchOdds/MatchOdds";
import SessionBetSeperate from "../../components/MatchDetail/SessionOdds/SessionBetSeperate";
import { expertSocketService, socketService } from "../../socketManager";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import {
  matchDetailAction,
  matchDetailReset,
  selectedBetAction,
  updateMatchRates,
} from "../../store/actions/match/matchListAction";
import {
  betDataFromSocket,
  getButtonValue,
  updateBalance,
  updateBalanceSession,
  updateMaxLossForBet,
  updateProfitLossForBet,
  updateRunAmount,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import Loader from "../../components/Loader";

const MatchDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
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
        dispatch(updateRunAmount(event?.profitLossData));
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

  const betDeleted = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(matchDetailAction(state?.matchId));
        dispatch(getPlacedBets(state?.matchId));
        dispatch(updateBalance(event));
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

  useEffect(() => {
    try {
      if (state?.matchId) {
        dispatch(getPlacedBets(state?.matchId));
        dispatch(getButtonValue());
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.matchId]);

  useEffect(() => {
    dispatch(matchDetailReset());
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
        socketService.userBalance.matchDeleteBet(betDeleted);
        socketService.userBalance.sessionDeleteBet(betDeleted);
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      expertSocketService.match.leaveAllRooms();
      expertSocketService.match.leaveMatchRoom(state?.matchId);
      expertSocketService.match.getMatchRatesOff(
        state?.matchId,
        setMatchRatesInRedux
      );
      socketService.userBalance.userSessionBetPlacedOff(setSessionBetsPlaced);
      socketService.userBalance.userMatchBetPlacedOff(setMatchBetsPlaced);
      socketService.userBalance.matchResultDeclaredOff(resultDeclared);
      socketService.userBalance.matchDeleteBetOff(betDeleted);
      socketService.userBalance.sessionDeleteBetOff(betDeleted);
    };
  }, [success]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchId) {
          dispatch(selectedBetAction(null));
          dispatch(matchDetailAction(state?.matchId));
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
                <LiveScore />
                <div style={{ width: "100%" }}>
                  <MatchOdds
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
                    <SessionBetSeperate
                      placedBets={Array.from(new Set(placedBets)).filter(
                        (bet: any) => bet?.marketType === "session"
                      )}
                      mark
                    />

                    <AllRateSeperate
                      allBetsData={Array.from(new Set(placedBets)).filter(
                        (bet: any) => bet?.marketType != "session"
                      )}
                      mark
                    />
                  </Box>
                  <LiveMatchHome />
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
                    matchDetails={matchDetails && matchDetails}
                    data={matchDetails && matchDetails}
                  />
                </Box>
                <Box sx={{ width: "30%", paddingRight: "1%" }}>
                  <LiveScore />
                  <LiveMatchHome />
                  <AllRateSeperate
                    mark
                    allBetsData={Array.from(new Set(placedBets)).filter(
                      (bet: any) => bet?.marketType !== "session"
                    )}
                  />
                  <SessionBetSeperate
                    placedBets={Array.from(new Set(placedBets)).filter(
                      (bet: any) => bet?.marketType === "session"
                    )}
                    mark
                  />
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
