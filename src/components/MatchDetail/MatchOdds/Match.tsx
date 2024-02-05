import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MatchesComponent from "./index";
import { memo } from "react";

const Match = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const doNavigateWithState = (e: any) => {
    navigate("/old/matchDetail", { state: { matchId: e, activeTab: "CRICKET" } });
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
