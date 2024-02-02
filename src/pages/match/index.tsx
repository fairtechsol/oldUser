import { memo, useEffect } from "react";

import Match from "../../components/MatchDetail/MatchOdds/Match";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getMatchList } from "../../store/actions/match/matchListAction";

const Matches = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatchList({}));
  }, []);

  return (
    <>
      <Match />
    </>
  );
};
export default memo(Matches);
