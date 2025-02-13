import { Box, Typography } from "@mui/material";
import { Fragment, memo, useState } from "react";
import { ARROWUP, LockIcon } from "../../../../assets";
import { handleDecimalAmount } from "../../../../helper";
import Divider from "../../../../helper/Divider";
import CommissionDot from "../../../Common/CommissionDot";
import BoxComponent from "./BoxComponent";

const SmallBox = ({ valueA, valueB, color }: any) => {
  return (
    <Box
      sx={{
        marginLeft: { xs: 0, lg: "-14px", md: 0 },
        justifyContent: {
          xs: "center",
          lg: "center",
          md: "center",
        },
        display: "flex",
        width: { xs: "85%", lg: "80%", md: "85%" },
        gap: "4px",
      }}
    >
      <Box
        sx={{
          width: { lg: "70px", xs: "45px", md: "70px" },
          // position: "absolute",
          flexDirection: "column",
          paddingX: "5px",
          display: "flex",
          left: { xs: "53%", lg: "49vw", md: "53%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{
            color: "#FF4D4D",
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          Book
        </Typography>
        <Typography
          sx={{
            fontSize: { lg: "12px", xs: "10px", md: "10px" },
            fontWeight: "bold",
            color: valueA < 0 ? `#FF4D4D` : `#319E5B`,
          }}
        >
          {handleDecimalAmount(parseFloat(valueA || 0.0), color)}
          {/* {valueA < 0 ? ` ${valueA}` : `${valueA}`} */}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "70px", xs: "45px", md: "70px" },
          // position: "absolute",
          paddingX: "5px",
          display: "flex",
          flexDirection: "column",
          left: { xs: "65%", lg: "55vw", md: "65%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{
            color: "#FF4D4D",
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          Book
        </Typography>

        <Typography
          sx={{
            fontSize: { lg: "12px", xs: "10px", md: "10px" },
            fontWeight: "bold",
            color: valueB < 0 ? `#FF4D4D` : `#319E5B`,
          }}
        >
          {handleDecimalAmount(parseFloat(valueB || 0.0), color)}
          {/* {valueB < 0 ? ` ${valueB}` : `${valueB}`} */}
        </Typography>
      </Box>
    </Box>
  );
};

const TournamentOdds = ({
  data,
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
  const [visible, setVisible] = useState(true);

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
            width: "99.7%",
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
            <SmallBox valueA={bookRatioA} valueB={bookRatioB} />
            <Box
              className="arrowUpCollapse"
              sx={{
                flex: 1,
                background: { lg: "#262626", xs: "none" },
                position: { lg: "static", xs: "absolute" },
                // '#262626' ,
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
                width: { lg: "100%", xs: "99.9%" },
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "'#319E5B'",
                  height: "25px",
                  width: "40%",
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
                  width: { lg: "60%", xs: "80%" },
                  justifyContent: { lg: "center", xs: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { lg: "16.5%", xs: "30%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderLeft: {
                      lg: "3px solid #319e5b",
                      xs: "1px solid #319e5b",
                    },
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Back
                  </Typography>
                </Box>
                <Box sx={{ width: ".35%", display: "flex" }}></Box>
                <Box
                  sx={{
                    background: "#FF9292",
                    width: { lg: "16.4%", xs: "29.9%" },
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
                  livestatus={
                    data?.[0]?.status?.toLowerCase() === "suspended"
                      ? true
                      : false
                  }
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
                <Divider />
              </Fragment>
            ))}
          </Box>
        )}
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
