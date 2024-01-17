
import { Box, useMediaQuery, useTheme } from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MatchesComponent from "./index";
import { memo } from "react";

const Match = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const doSetId = (k: any) => {
    setId(k);
  };
  const doNavigateWithState = (e: any) => {
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
          <MatchesComponent
          
          />
        </Box>
      ) : (
        <Box sx={{ overflowX: "hidden", minHeight: "100vh", width: "100%" }}>
          <MatchesComponent
        
          />

        </Box>)}
    </>
  );
};
export default memo(Match);

