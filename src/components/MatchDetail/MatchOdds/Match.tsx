import { Box, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import MatchesComponent from "./index";

const Match = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

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
          <MatchesComponent />
        </Box>
      ) : (
        <Box sx={{ overflowX: "hidden", minHeight: "100vh", width: "100%" }}>
          <MatchesComponent />
        </Box>
      )}
    </>
  );
};
export default memo(Match);
