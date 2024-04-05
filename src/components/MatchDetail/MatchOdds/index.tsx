import { Pagination } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { expertSocketService, socket } from "../../../socketManager";
import {
  getMatchList,
  matchDetailReset,
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
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const setMatchOddRatesInRedux = (event: any) => {
    dispatch(updateMatchOddRates(event));
  };

  const getMatchListService = () => {
    dispatch(getMatchList({}));
  };

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      if (success && socket?.connected) {
        if (profileDetail?.roleName) {
          expertSocketService.match.matchAddedOff();
          matchList?.matches?.forEach((element: any) => {
            expertSocketService.match.getMatchRatesOff(element?.id);
          });
          matchList?.matches?.forEach((element: any) => {
            expertSocketService.match.joinMatchRoom(
              element?.id,
              profileDetail?.roleName
            );
          });
          matchList?.matches?.forEach((element: any) => {
            expertSocketService.match.getMatchRates(
              element?.id,
              setMatchOddRatesInRedux
            );
          });
          expertSocketService.match.matchAdded(getMatchListService);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail?.roleName, socket?.connected]);

  useEffect(() => {
    return () => {
      expertSocketService.match.matchAddedOff();
      matchList?.matches?.forEach((element: any) => {
        expertSocketService.match.leaveMatchRoom(element?.id);
      });
      matchList?.matches?.forEach((element: any) => {
        expertSocketService.match.getMatchRatesOff(element?.id);
      });
    };
  }, []);

  useEffect(() => {
    if (selectedMatchId !== "") {
      dispatch(matchDetailReset());
      navigate("/matchDetail", {
        state: {
          matchId: selectedMatchId,
        },
      });
    }
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
      } else if (document.visibilityState === "hidden") {
        if (matchList?.matches) {
          matchList?.matches?.forEach((element: any) => {
            expertSocketService.match.getMatchRatesOff(element?.id);
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getMatchList({}));
    }, 14100 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
