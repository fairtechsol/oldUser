import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchWiseProfitLoss } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import Footer from "../../AccountStatement/Footer";
import RowComponentMatches from "./RowComponentMatches";
import RowHeaderMatches from "./RowHeaderMatches";

const ProfitLossComponent = ({
  eventData,
  betData,
  sessionBetData,
  handleReport,
  currentPage,
  pageCount,
  setCurrentPage,
  sessionBets,
  setShow,
  show,
  endDate,
  startDate,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { matchWiseProfitLoss } = useSelector(
    (state: RootState) => state.user.profitLoss
  );
  const { userData } = useSelector((state: RootState) => state.user.profitLoss);
  const [selectedId, setSelectedId] = useState({
    type: "",
    id: "",
    betId: "",
    sessionBet: false,
  });
  const [event, setEvent] = useState("");
  const getHandleReport = (eventType: any) => {
    setEvent(eventType);
    if (show) {
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
    }
    if (!show) {
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
      dispatch(
        getMatchWiseProfitLoss({
          type: eventType,
          searchId: userData?.id,
          startDate: startDate && moment(startDate)?.format("YYYY-MM-DD"),
          endDate: endDate && moment(endDate)?.format("YYYY-MM-DD"),
        })
      );
    }
    setShow(!show);
  };

  function callPage(val: any) {
    setCurrentPage(parseInt(val));
    handleReport(event, parseInt(val));
  }

  const getBetReport = (value: any) => {
    setSelectedId({
      type: value?.type,
      id: value?.match_id,
      betId: value?.betId,
      sessionBet: value?.sessionBet,
    });
  };

  return eventData?.length > 0 ? (
    <Box>
      {eventData?.map((item: any, index: number) => {
        return (
          <RowHeaderMatches
            key={index}
            item={item}
            index={index}
            getHandleReport={getHandleReport}
            show={show}
          />
        );
      })}

      <Box>
        {show &&
          matchWiseProfitLoss?.map((item: any, index: number) => {
            return (
              <RowComponentMatches
                key={index}
                item={item}
                index={index + 1}
                selectedId={selectedId}
                betData={betData}
                sessionBetData={sessionBetData}
                sessionBets={sessionBets}
                getBetReport={getBetReport}
              />
            );
          })}
      </Box>

      {show && (
        <Footer
          getListOfUser={() => handleReport(event)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={Math.ceil(parseInt(pageCount))}
          callPage={callPage}
        />
      )}
    </Box>
  ) : (
    <Box>
      <Typography
        sx={{
          color: "#fff",
          textAlign: "center",
          fontSize: { lg: "16px", xs: "10px" },
          fontWeight: "600",
          margin: "1rem",
        }}
      >
        No Matching Records Found
      </Typography>
    </Box>
  );
};
export default ProfitLossComponent;
