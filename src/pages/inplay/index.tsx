import { Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import MatchesComponent from "../../components/MatchDetail/MatchOdds/index";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { expertSocketService, socketService } from "../../socketManager";

const Inplay = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const dispatch: AppDispatch = useDispatch();

  const getMatchListService = () => {
    dispatch(getMatchList({}));
  };

  useEffect(() => {
    try {
      expertSocketService.match.matchAdded(getMatchListService);
      socketService.userBalance.matchResultDeclared(getMatchListService);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    dispatch(getMatchList({}));
  }, []);

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

export default Inplay;
