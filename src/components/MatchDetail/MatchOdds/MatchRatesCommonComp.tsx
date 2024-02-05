import SeparateBox from "./SeparateBox";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const MatchRatesCommonComp = (props: any) => {
  const { data, runnerPosition } = props;
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "40px",
        width: { lg: "60%", xs: "80%" },
        justifyContent: { xs: "flex-end", lg: "center" },
        alignItems: "center",
      }}
    >
      {!matchesMobile && (
        <SeparateBox
          value={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToBack[2].price
              : 0
          }
          value2={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToBack[2].price
              : 0
          }
          color={matchesMobile ? "white" : "#CEEBFF"}
        />
      )}
      <Box
        sx={{
          width: ".25%",
          display: "flex",
          background: "pink",
          justifyContent: "stretch",
        }}
      ></Box>
      {!matchesMobile && (
        <SeparateBox
          value={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToBack[1].price
              : 0
          }
          value2={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToBack[1].price
              : 0
          }
          color={matchesMobile ? "white" : "#C2E6FF"}
        />
      )}
      <Box sx={{ width: ".25%", display: "flex", background: "pink" }}></Box>
      <SeparateBox
        value={
          data && data[0]?.runners
            ? data[0]?.runners[runnerPosition]?.ex?.availableToBack[0].price
            : 0
        }
        value2={
          data && data[0]?.runners
            ? data[0]?.runners[runnerPosition]?.ex?.availableToBack[0].size
            : 0
        }
        color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
      />
      <Box sx={{ width: ".25%", display: "flex", background: "pink" }}></Box>
      <SeparateBox
        value={
          data && data[0]?.runners
            ? data[0]?.runners[runnerPosition]?.ex?.availableToLay[0].price
            : 0
        }
        value2={
          data && data[0]?.runners
            ? data[0]?.runners[runnerPosition]?.ex?.availableToLay[0].size
            : 0
        }
        color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
      />
      <Box sx={{ width: ".25%", display: "flex", background: "pink" }}></Box>
      {!matchesMobile && (
        <SeparateBox
          value={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToLay[1].price
              : 0
          }
          value2={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToLay[1].price
              : 0
          }
          color={matchesMobile ? "white" : "#F2CBCB"}
        />
      )}
      <Box sx={{ width: ".25%", display: "flex", background: "pink" }}></Box>
      {!matchesMobile && (
        <SeparateBox
          value={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToLay[2].price
              : 0
          }
          value2={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToLay[2].price
              : 0
          }
          color={matchesMobile ? "white" : "#ECD6D6"}
        />
      )}
      <Box sx={{ width: ".25%", display: "flex", background: "pink" }}></Box>
    </Box>
  );
};

export default MatchRatesCommonComp;
