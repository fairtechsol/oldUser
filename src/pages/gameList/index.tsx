import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Match from "../../components/MatchDetail/MatchOdds/Match";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch } from "../../store/store";

const Matches = () => {
  const dispatch: AppDispatch = useDispatch();
  const { type } = useParams();

  useEffect(() => {
    if (sessionStorage.getItem("jwtUser")) {
      if (type) {
        dispatch(getMatchList({ matchType: type }));
      }
    }
  }, [sessionStorage]);

  return <Match />;
};
export default memo(Matches);
