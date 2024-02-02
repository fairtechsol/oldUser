import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import { getPlacedBets } from "../../store/actions/betPlace/betPlaceActions";
import { expertSocketService, socketService } from "../../socketManager";

interface BetTableProps {
  title: string;
  type: string;
  data: any;
  backLayCount?: number;
}

const MatchDetail = ({ backLayCount }: BetTableProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const [IObets] = useState([]);
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
        // socketService.userBalance.userSessionBetPlaced(setSessionBetsPlaced);
        // socketService.userBalance.userMatchBetPlaced(setMatchBetsPlaced);
        // socketService.userBalance.matchResultDeclared(resultDeclared);
        // socketService.userBalance.matchDeleteBet(betDeleted);
        // socketService.userBalance.sessionDeleteBet(betDeleted);
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      expertSocketService.match.leaveAllRooms();
      expertSocketService.match.leaveMatchRoom(state?.matchId);
    };
  }, [state?.matchId, getProfile?.roleName]);

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
                matchDetails={matchDetails}
                data={matchDetails}
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
                <SessionBetSeperate placedBets={placedBets} mark />

                {IObets.length > 0 && (
                  <AllRateSeperate
                    allBetsData={IObets?.filter((v) => [
                      "MATCH ODDS",
                      "BOOKMAKER",
                      "MANUAL BOOKMAKER",
                      "QuickBookmaker0",
                      "QuickBookmaker1",
                      "QuickBookmaker2",
                    ])}
                    count={
                      IObets?.filter((v) => [
                        "MATCH ODDS",
                        "BOOKMAKER",
                        "MANUAL BOOKMAKER",
                        "QuickBookmaker0",
                        "QuickBookmaker1",
                        "QuickBookmaker2",
                      ]).length
                    }
                    mark
                  />
                )}
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
              <MatchOdds matchDetails={matchDetails} data={matchDetails} />
            </Box>
            <Box sx={{ width: "30%", paddingRight: "1%" }}>
              <LiveScore />
              <LiveMatchHome />
              <AllRateSeperate mark />
              <SessionBetSeperate placedBets={placedBets} mark />
            </Box>
          </Box>
        )}
      </>
    </Box>
  );
};

export default memo(MatchDetail);
