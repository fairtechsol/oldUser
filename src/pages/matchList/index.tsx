import { Box, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MatchesComponent from "../../components/MatchDetail/MatchOdds/index";
import {
  getMatchList,
  setCurrentPageRedux,
} from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import { Constants } from "../../utils/Constants";

const MatchList = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const { type } = useParams();
  const { currentPageRedux } = useSelector(
    (state: RootState) => state.match.matchList
  );

  useEffect(() => {
    if (sessionStorage.getItem("jwtUser")) {
      if (type) {
        dispatch(
          getMatchList({
            matchType: type,
            page: currentPageRedux,
            limit: Constants.pageLimit,
          })
        );
      }
    }
  }, [sessionStorage, currentPageRedux]);

  useEffect(() => {
    if (type) {
      dispatch(
        getMatchList({
          matchType: type,
          page: 1,
          limit: Constants.pageLimit,
        })
      );
      dispatch(setCurrentPageRedux(1));
    }
  }, [type]);

  return (
    <>
      {!matchesMobile ? (
        <Box
          sx={{
            display: "flex",
            overflowX: "hidden",
            flexDirection: "column",
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            overflowY: "auto",
            alignItems: "flex-start",
          }}
        >
          <div style={{ height: "1vh" }} />
          <MatchesComponent />
        </Box>
      ) : (
        <Box sx={{ overflowX: "hidden", minHeight: "100vh", width: "100%" }}>
          <MatchesComponent />
        </Box>
      )}
    </>
  );
};
export default memo(MatchList);
