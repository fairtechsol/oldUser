import { Pagination } from "@mui/material";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { expertSocketService, socket } from "../../../socketManager";
import {
  getMatchList,
  matchDetailReset,
  updateMatchRatesFromApiOnList,
} from "../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { Constants, marketApiConst } from "../../../utils/Constants";
import Odds from "./Odds";

interface MatchesComponent {
  currentPage?: number | any;
  setCurrentPage?: (page: number) => void;
}

const MatchesComponent = ({
  currentPage,
  setCurrentPage,
}: MatchesComponent) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = useParams();
  const { matchList, success } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const getMatchListMarket = async (matchType: string) => {
    try {
      const resp: any = await axios.get(marketApiConst[matchType] || "", {
        timeout: 2000,
      });
      if (resp?.status) {
        dispatch(updateMatchRatesFromApiOnList(resp?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMatchListService = () => {
    if (["/inplay"].includes(location.pathname)) {
      dispatch(getMatchList({ matchType: type }));
    } else {
      dispatch(
        getMatchList({
          matchType: type,
          page:
            matchList?.count % Constants.pageLimit === 0
              ? currentPage + 1
              : currentPage,
          limit: Constants.pageLimit,
        })
      );
    }
  };

  useEffect(() => {
    try {
      if (!location.pathname.includes("/inplay")) {
        window.scrollTo(0, 0);
      }
      if (success && socket) {
        expertSocketService.match.matchAddedOff();
        expertSocketService.match.matchAdded(getMatchListService);
      }
      return () => {};
    } catch (e) {
      console.log(e);
    }
  }, [success, socket, location]);

  useEffect(() => {
    try {
      if (selectedMatchId !== "") {
        dispatch(matchDetailReset());
        navigate(`${location.pathname}/matchDetail`, {
          state: {
            matchId: selectedMatchId,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedMatchId]);

  useEffect(() => {
    try {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          if (["/inplay"].includes(location.pathname)) {
            dispatch(getMatchList({ matchType: type }));
          } else {
            dispatch(
              getMatchList({
                matchType: type,
                page: currentPage,
                limit: Constants.pageLimit,
              })
            );
          }
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, type]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (["/inplay"].includes(location.pathname)) {
        dispatch(getMatchList({ matchType: type }));
      } else {
        dispatch(
          getMatchList({
            matchType: type,
            page: currentPage,
            limit: Constants.pageLimit,
          })
        );
      }
    }, 14100 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [type]);

  useEffect(() => {
    setTimeout(() => {
      getMatchListMarket(type || "");
    }, 1500);
    const intervalId = setInterval(() => {
      if (type) {
        getMatchListMarket(type || "");
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [type]);

  return (
    <>
      {matchList &&
        (matchList?.matches).map((match: any) => {
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

      {!["/inplay"].includes(location.pathname) && (
        <Pagination
          page={currentPage}
          className="whiteTextPagination d-flex justify-content-center"
          onChange={(_, page) => {
            setCurrentPage?.(page);
          }}
          count={Math.ceil(
            parseInt(matchList?.count ? matchList?.count : 1) /
              Constants.pageLimit
          )}
          color="primary"
        />
      )}
    </>
  );
};

export default memo(MatchesComponent);
