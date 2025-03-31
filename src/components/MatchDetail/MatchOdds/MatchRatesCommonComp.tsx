import { Box, useMediaQuery, useTheme } from "@mui/material";
import SeparateBox from "./SeparateBox";

const MatchRatesCommonComp = (props: any) => {
  const { runnerPosition, match } = props;
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
      {/* {!matchesMobile && (
        <SeparateBox
          value={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToBack[2]?.price
              : 0
          }
          value2={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToBack[2]?.price
              : 0
          }
          color={matchesMobile ? "white" : "#CEEBFF"}
        />
      )} */}
      <Box
        sx={{
          width: ".25%",
          display: "flex",
          background: "pink",
          justifyContent: "stretch",
        }}
      ></Box>
      {/* {!matchesMobile && (
        <SeparateBox
          value={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToBack[1]?.price
              : 0
          }
          value2={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToBack[1]?.price
              : 0
          }
          color={matchesMobile ? "white" : "#C2E6FF"}
        />
      )} */}
      <Box sx={{ width: ".25%", display: "flex", background: "pink" }}></Box>
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
        value2={
          0
        }
        color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
      />

      <Box sx={{ width: ".25%", display: "flex", background: "pink" }}></Box>
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
        value2={
          0
        }
        color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
      />
      <Box sx={{ width: ".25%", display: "flex", background: "pink" }}></Box>
      {/* {!matchesMobile && (
        <SeparateBox
          value={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToLay[1]?.price
              : 0
          }
          value2={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToLay[1]?.price
              : 0
          }
          color={matchesMobile ? "white" : "#F2CBCB"}
        />
      )} */}
      {/* <Box sx={{ width: ".10%", display: "flex", background: "pink" }}></Box> */}
      {/* {!matchesMobile && (
        <SeparateBox
          value={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToLay[2]?.price
              : 0
          }
          value2={
            data && data[0]?.runners
              ? data[0]?.runners[runnerPosition]?.ex?.availableToLay[2]?.price
              : 0
          }
          color={matchesMobile ? "white" : "#ECD6D6"}
        />
      )} */}
      {/* <Box sx={{ width: ".25%", display: "flex", background: "pink" }}></Box> */}
    </Box>
  );
};

export default MatchRatesCommonComp;
