
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import SeparateBox from "./SeparateBox";
import Divider from "../../../helper/Divider";
import moment from "moment-timezone";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";


interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds?: string;
}






const Odds = ({ onClick, top, blur, match, data, item, title }: any) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const theme = useTheme();
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));


  const dispatch = useDispatch();





  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 100);
  //   return () => clearInterval(timer);
  // }, []);
  function calculateTimeLeft(): TimeLeft {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const targetDate = moment(data?.startAt).tz(timezone);
    const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
    let timeLeft: TimeLeft = {
      days: "",
      hours: "",
      minutes: ""
    }; // Initialize with the defined type
  
    if (difference > 0) {
      timeLeft = {
        days: ("0" + Math.floor(difference / (1000 * 60 * 60 * 24))).slice(-2) || "00",
        hours: ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(-2) || "00",
        minutes: ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2) || "00",
        seconds: ("0" + Math.floor((difference / 1000) % 60)).slice(-2) || "00",
      };
    } else {
      timeLeft = {
        days: "00",
        hours: "00",
        minutes: "00",
      };
    }
  
    return timeLeft;
  }
  
  const timeLeft = calculateTimeLeft();
  
  const upcoming = Number(timeLeft.days) === 0 && Number(timeLeft.hours) === 0 && Number(timeLeft.minutes) <= 10;




  return (
    <>
      <style scoped>
        {`
          @keyframes gradient {
            0% {
              background-position: 0% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }

          .liveAnimation {
            overflow: hidden;
            background: linear-gradient(
              315deg,
              rgb(117 255 0) 3%,
              rgb(177 60 206) 38%,
              rgb(255 0 233) 68%,
              rgba(255, 25, 25, 1) 98%
            );
            animation: gradient 5s ease infinite;
            background-size: 400% 400%;
            background-attachment: fixed;
            position: absolute;
            top: 0;
            left: -9px;
            width: 60px;
          }
          .wave {
            border-radius: 1000% 1000% 0 0;

            height: 12em;
            animation: wave 10s -3s linear infinite;
            transform: translate3d(0, 0, 0);
            opacity: 0.8;
            bottom: 0;
            left: 0;
            z-index: -1;
            background: linear-gradient(
              315deg,
              rgba(101, 0, 94, 1) 3%,
              rgba(60, 132, 206, 1) 38%,
              rgba(48, 238, 226, 1) 68%,
              rgba(255, 25, 25, 1) 98%
            );
          }
          @keyframes wave {
            2% {
              transform: translateX(1);
            }

            25% {
              transform: translateX(-25%);
            }

            50% {
              transform: translateX(-50%);
            }

            75% {
              transform: translateX(-25%);
            }

            100% {
              transform: translateX(1);
            }
          }
          @media only screen and (max-width: 575px) {
            .liveAnimation {
              top: -2px;
              left: -8px;
              height: 18px;
            }
          }
        `}
      </style>

      <Box
        sx={{
          position: "relative",
          //   width: "100%",
          marginY: { xs: "13px", lg: "3px" },
          marginTop: {
            xs: top ? "13px" : "1.2vh",
            lg: top ? "10px" : "1vh",
          },
          width: { xs: "98%", lg: "97.8%" },
          marginX: "1vw",
          padding: 0.1,
          background: "white",
        }}
        onClick={(e) => {
          navigate("/matchDetail", {
            state: {
              matchId: match?.id
            }
          });
          e.stopPropagation();
        }}
      >
        {!upcoming && (
          <Box
            onClick={onClick}
            sx={{
              position: "absolute",
              cursor: "pointer",
              zIndex: 2,
              //   background: "rgba(0,0,0,0.5)",
              width: "100%",
              right: 0,
              height: "100%",
            }}
          ></Box>
        )}

        {!upcoming && (
          <Box
            className="liveAnimation"
            sx={{
              width: "70px",
              zIndex: 3,
              border: "1px solid white",
              height: { xs: "20px", lg: "13px" },
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              background: "#129FFE",
              position: "absolute",
              marginTop: { xs: "-10px", lg: -1 },
              borderRadius: "3px",
              marginLeft: { xs: "0", lg: "0" },
            }}
          >
            <Typography
              sx={{
                fontStyle: "italic",
                fontSize: { lg: "10px", xs: "10px" },
                fontWeight: "600",
                color: "white",
              }}
            >
              UPCOMING
            </Typography>
          </Box>
        )}
        <Box
          onClick={onClick}
          sx={{
            zIndex: 0,
            filter: blur ? "blur(0px)" : null,
            display: "flex",
            position: "relative",
            flexDirection: "column",
            alignSelf: {
              xs: "center",
              md: "center",
              lg: "flex-start",
            },
            background: "white",
            cursor: "pointer",
          }}
        >
          {upcoming && (
            <Box
              className="liveAnimation"
              sx={{
                width: "50px",
                border: "1px solid white",
                height: { xs: "20px", lg: "13px" },
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                background: "#46CF4D",
                position: "absolute",
                marginTop: -1,
                borderRadius: "3px",
                marginLeft: 1,
              }}
            >
              <Box className="wave"> </Box>
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontSize: { lg: "10px", xs: "10px" },
                  fontWeight: "600",
                  color: "white",
                  // border: '1px solid linear-gradient(90deg, rgba(233,254,234,1) 1%, rgba(206,255,209,1) 100%)'
                }}
              >
                LIVE NOW
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              height: "38px",
              flexDirection: "row",
              width: "99.7%",
              alignSelf: "center",
            }}
          >

            <Box
              sx={{
                flex: 1.2,
                background: "#f1c550",
                overflow: "hidden",
                alignItems: { lg: "center", xs: "flex-end" },
                display: "flex",
              }}

            >

              <Typography

                noWrap={true}
                sx={{
                  overflow: "hidden",
                  marginBottom: "2px",
                  fontSize: { lg: "14px", xs: "10px" },
                  fontWeight: "bold",
                  marginLeft: "7px",
                }}
              >
                {match.teamA} vs {match?.teamB}{" "}

                <span style={{ fontWeight: "500" }}>
                ({moment(match.startAt).format("LL")})
                </span>
              </Typography>{" "}

            </Box>


            <Box
              sx={{
                flex: 0.1,
                background: "#262626",
                // '#262626'
              }}
            >
              <div className="slanted"></div>
            </Box>

            <Box
              sx={{
                flex: 1,
                background: "#262626",
                display: "flex",

                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: "80%",
                  marginRight: "3px",
                  borderRadius: "4px",
                  width: "110px",
                  background: "white",
                  justifyContent: "space-evenly",
                  display: "flex",
                  alignSelf: "flex-end",
                  visibility:
                    Number(timeLeft) === 0 &&
                      Number(timeLeft) === 0 &&
                      Number(timeLeft) === 0
                      ? "hidden"
                      : "visible",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#0B4F26",
                    }}
                  >
                    {timeLeft?.days || 0}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "8px",
                      fontWeight: "400",
                      color: "#0B4F26",
                    }}
                  >
                    Days
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "#0B4F26",
                    }}
                  >
                    :
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#0B4F26",
                    }}
                  >
                    {timeLeft?.hours || 0}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "8px",
                      fontWeight: "400",
                      color: "#0B4F26",
                    }}
                  >
                    Hrs
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "#0B4F26",
                    }}
                  >
                    :
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#0B4F26",
                    }}
                  >
                    {timeLeft?.minutes || 0}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "8px",
                      fontWeight: "400",
                      color: "#0B4F26",
                    }}
                  >
                    Min
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: "99.7%",
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
                  MIN: {match.betFairSessionMinBet} MAX:{""}
                  {match.betFairSessionMaxBet}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
                  width: { lg: "60%", xs: "80%" },
                  justifyContent: { lg: "center", xs: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { lg: "16.5%", xs: "25%" },
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
                <Box sx={{ width: ".35%", display: "flex" }}></Box>

                <Box
                  sx={{
                    background: "#FF9292",
                    width: { lg: "16.5%", xs: "25%" },
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
          }
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "40px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "white",
                height: "40px",
                width: "40%",
                alignItems: "center",
              }}
            >

              {/* <img
               
                  style={{ width: "25px", height: "25px", marginLeft: "10px" }}
                  alt={"teamA"}
                /> */}

              <Typography
                sx={{
                  color: "black",
                  fontSize: { lg: "11px", md: "10px", xs: "10px" },
                  marginLeft: "7px",
                  fontWeight: "600",
                }}
              >
                {match?.teamA}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                background: "white",
                height: "40px",
                width: { lg: "60%", xs: "80%" },
                justifyContent: { xs: "flex-end", lg: "center" },
                alignItems: "center",
              }}
            >
              {!matchesMobile && (
                <SeparateBox
                  value={
                    0
                  }
                  value2={0
                  }
                  color={matchesMobile ? "white" : "#CEEBFF"}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink", justifyContent: "stretch" }}
              ></Box>
              {!matchesMobile && (
                <SeparateBox
                  value={
                    0
                  }
                  value2={0
                  }
                  color={matchesMobile ? "white" : "#C2E6FF"}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              <SeparateBox
                value={
                  0
                }
                value2={0}
                color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
              />
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              <SeparateBox
                value={
                  0
                }
                value2={0}
                color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
              />
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              {!matchesMobile && (
                <SeparateBox
                  value={0
                  }
                  value2={0}
                  color={matchesMobile ? "white" : "#F2CBCB"}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              {!matchesMobile && (
                <SeparateBox
                  value={0
                  }
                  value2={0}
                  color={matchesMobile ? "white" : "#ECD6D6"}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "40px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "white",
                height: "40px",
                width: "40%",
                alignItems: "center",
              }}
            >

              {/* <img
                 
                  style={{ width: "25px", height: "25px", marginLeft: "10px" }}
                  alt={"match?.teamB"}
                /> */}

              <Typography
                sx={{
                  color: "black",
                  fontSize: { lg: "12px", xs: "11px" },
                  marginLeft: "7px",
                  fontWeight: "600",
                }}
              >
                {match.teamB}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                background: "white",
                height: "40px",
                width: { lg: "60%", xs: "80%" },
                justifyContent: { xs: "flex-end", lg: "center" },
                alignItems: "center",
              }}
            >
              {!matchesMobile && (
                <SeparateBox
                  value={0}
                  value2={0}
                  color={matchesMobile ? "white" : "#CEEBFF"}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              {!matchesMobile && (
                <SeparateBox
                  value={
                    0
                  }
                  value2={0}
                  color={matchesMobile ? "white" : "#C2E6FF"}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              <SeparateBox
                value={0
                }
                value2={0}
                color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
              />
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              <SeparateBox
                value={
                  0
                }
                value2={0}
                color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
              />
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              {!matchesMobile && (
                <SeparateBox
                  value={0
                  }
                  value2={0}
                  color={matchesMobile ? "white" : "#F2CBCB"}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
              {!matchesMobile && (
                <SeparateBox
                  value={0
                  }
                  value2={0}
                  color={matchesMobile ? "white" : "#ECD6D6"}
                />
              )}
              <Box
                sx={{ width: ".25%", display: "flex", background: "pink" }}
              ></Box>
            </Box>
          </Box>

          <>
            <Divider />
            {match.teamC && ( 
            <Box
              sx={{
                display: "flex",
                background: "white",
                height: "40px",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "white",
                  height: "40px",
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "black",
                    fontSize: { lg: "12px", xs: "11px" },
                    marginLeft: "7px",
                    fontWeight: "600",
                  }}
                >
                  {match.teamC}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "white",
                  height: "40px",
                  width: { lg: "60%", xs: "80%" },
                  justifyContent: { xs: "flex-end", lg: "center" },
                  alignItems: "center",
                }}
              >
                {!matchesMobile && (
                  <SeparateBox
                    value={0
                    }
                    value2={0}
                    color={matchesMobile ? "white" : "#CEEBFF"}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                {!matchesMobile && (
                  <SeparateBox
                    value={
                      0
                    }
                    value2={0}
                    color={matchesMobile ? "white" : "#C2E6FF"}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                <SeparateBox
                  value={0
                  }
                  value2={0}
                  color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
                />
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                <SeparateBox
                  value={0}
                  value2={0}
                  color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
                />
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                {!matchesMobile && (
                  <SeparateBox
                    value={0
                    }
                    value2={0}
                    color={matchesMobile ? "white" : "#F2CBCB"}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                {!matchesMobile && (
                  <SeparateBox
                    value={0
                    }
                    value2={0}
                    color={matchesMobile ? "white" : "#ECD6D6"}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
              </Box>
            </Box>
            )}
          </>

        </Box>
      </Box>
    </>
  );
};

export default memo(Odds);
