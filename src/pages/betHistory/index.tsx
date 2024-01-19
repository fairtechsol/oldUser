import { Box, Typography } from "@mui/material";

import { useState } from "react";
import { useDispatch } from "react-redux";

// import BackgroundLayout from "../../components/Common/BackGroundLayout";
import Loader from "../../components/Loader";
import AllRateSeperate from "../../components/MatchDetail/AllRateBets/AllRateSeperate";
import SessionBetSeperate from "../../components/MatchDetail/SessionOdds/SessionBetSeperate";
import { Constants } from "../../utils/Constants";



const BetHistory = () => {
  const dispatch = useDispatch();
  const userToken = sessionStorage.getItem("JWTuser");

  const [allBets, SetAllBets] = useState([]);
  const [count, setCount] = useState(0);
 
  const [pageLimit, setPageLimit] = useState(Constants.pageLimit);
  const [pageCount, setPageCount] = useState(Constants.pageLimit);
  const [currentPage, setCurrentPage] = useState(0);
  const [currenLimit, setCurrenLimit] = useState(1);
  const [loading, setLoading] = useState(false);

  
  return (
    <>
      {/* <BackgroundLayout> */}
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
                  allBetsData={allBets?.filter((b) =>
                    [
                      "MATCH ODDS",
                      "BOOKMAKER",
                      "MANUAL BOOKMAKER",
                      "QuickBookmaker0",
                      "QuickBookmaker1",
                      "QuickBookmaker2",
                    ].includes("b?.marketType")
                  )}
                  count={
                    allBets?.filter((b) =>
                      [
                        "MATCH ODDS",
                        "BOOKMAKER",
                        "MANUAL BOOKMAKER",
                        "QuickBookmaker0",
                        "QuickBookmaker1",
                        "QuickBookmaker2",
                      ].includes("b?.marketType")
                    ).length || 0
                  }
                  setPageCountOuter={setPageCount}
                //   callPage={callPage}
                />
                <Box sx={{ width: { lg: "1vw", xs: 0 } }}></Box>
                <SessionBetSeperate
                  betHistory={true}
                  allBetsData={allBets?.filter(
                    (b) =>
                      ![
                        "MATCH ODDS",
                        "BOOKMAKER",
                        "MANUAL BOOKMAKER",
                        "QuickBookmaker0",
                        "QuickBookmaker1",
                        "QuickBookmaker2",
                      ].includes("b?.marketType")
                  )}
                  mark
                />
              </Box>
            </Box>
          </>
        )}
      {/* </BackgroundLayout> */}
    </>
  );
};

export default BetHistory;
