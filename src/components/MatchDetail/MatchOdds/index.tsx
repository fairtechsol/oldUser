import { Pagination, Box } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { } from "@mui/material";
import Odds from "./Odds";
import { Constants } from "../../../utils/Constants";
import CustomLoader from "../../Loader/index";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { expertSocketService } from "../../../socketManager";
import { useDispatch } from "react-redux";
import { updateMatchOddRates } from "../../../store/actions/match/matchListAction";

const MatchesComponent = (_: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [pageCount] = useState(Constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);
  const { matchList, loading } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const setMatchOddRatesInRedux = (event: any) => {
    dispatch(updateMatchOddRates(event));
  };

  useEffect(() => {
    if (matchList && getProfile?.roleName) {
      matchList?.forEach((element: any) => {
        expertSocketService.match.joinMatchRoom(
          element?.id,
          getProfile?.roleName
        );
      });
      matchList?.forEach((element: any) => {
        expertSocketService.match.getMatchRates(
          element?.id,
          setMatchOddRatesInRedux
        );
      });
    }

    return () => {
      expertSocketService.match.leaveAllRooms();
      matchList?.forEach((element: any) => {
        expertSocketService.match.leaveMatchRoom(element?.id);
      });
    };
  }, [matchList?.length, getProfile?.roleName]);

  function callPage(e: any, value: any) {
    setCurrentPage(parseInt(value));
  }
  return (
    <>
      {matchList &&
        matchList?.map((match: any) => {
          return (
            <Odds
              key={match?.id}
              top={true}
              blur={false}
              match={match}
              data={match?.matchOdds}
            />
          );
        })}
      {matchList.length != 0 && (
        <Pagination
          page={currentPage}
          className="whiteTextPagination d-flex justify-content-center"
          count={pageCount}
          color="primary"
          onChange={callPage}
        />
      )}
      {loading && <CustomLoader text="" />}
      {loading && (
        <Box
          sx={{
            minHeight: "90vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomLoader height={"70vh"} text={""} />
        </Box>
      )}
    </>
  );
};

export default memo(MatchesComponent);
