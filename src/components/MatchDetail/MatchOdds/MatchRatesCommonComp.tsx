import { Box, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { MatchRatesCommonCompProps } from "../../../interface/common/MatchesComponent";
import SeparateBox from "./SeparateBox";

const MatchRatesCommonComp = ({
  runnerPosition,
  match,
}: MatchRatesCommonCompProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "40px",
        width: { lg: "100%", xs: "80%" },
        justifyContent: { xs: "flex-end", lg: "flex-end" },
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: ".25%",
          display: "flex",
          background: "pink",
          justifyContent: "stretch",
        }}
      />
      <Box sx={{ width: ".25%", display: "flex", background: "pink" }} />
      <SeparateBox
        value={
          (runnerPosition == 0
            ? match?.back1 || match?.section?.[0]?.odds?.[0]?.odds || 0
            : runnerPosition == 1
            ? match?.back11 || match?.section?.[1]?.odds?.[0]?.odds || 0
            : runnerPosition == 2
            ? match?.back12 || match?.section?.[2]?.odds?.[0]?.odds || 0
            : 0) ?? 0
        }
        value2={0}
        color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
      />
      <Box sx={{ width: ".25%", display: "flex", background: "pink" }} />
      <SeparateBox
        value={
          (runnerPosition == 0
            ? match?.lay1 || match?.section?.[0]?.odds?.[1]?.odds || 0
            : runnerPosition == 1
            ? match?.lay11 || match?.section?.[1]?.odds?.[1]?.odds || 0
            : runnerPosition == 2
            ? match?.lay12 || match?.section?.[2]?.odds?.[1]?.odds || 0
            : 0) ?? 0
        }
        value2={0}
        color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
      />
      <Box sx={{ width: ".25%", display: "flex", background: "pink" }} />
    </Box>
  );
};

export default memo(MatchRatesCommonComp);
