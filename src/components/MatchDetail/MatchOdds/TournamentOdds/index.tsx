import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import MUIModal from "@mui/material/Modal";
import { Fragment, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ARROWUP, LockIcon } from "../../../../assets";
import { calculateRequiredStack } from "../../../../helper";
import Divider from "../../../../helper/Divider";
import {
  selectedBetAction,
  selectedBetMinMax,
} from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import CommissionDot from "../../../Common/CommissionDot";
import OddsPlaceBet from "../Bets/OddsPlacebet";
import BookRatioBox from "./BookRatioBox";
import BoxComponent from "./BoxComponent";

const TournamentOdds = ({
  teamARates,
  teamBRates,
  title,
  min,
  max,
  showBox,
  isRound,
  betLock,
  upcoming,
  marketDetails,
  matchDetails,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const bookRatioB = (() => {
    if (teamARates === 0) {
      return 0;
    } else {
      const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
    }
  })();

  const bookRatioA = (() => {
    if (teamARates === 0) {
      return 0;
    } else {
      const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
    }
  })();

  const handleCashout = () => {
    const [teamAId, teamBId] = marketDetails?.runners?.map(
      (team: any) => team.parentRunnerId || team.id
    );
    const profitA = Math.round(profitLossObj?.[teamAId] ?? 0);
    const profitB = Math.round(profitLossObj?.[teamBId] ?? 0);
    if (profitA === profitB) {
      toast.error("You are not eligible for cashout!", {
        style: { backgroundColor: "#ffffff", color: "#000000" },
      });
      return;
    }
    // profitLossObj?.[teamAId] < profitLossObj?.[teamBId]
    const getBackAndLayRates = (team: any) => {
      const back1 =
        team?.ex?.availableToBack?.find((item: any) => item.oname === "back1")
          ?.price || 0;
      const lay1 =
        team?.ex?.availableToLay?.find((item: any) => item.oname === "lay1")
          ?.price || 0;

      return {
        id: team?.id,
        selectionId: team?.selectionId,
        teamName: team?.nat || team?.runnerName,
        back1,
        lay1,
        back1Price:
          marketDetails?.gtype === "match" ? (back1 - 1) * 100 : back1,
        lay1Price: marketDetails?.gtype === "match" ? (lay1 - 1) * 100 : lay1,
      };
    };

    const teamA = getBackAndLayRates(marketDetails?.runners[0]);
    const teamB = getBackAndLayRates(marketDetails?.runners[1]);

    let runner: any = {};
    let odds = 0;
    let type = "";
    let stake = 0;

    const getKeyByValue = (obj: any, value: any) =>
      Object.keys(obj).find((key) => obj[key] === value);

    if (teamA.back1Price < 100 && teamA.lay1Price < 100) {
      odds = profitA < profitB ? teamA.back1 : teamA.lay1;
      const perc =
        profitLossObj?.[teamAId] < profitLossObj?.[teamBId]
          ? teamA.back1Price
          : teamA.lay1Price;

      stake = Math.abs(
        calculateRequiredStack(
          profitLossObj?.[teamAId],
          profitLossObj?.[teamBId],
          perc
        )
      );
      runner = teamA;
      const key = getKeyByValue(teamA, odds);
      type = key === "lay1" ? "lay" : "back";
    } else {
      odds = profitA < profitB ? teamB.lay1 : teamB.back1;
      const perc =
        profitLossObj?.[teamAId] < profitLossObj?.[teamBId]
          ? teamB.lay1Price
          : teamB.back1Price;
      stake = Math.abs(
        calculateRequiredStack(
          profitLossObj?.[teamAId],
          profitLossObj?.[teamBId],
          perc
        )
      );
      runner = teamB;
      const key = getKeyByValue(teamB, odds);
      type = key === "lay1" ? "lay" : "back";
    }

    if (odds < 1 || !isFinite(stake) || stake <= 0) {
      toast.error("You are not eligible for cashout!", {
        style: { backgroundColor: "#ffffff", color: "#000000" },
      });
      return;
    }

    const [teamAStatus, teamBStatus] = marketDetails?.runners?.map(
      (team: any) => team.status
    );
    if (teamAStatus == "SUSPENDED" || teamBStatus == "SUSPENDED") {
      toast.error("You are not eligible for cashout!", {
        style: { backgroundColor: "#ffffff", color: "#000000" },
      });
      return;
    }
    setIsPopoverOpen(true);
    let team = {
      name: runner?.teamName,
      bettingName: marketDetails?.name,
      rate: odds,
      type: type,
      stake: stake,
      betId: marketDetails?.id,
      eventType: marketDetails?.gtype,
      matchId: matchDetails?.id,
      matchBetType: marketDetails?.type,
      betPlaceIndex: 0,
      mid: marketDetails?.mid?.toString(),
      selectionId: runner?.selectionId?.toString(),
      runnerId: runner?.id?.toString(),
    };
    handleClick(team, marketDetails);
  };

  const handleClick = (team: any, data: any) => {
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
    dispatch(
      selectedBetMinMax({
        team,
        data,
      })
    );
  };

  const key = `${marketDetails.parentBetId || marketDetails?.id}_profitLoss_${
    matchDetails?.id
  }`;
  const profitLossJson = matchDetails?.profitLossDataMatch?.[key];
  const profitLossObj = profitLossJson ? JSON.parse(profitLossJson) : {};
  return (
    <>
      <Box
        key="odds"
        sx={{
          position: "relative",
          display: "flex",
          backgroundColor: "white",
          padding: { xs: "1px", lg: ".1vh" },
          flexDirection: "column",
          marginY: { xs: "2px", lg: ".5vh" },
          marginTop: { xs: "0" },
          width: { xs: "98%", lg: "97%" },
          marginX: "1vw",
          alignSelf: {
            xs: "center",
            md: "center",
            lg: "flex-start",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                width: "100%",
                fontSize: { lg: "13px", md: "12px", xs: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {title}
            </Typography>
            {marketDetails?.isCommissionActive && <CommissionDot />}
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
            }}
          >
            <div className="slanted"></div>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "#262626",
              // '#262626' ,
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "flex-end",
                lg: "center",
                md: "flex-end",
              },
            }}
          >
            <BookRatioBox valueA={bookRatioA} valueB={bookRatioB} />
            {!matchesMobile && (
              <Box
                sx={{
                  position: { lg: "static", xs: "relative" },
                  // paddingY: "2vh",
                  right: 25,
                }}
              >
                {marketDetails?.runners?.length === 2 && (
                  <button
                    type="submit"
                    disabled={
                      Object.keys(profitLossObj).length <= 0 ? true : false
                    }
                    // disabled={loading || !stakeValue ? true : false}
                    style={{
                      color: "#319E5B",
                      backgroundColor: "#fff",
                      // width: "150px",
                      // cursor: loading || !stakeValue ? "not-allowed" : "pointer",
                      // width: { lg: "150px", xs: "130px" },
                      // height: "35px",
                      borderRadius: "3px",
                      border: "2px solid white",
                      opacity:
                        Object.keys(profitLossObj).length <= 0 ? 0.65 : 1,
                    }}
                    onClick={() => handleCashout()}
                  >
                    Cashout
                  </button>
                )}
              </Box>
            )}
            <Box
              className="arrowUpCollapse"
              sx={{
                flex: 1,
                background: { lg: "#262626", xs: "none" },
                position: { lg: "static", xs: "absolute" },
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <img
                onClick={() => {
                  setVisible(!visible);
                }}
                src={ARROWUP}
                style={{
                  transform: !visible ? "rotate(180deg)" : "rotate(0deg)",
                  width: "16px",
                  height: "16px",
                  marginRight: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                alt={"Banner"}
              />
            </Box>
          </Box>
        </Box>
        {visible && (
          <Box
            sx={{ color: "black", position: "relative", overflow: "hidden" }}
          >
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "'#319E5B'",
                  height: "25px",
                  width: { lg: "40%", xs: "60%" },
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { lg: "11px", xs: "9px" },
                    marginLeft: "7px",
                  }}
                >
                  {min === max ? `MAX:${max}` : `MIN: ${min} MAX:${max}`}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
                  gap: { xs: "0px", lg: "1px", md: "1px" },
                  width: { lg: "60%", xs: "40.2%" },
                  justifyContent: { lg: "center", xs: "flex-end" },
                }}
              >
                {matchesMobile && (
                  <Box
                    sx={{
                      // position: { lg: "static", xs: "relative" },
                      // paddingY: "2vh",
                      marginRight: "14px",
                    }}
                  >
                    {marketDetails?.runners?.length === 2 && (
                      <button
                        type="submit"
                        disabled={
                          Object.keys(profitLossObj).length <= 0 ? true : false
                        }
                        // disabled={loading || !stakeValue ? true : false}
                        style={{
                          color: "#319E5B",
                          backgroundColor: "#fff",
                          // width: "150px",
                          // cursor: loading || !stakeValue ? "not-allowed" : "pointer",
                          // width: { lg: "150px", xs: "130px" },
                          // height: "35px",
                          borderRadius: "3px",
                          border: "0px solid white",
                          opacity:
                            Object.keys(profitLossObj).length <= 0 ? 0.65 : 1,
                          height: 23,
                          marginTop: 1,
                          padding: "0 6px",
                        }}
                        onClick={() => handleCashout()}
                      >
                        Cashout
                      </button>
                    )}
                  </Box>
                )}
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { lg: "16.5%", xs: "50%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Back
                  </Typography>
                </Box>
                <Box sx={{ width: "0.2%", display: "flex" }} />
                <Box
                  sx={{
                    background: "#FF9292",
                    width: { lg: "16.4%", xs: "50%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Lay
                  </Typography>
                </Box>
              </Box>
            </Box>
            {betLock && (
              <Box
                sx={{
                  position: "absolute",
                  height: "65%",
                  top: "35%",
                  width: "100%",
                  display: "flex",
                  zIndex: "999",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, .6)",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "60%", lg: "40%", md: "60%" },
                  }}
                ></Box>
                <Box
                  sx={{
                    width: { xs: "40%", lg: "60%", md: "40%" },
                    gap: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ width: "35px", height: "40px" }}
                    src={LockIcon}
                    alt=""
                  />
                  <Typography
                    sx={{
                      fontWeight: "600",
                      margin: "20px 0px 0px -25px",
                      fontSize: "20px",
                      color: "#FFF",
                    }}
                  >
                    Locked
                  </Typography>
                </Box>
              </Box>
            )}

            {(upcoming ||
              showBox ||
              !marketDetails?.isActive ||
              (!["ACTIVE", "OPEN", ""].includes(marketDetails?.status) &&
                marketDetails?.gtype == "match")) && (
              <Box
                sx={{
                  position: "absolute",
                  height: "83%",
                  // top: "18%",
                  width: "100%",
                  display: "flex",
                  zIndex: "999",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, 0.71)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "12px", lg: "22px" },
                    textTransform: "uppercase",
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    fontWeight: "400",
                  }}
                >
                  {!["ACTIVE", "OPEN", ""].includes(marketDetails?.status) &&
                  marketDetails?.gtype == "match"
                    ? marketDetails?.status
                    : ""}
                </Typography>
              </Box>
            )}
            {marketDetails?.runners?.map((item: any) => (
              <Fragment key={item?.selectionId}>
                <BoxComponent
                  showBox={showBox}
                  matchDetails={matchDetails}
                  color={
                    matchDetails?.profitLossDataMatch?.[
                      (marketDetails?.parentBetId || marketDetails?.id) +
                        "_" +
                        "profitLoss" +
                        "_" +
                        matchDetails?.id
                    ]
                      ? JSON.parse(
                          matchDetails?.profitLossDataMatch?.[
                            (marketDetails?.parentBetId || marketDetails?.id) +
                              "_" +
                              "profitLoss" +
                              "_" +
                              matchDetails?.id
                          ]
                        )?.[item?.parentRunnerId || item?.id] <= 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : "#319E5B"
                  }
                  rate={
                    matchDetails?.profitLossDataMatch?.[
                      (marketDetails?.parentBetId || marketDetails?.id) +
                        "_" +
                        "profitLoss" +
                        "_" +
                        matchDetails?.id
                    ]
                      ? JSON.parse(
                          matchDetails?.profitLossDataMatch?.[
                            (marketDetails?.parentBetId || marketDetails?.id) +
                              "_" +
                              "profitLoss" +
                              "_" +
                              matchDetails?.id
                          ]
                        )?.[item?.parentRunnerId || item?.id]
                      : 0
                  }
                  name={item?.nat ?? item?.runnerName}
                  data={item}
                  isRound={isRound}
                  marketDetails={marketDetails}
                  upcoming={upcoming}
                />
                {!(
                  upcoming ||
                  showBox ||
                  !marketDetails?.isActive ||
                  (!["ACTIVE", "OPEN", ""].includes(marketDetails?.status) &&
                    marketDetails?.gtype == "match")
                ) && <Divider />}
              </Fragment>
            ))}
          </Box>
        )}
        <MUIModal
          open={isPopoverOpen}
          onClose={() => {
            setIsPopoverOpen(false);
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              top: "33%",
              overflow: "hidden",
              justifyContent: "center",
              outline: "none",
            }}
          >
            <OddsPlaceBet
              handleClose={() => {
                setIsPopoverOpen(false);
              }}
              type={{
                color:
                  selectedBet?.team?.type === "back" ? "#A7DCFF" : "#FFB5B5",
                type: "BL",
              }}
            />
          </Box>
        </MUIModal>
      </Box>
      <style>
        {`
          @media only screen and (max-width: 600px) {
            body .arrowUpCollapse img {
              width: 14px !important;
              height: 14px !important;
              margin-right: 3px !important;
            }
          }
        `}
      </style>
    </>
  );
};
export default memo(TournamentOdds);
