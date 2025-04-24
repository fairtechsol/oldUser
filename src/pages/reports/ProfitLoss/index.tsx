import { Box, Typography } from "@mui/material";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfitLossComponent from "../../../components/report/ProfitLossReport/ProfitLossComponent";
import YellowHeaderProfitLoss from "../../../components/report/ProfitLossReport/YellowheaderProfitLoss";
import { getUserTotalProfitLoss } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
interface FilterObject {
  userId?: any;
  startDate?: string;
  endDate?: string;
}
const ProfitLoss = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount] = useState(1);
  const { userTotalProfitLoss } = useSelector(
    (state: RootState) => state.user.profitLoss
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    try {
      setShow(false);
      let filter: FilterObject = {};

      if (startDate && endDate) {
        filter["startDate"] = moment(startDate)?.format("YYYY-MM-DD");
        filter["endDate"] = moment(endDate)?.format("YYYY-MM-DD");
      } else {
        if (startDate) {
          filter["startDate"] = moment(startDate)?.format("YYYY-MM-DD");
        }
        if (endDate) {
          filter["endDate"] = moment(endDate)?.format("YYYY-MM-DD");
        }
      }
      dispatch(getUserTotalProfitLoss({ filter: filter }));
    } catch (error) {
      console.error("Error:", (error as Error)?.message);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("jwtUser")) {
      dispatch(getUserTotalProfitLoss({ filter: "" }));
    }
  }, [sessionStorage]);

  return (
    <Box sx={{ width: "100%", paddingX: "1vw" }}>
      <YellowHeaderProfitLoss
        title="PROFIT/LOSS"
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
        PROFIT/LOSS REPORT
      </Typography>
      <ProfitLossComponent
        show={show}
        setShow={setShow}
        eventData={userTotalProfitLoss && userTotalProfitLoss}
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        startDate={startDate}
        endDate={endDate}
      />
    </Box>
  );
};

export default memo(ProfitLoss);
