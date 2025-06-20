import { Box, Typography } from "@mui/material";
import React from "react";

const SmallBoxSeason = ({ allBetsData }: any) => {
  // function countObjectsWithNullDeletedReason(array:any) {
  //   let count = 0;
  //   for (const obj of array) {
  //     if (obj?.deleteReason === null) {
  //       count++;
  //     }
  //   }
  //   return count;
  // }

  // // Call the function and get the count
  // const countNullDeletedReason = countObjectsWithNullDeletedReason(sessionBets);
  return (
    <Box
      sx={{
        marginLeft: { xs: 0, lg: "-15px", md: 0 },
        justifyContent: {
          xs: "center",
          lg: "center",
          md: "center",
        },
        display: "flex",
        width: { xs: "85%", lg: "80%", md: "85%" },
        gap: "4px",
      }}
    >
      <Box
        sx={{
          width: { lg: "70px", xs: "50px", md: "70px" },
          flexDirection: "column",
          // position: "absolute",
          display: "flex",
          left: { xs: "53%", lg: "49vw", md: "53%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "8px", xs: "7px", md: "8px" },
            fontWeight: "bold",
            color: "#FF4D4D",
          }}
        >
          Session Bet
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "10px", md: "10px", lg: "12px" },
            fontWeight: "bold",
            color: "#319E5B",
          }}
        >
          {allBetsData?.reduce((accumulator: any, bet: any) => {
            return accumulator + (+bet?.totalBet || 0);
          }, 0)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "70px", xs: "50px", md: "70px" },
          flexDirection: "column",
          // position: "absolute",
          display: "flex",
          left: { xs: "60%", lg: "55vw", md: "65%" },
          justifyContent: "space-around",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "7px", md: "8px", lg: "8px" },
            fontWeight: "bold",
            color: "#FF4D4D",
            textAlign: "center",
            lineHeight: "1",
          }}
        >
          Total Amount
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "10px", md: "10px", lg: "12px" },
            fontWeight: "bold",
            color: "#319E5B",
            lineHeight: "1.5",
          }}
        >
          {new Intl.NumberFormat("en-IN").format(allBetsData?.reduce((accumulator: any, bet: any) => {
            return accumulator + (+bet?.maxLoss || 0);
          }, 0))}
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(SmallBoxSeason);
