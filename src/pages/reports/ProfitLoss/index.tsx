import { Box, Typography } from "@mui/material";
import { useState } from "react";
import YellowHeaderProfitLoss from "../../../components/report/ProfitLossReport/YellowheaderProfitLoss";
// import BackgroundLayout from "../../../components/Common/BackGroundLayout";




//dsda
const ProfitLoss = () => {
  //   const [pageLimit, setPageLimit] = useState(constants.customPageLimit);
  //   const [pageCount, setPageCount] = useState(constants.pageLimit);


  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  return (
    <Box sx={{ width: "100%", paddingX: "1vw" }}>

      <>
        <YellowHeaderProfitLoss
          title="PROFIT/LOSS"
          type="user"
          // onClick={handleClick}
          setEndDate={setEndDate}
          endDate={endDate}
          startDate={startDate}
          setStartDate={setStartDate}
        />
        <Typography
          sx={{
            fontSize: { xs: "12px", lg: "15px" },
            marginLeft: { lg: "2px", xs: "6px" },
            marginTop: "10px",
            marginBottom: "5px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {"PROFIT/LOSS REPORT"}
        </Typography>
        {/* <ProfitLossComponent
            sessionBets={sessionBets}
            show={show}
            setShow={setShow}
            eventData={eventData}
            reportData={reportData}
            betData={betData}
            sessionBetData={sessionBetData}
            // handleReport={handleReport}
            // pageCount={pageCount}
            // handleBet={handleBet}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> */}
      </>



    </Box>
  );
};

export default ProfitLoss;
