import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import YellowHeaderProfitLoss from "../../../components/report/ProfitLossReport/YellowheaderProfitLoss";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { getUserTotalProfitLoss, updateUserSearchId } from "../../../store/actions/user/userAction";
import moment from "moment";
import ProfitLossComponent from "../../../components/report/ProfitLossReport/ProfitLossComponent";
import { useSelector } from "react-redux";
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
  const [search, setSearch] = useState<any>("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    try {
      setShow(false);
      let filter : FilterObject = {};
      dispatch(updateUserSearchId({ search }));
      if (search?.id) {
        filter['userId'] = search?.id;
       
      }
      if (startDate && endDate) {
        filter['startDate'] = moment(startDate)?.format("YYYY-MM-DD");
        filter['endDate'] = moment(endDate)?.format("YYYY-MM-DD");
      } else {
        if (startDate) {
          filter['startDate'] = moment(startDate)?.format("YYYY-MM-DD");
        }
        if (endDate) {
          filter['endDate'] = moment(endDate)?.format("YYYY-MM-DD");
        }
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
          setSearch={setSearch}
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
          show={show}
          setShow={setShow}
          eventData={userTotalProfitLoss && userTotalProfitLoss}
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    </Box>
  );
};

export default ProfitLoss;
