import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import MatchOdds from "../../components/MatchDetail/MatchOdds/MatchOdds";
import LiveMatchHome from "../../components/MatchDetail/LiveMatchScore/LiveMatchHome";
import AllRateSeperate from "../../components/MatchDetail/AllRateBets/AllRateSeperate";
import SessionBetSeperate from "../../components/MatchDetail/SessionOdds/SessionBetSeperate";
import BetPlaced from "../../components/MatchDetail/Common/BetPlaced";
import { memo } from "react";
import LiveScore from "../../components/MatchDetail/LiveMatchScore";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import {
  matchDetailAction,
  selectedBetAction,
  updateMatchRates,
} from "../../store/actions/match/matchListAction";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import { expertSocketService, socketService } from "../../socketManager";
import {
  updateBalance,
  betDataFromSocket,
  updateMaxLossForBet,
} from "../../store/actions/user/userAction";

const MatchDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const { matchDetails } = useSelector(
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
    console.log("event", event);
    try {
      if (event?.betPlaced?.placedBet?.matchId === id) {
        dispatch(updateBetsPlaced(event?.betPlaced?.placedBet));
        dispatch(updateBalance(event));
        dispatch(betDataFromSocket(event));
        dispatch(updateMaxLossForBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setMatchBetsPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === id) {
        dispatch(updateBetsPlaced(event?.jobData?.newBet));
        dispatch(updateBalance(event?.jobData));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const betDeleted = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(matchDetailAction(id));
        dispatch(getPlacedBets(id));
        dispatch(updateBalance(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === id) {
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
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.matchId]);

  useEffect(() => {
    try {
      if (state?.matchId && getProfile?.roleName) {
        dispatch(selectedBetAction(null));
        dispatch(matchDetailAction(state?.matchId));
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
    };
  }, [state?.matchId, getProfile?.roleName]);
  // console.log("placedBets", placedBets);
  return (
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
                // data={data}
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
                  placedBets={placedBets.filter(
                    (bet: any) => bet?.marketType === "session"
                  )}
                  mark
                />

                <AllRateSeperate
                  allBetsData={placedBets.filter(
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
                allBetsData={placedBets.filter(
                  (bet: any) => bet?.marketType !== "session"
                )}
              />
              <SessionBetSeperate
                placedBets={placedBets.filter(
                  (bet: any) => bet?.marketType === "session"
                )}
                mark
              />
            </Box>
          </Box>
        )}
      </>
    </Box>
  );
};

export default memo(MatchDetail);
