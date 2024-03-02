import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import YellowHeaderProfitLoss from "../../../components/report/ProfitLossReport/YellowheaderProfitLoss";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { getUserTotalProfitLoss } from "../../../store/actions/user/userAction";
import moment from "moment";
import ProfitLossComponent from "../../../components/report/ProfitLossReport/ProfitLossComponent";
import { useSelector } from "react-redux";

const ProfitLoss = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userTotalProfitLoss } = useSelector(
    (state: RootState) => state.user.profitLoss
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    try {
      setShow(false);
      let filter = "";
      if (startDate && endDate) {
        filter += `&createdAt=between${moment(startDate)?.format(
          "YYYY-MM-DD"
        )}|${moment(endDate).add(1, "days")?.format("YYYY-MM-DD")}`;
      } else if (startDate) {
        filter += `&createdAt=gte${moment(startDate)?.format("YYYY-MM-DD")}`;
      } else if (endDate) {
        filter += `&createdAt=lte${moment(endDate)?.format("YYYY-MM-DD")}`;
      }
      dispatch(getUserTotalProfitLoss({ filter: filter }));
    } catch (error) {
      console.error("Error:", (error as Error)?.message);
    }
  };

  useEffect(() => {
    dispatch(getUserTotalProfitLoss({ filter: "" }));
  }, []);

  return (
    <Box sx={{ width: "100%", paddingX: "1vw" }}>
      <>
        <YellowHeaderProfitLoss
          title="PROFIT/LOSS"
          type="user"
          onClick={handleClick}
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
        <ProfitLossComponent
          // sessionBets={sessionBets}
          show={show}
          setShow={setShow}
          eventData={userTotalProfitLoss && userTotalProfitLoss}
          // reportData={reportData}
          // betData={betData}
          // sessionBetData={sessionBetData}
          // handleReport={handleReport}
          // pageCount={pageCount}
          // handleBet={handleBet}
          // currentPage={currentPage}
          // setCurrentPage={setCurrentPage}
        />
      </>
    </Box>
  );
};

export default ProfitLoss;
