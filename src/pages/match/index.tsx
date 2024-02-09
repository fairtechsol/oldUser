import { memo, useEffect } from "react";

import Match from "../../components/MatchDetail/MatchOdds/Match";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { expertSocketService, socketService } from "../../socketManager";

const Matches = () => {
  const dispatch: AppDispatch = useDispatch();

  const getMatchListService = () => {
    dispatch(getMatchList({}));
  };

  useEffect(() => {
    dispatch(getMatchList({}));
  }, []);

  useEffect(() => {
    try {
      expertSocketService.match.matchAdded(getMatchListService);
      socketService.userBalance.matchResultDeclared(getMatchListService);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <Match />
    </>
  );
};
export default memo(Matches);
