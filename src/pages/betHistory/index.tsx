import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import AllRateSeperate from "../../components/MatchDetail/AllRateBets/AllRateSeperate";
import SessionBetSeperate from "../../components/MatchDetail/SessionOdds/SessionBetSeperate";
import { getCurrentBets } from "../../store/actions/betPlace/betPlaceActions";
import { AppDispatch, RootState } from "../../store/store";

const BetHistory = () => {
  const dispatch: AppDispatch = useDispatch();
  const [allBets] = useState([]);
  const [loading] = useState(false);
  const { placedBets } = useSelector((state: RootState) => state.bets);

  useEffect(() => {
    if (sessionStorage.getItem("jwtUser")) {
      dispatch(getCurrentBets());
    }
  }, [sessionStorage]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader text="" />
        </Box>
      ) : (
        <>
          <Typography
            sx={{
              fontSize: { xs: "12px", lg: "15px" },
              marginLeft: { lg: "5px", xs: "3px" },

              color: "white",
              fontWeight: "bold",
            }}
          >
            {"BET HISTORY"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { lg: "row", xs: "column" },
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "99%",
                display: "flex",
                flexDirection: { lg: "row", xs: "column" },
              }}
            >
              <AllRateSeperate
                betHistory={true}
                mark2
                mark
                allBetsData={placedBets?.filter(
                  (b: any) =>
                    ![
                      "session",
                      "cricketcasino",
                      "overByover",
                      "ballByBall",
                      "oddEven",
                      "fancy1",
                    ].includes(b?.marketType)
                )}
                count={
                  allBets?.filter(
                    (b: any) =>
                      ![
                        "session",
                        "cricketcasino",
                        "overByover",
                        "ballByBall",
                        "oddEven",
                        "fancy1",
                      ].includes(b?.marketType)
                  ).length || 0
                }
              />
              <Box sx={{ width: { lg: "1vw", xs: 0 } }}/>
              <SessionBetSeperate
                betHistory={true}
                allBetsData={placedBets?.filter((b: any) =>
                  [
                    "session",
                    "cricketcasino",
                    "overByover",
                    "ballByBall",
                    "oddEven",
                    "fancy1",
                  ].includes(b?.marketType)
                )}
                placedBets={placedBets?.filter((b: any) =>
                  [
                    "session",
                    "cricketcasino",
                    "overByover",
                    "ballByBall",
                    "oddEven",
                    "fancy1",
                  ].includes(b?.marketType)
                )}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default BetHistory;
