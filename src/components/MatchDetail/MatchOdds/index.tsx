import { Pagination } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { expertSocketService, socketService } from "../../../socketManager";
import {
  getMatchList,
  updateMatchOddRates,
} from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { Constants } from "../../../utils/Constants";
import Odds from "./Odds";

const MatchesComponent = (_: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const navigate = useNavigate();

  const { matchList, success } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const setMatchOddRatesInRedux = (event: any) => {
    dispatch(updateMatchOddRates(event));
  };

  const getMatchListService = () => {
    dispatch(getMatchList({}));
  };

  useEffect(() => {
    try {
      if (success) {
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
          expertSocketService.match.matchAdded(getMatchListService);
          socketService.userBalance.matchResultDeclared(getMatchListService);
          socketService.userBalance.matchResultUnDeclared(getMatchListService);
        }
      }
    } catch (e) {
      console.log(e);
    }

    return () => {
      // expertSocketService.match.leaveAllRooms();
      expertSocketService.match.matchAddedOff(getMatchListService);
      matchList?.matches?.forEach((element: any) => {
        expertSocketService.match.getMatchRatesOff(
          element?.id,
          setMatchOddRatesInRedux
        );
      });
    };
  }, [matchList?.matches?.length, getProfile?.roleName]);

  useEffect(() => {
    if (selectedMatchId !== "")
      navigate("/matchDetail", {
        state: {
          matchId: selectedMatchId,
        },
      });
    return () => {
      if (selectedMatchId !== "") {
        matchList?.matches?.forEach((element: any) => {
          if (element?.id !== selectedMatchId) {
            expertSocketService.match.leaveMatchRoom(element?.id);
          }
        });
      }
    };
  }, [selectedMatchId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        dispatch(getMatchList({}));
      }
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
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // function callPage(e: any, value: any) {
  //   setCurrentPage(parseInt(value));
  // }
  return (
    <>
      {matchList &&
        matchList?.matches
          .slice(
            (currentPage - 1) * Constants.pageLimit,
            currentPage * Constants.pageLimit
          )
          .map((match: any) => {
            return (
              <Odds
                key={match?.id}
                top={true}
                blur={false}
                match={match}
                data={match?.matchOdds}
                selectedMatchId={selectedMatchId}
                setSelectedMatchId={setSelectedMatchId}
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
    </>
  );
};

export default memo(MatchesComponent);
