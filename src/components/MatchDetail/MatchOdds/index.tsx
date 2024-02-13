import { Pagination, Box } from "@mui/material";
import { memo, useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { matchList, loading } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const setMatchOddRatesInRedux = (event: any) => {
    dispatch(updateMatchOddRates(event));
  };

  useEffect(() => {
    if (matchList?.matches && getProfile?.roleName) {
      matchList?.matches?.forEach((element: any) => {
        expertSocketService.match.joinMatchRoom(
          element?.id,
          getProfile?.roleName
        );
      });
      matchList?.matches?.forEach((element: any) => {
        expertSocketService.match.getMatchRates(
          element?.id,
          setMatchOddRatesInRedux
        );
      });
    }

    return () => {
      expertSocketService.match.leaveAllRooms();
      matchList?.matches?.forEach((element: any) => {
        expertSocketService.match.leaveMatchRoom(element?.id);
      });
    };
  }, [matchList?.matches?.length, getProfile?.roleName]);

  // function callPage(e: any, value: any) {
  //   setCurrentPage(parseInt(value));
  // }
  return (
    <>
      {matchList &&
        matchList?.matches?.map((match: any) => {
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

      <Pagination
        page={currentPage}
        className="whiteTextPagination d-flex justify-content-center"
        onChange={(_, page) => {
          setCurrentPage(page);
        }}
        count={Math.ceil(
          parseInt(matchList?.count ? matchList?.count : 1) /
            Constants.pageLimit
        )}
        color="primary"
      />

      {/* {loading && <CustomLoader text="" />} */}
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
