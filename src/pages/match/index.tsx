
import { memo, useEffect } from "react";

import Match from "../../components/MatchDetail/MatchOdds/Match";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { useSelector } from "react-redux";
import { stat } from "fs";



const Matches = () => {
  const dispatch: AppDispatch = useDispatch();


  useEffect(()=> {
    dispatch(getMatchList({}));
  },[])

  return (
    <>
      <Match />
    </>
  );
};
export default memo(Matches);
