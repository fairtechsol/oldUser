import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import Match from "../../components/MatchDetail/MatchOdds/Match";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch } from "../../store/store";

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
