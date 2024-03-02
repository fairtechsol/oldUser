import { Box } from "@mui/material";
import { useState } from "react";
import RowHeaderMatches from "./RowHeaderMatches";
import Footer from "../../AccountStatement/Footer";
import RowComponentMatches from "./RowComponentMatches";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getMatchWiseProfitLoss } from "../../../store/actions/user/userAction";
import { useSelector } from "react-redux";

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
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { matchWiseProfitLoss } = useSelector(
    (state: RootState) => state.user.profitLoss
  );
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
        })
      );
    }
    setShow(!show);
  };

  function callPage(val: any) {
    // setCurrentPage(setProfitLossReportPage(parseInt(val)));
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

  return (
    <Box>
      {eventData.map((item: any, index: number) => {
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
          setCurrentPage={() => {}}
          currentPage={currentPage}
          pages={pageCount}
          callPage={callPage}
        />
      )}
    </Box>
  );
};
export default ProfitLossComponent;
