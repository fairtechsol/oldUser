import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import Match from "../../components/MatchDetail/MatchOdds/Match";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch } from "../../store/store";
import { expertSocketService, socketService } from "../../socketManager";

const Matches = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatchList({}));
  }, []);

  useEffect(() => {
    expertSocketService.match.matchAdded(dispatch(getMatchList({})));
    socketService.userBalance.matchResultDeclared(dispatch(getMatchList({})));
    socketService.userBalance.matchResultUnDeclared(dispatch(getMatchList({})));
    return () => {
      expertSocketService.match.matchAddedOff(dispatch(getMatchList({})));
      socketService.userBalance.matchResultDeclaredOff(
        dispatch(getMatchList({}))
      );
      socketService.userBalance.matchResultUnDeclaredOff(
        dispatch(getMatchList({}))
      );
    };
  }, []);

  return (
    <>
      <Match />
    </>
  );
};
export default memo(Matches);
