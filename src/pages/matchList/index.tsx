import { Box, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MatchesComponent from "../../components/MatchDetail/MatchOdds/index";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch } from "../../store/store";
import { Constants } from "../../utils/Constants";

const MatchList = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const { type } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (sessionStorage.getItem("jwtUser")) {
      if (type) {
        dispatch(
          getMatchList({
            matchType: type,
            page: currentPage,
            limit: Constants.pageLimit,
          })
        );
      }
    }
  }, [sessionStorage, currentPage]);

  useEffect(() => {
    if (type) {
      dispatch(
        getMatchList({
          matchType: type,
          page: 1,
          limit: Constants.pageLimit,
        })
      );
      setCurrentPage(1);
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
          <MatchesComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Box>
      ) : (
        <Box sx={{ overflowX: "hidden", minHeight: "100vh", width: "100%" }}>
          <MatchesComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Box>
      )}
    </>
  );
};
export default memo(MatchList);
