import { Typography } from "@mui/material";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchWiseProfitLoss } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { Constants } from "../../../utils/Constants";
import Footer from "../../AccountStatement/Footer";
import RowComponentMatches from "./RowComponentMatches";
import RowHeaderMatches from "./RowHeaderMatches";

const ProfitLossComponent = ({
  show,
  setShow,
  eventData,
  currentPage,
  setCurrentPage,
  startDate,
  endDate,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { matchWiseProfitLoss, matchWiseProfitLossCount } = useSelector(
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
      setCurrentPage(1);
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
          page: 1,
          limit: Constants.pageLimit,
        })
      );
      setEvent(eventType);
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

  useEffect(() => {
    dispatch(
      getMatchWiseProfitLoss({
        type: event,
        searchId: userData?.id,
        startDate: startDate && moment(startDate)?.format("YYYY-MM-DD"),
        endDate: endDate && moment(endDate)?.format("YYYY-MM-DD"),
        page: currentPage,
        limit: Constants.pageLimit,
      })
    );
  }, [currentPage]);

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
              matchWiseProfitLoss?.map((item: any, index: number) => {
                return (
                  <RowComponentMatches
                    key={index}
                    item={item}
                    index={index + 1}
                    selectedId={selectedId}
                    getBetReport={getBetReport}
                    currentPage={currentPage}
                  />
                );
              })}
          </RowHeaderMatches>
        );
      })}
      {show && (
        <Footer
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={Math.ceil(
            parseInt(
              matchWiseProfitLossCount > 0 ? matchWiseProfitLossCount : 1
            ) / Constants.pageLimit
          )}
        />
      )}
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
