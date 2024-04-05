import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MatchesComponent from "./index";
import { memo } from "react";
import { matchDetailReset } from "../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";

const Match = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const doNavigateWithState = (e: any) => {
    dispatch(matchDetailReset());
    navigate("/matchDetail", { state: { matchId: e, activeTab: "CRICKET" } });
    sessionStorage.setItem("matchId", e);
  };

  return (
    <>
      {!matchesMobile ? (
        <Box
          sx={{
            display: "flex",
            overflowX: "hidden",
            flexDirection: "column",
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            overflowY: "auto",
            alignItems: "flex-start",
          }}
        >
          <div style={{ height: "1vh" }} />
          <MatchesComponent doNavigateWithState={doNavigateWithState} />
        </Box>
      ) : (
        <Box sx={{ overflowX: "hidden", minHeight: "100vh", width: "100%" }}>
          <MatchesComponent doNavigateWithState={doNavigateWithState} />
        </Box>
      )}
    </>
  );
};
export default memo(Match);
