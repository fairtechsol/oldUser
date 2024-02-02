import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Loader from "../../components/Loader";
import AllRateSeperate from "../../components/MatchDetail/AllRateBets/AllRateSeperate";
import SessionBetSeperate from "../../components/MatchDetail/SessionOdds/SessionBetSeperate";
import { Constants } from "../../utils/Constants";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const BetHistory = () => {
  const [allBets] = useState([]);
  const [pageCount, setPageCount] = useState(Constants.pageLimit);
  const [loading] = useState(false);
  const { placedBets } = useSelector((state: RootState) => state.bets);

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
                allBetsData={placedBets?.filter(
                  (b: any) => !["session"].includes(b?.marketType)
                )}
                count={
                  allBets?.filter(
                    (b: any) => !["session"].includes(b?.marketType)
                  ).length || 0
                }
                setPageCountOuter={setPageCount}
                //   callPage={callPage}
              />
              <Box sx={{ width: { lg: "1vw", xs: 0 } }}></Box>
              <SessionBetSeperate
                betHistory={true}
                allBetsData={placedBets?.filter((b: any) =>
                  ["session"].includes(b?.marketType)
                )}
                placedBets={placedBets?.filter((b: any) =>
                  ["session"].includes(b?.marketType)
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
