import { Typography } from "@mui/material";
import moment from "moment";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchWiseProfitLossCard } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import RowComponentMatches from "./RowComponentMatches";
import RowHeaderMatches from "./RowHeaderMatches";

const ProfitLossComponent = ({
  eventData,
  betData,
  sessionBetData,
  // currentPage,
  // pageCount,
  // setCurrentPage,
  sessionBets,
  setShow,
  show,
  endDate,
  startDate,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { matchWiseProfitLossCard } = useSelector(
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
    if (eventType === event) {
      setShow((prev: boolean) => !prev);
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
      setEvent("");
    } else {
      if (!show) {
        setShow((prev: boolean) => !prev);
      }
      setEvent(eventType);
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
      dispatch(
        getMatchWiseProfitLossCard({
          providerName: eventType,
          searchId: userData?.id,
          startDate: startDate && moment(startDate)?.format("YYYY-MM-DD"),
          endDate: endDate && moment(endDate)?.format("YYYY-MM-DD"),
        })
      );
    }
  };

  const getBetReport = (value: any) => {
    setSelectedId({
      type: value?.type,
      id: value?.match_id,
      betId: value?.betId,
      sessionBet: value?.sessionBet,
    });
  };

  return eventData?.length > 0 ? (
    <>
      {eventData?.map((item: any, index: number) => {
        return (
          <RowHeaderMatches
            key={index}
            item={item}
            index={index}
            getHandleReport={getHandleReport}
            show={show}
            event={event}
          >
            {item?.eventType === event &&
              matchWiseProfitLossCard?.map((item: any, index: number) => {
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
          </RowHeaderMatches>
        );
      })}

      {/* {show && (
        <Footer
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={Math.ceil(parseInt(pageCount))}
        />
      )} */}
    </>
  ) : (
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
  );
};
export default memo(ProfitLossComponent);
