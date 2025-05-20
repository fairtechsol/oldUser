import { Box, Typography } from "@mui/material";
import { memo, useState } from "react";
import { liveTv } from "../../../assets";
import { LiveScoreBoardProps } from "../../../interface/common/GameDetail";
import "./style.scss";

const LiveScoreBoard = ({ data, width, setIsTv }: LiveScoreBoardProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <Box
      sx={{
        width: {
          md: "98%",
          xs: "98%",
          lg: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        marginX: { lg: "0vw", xs: "0px", md: "0px" },
        marginY: { lg: ".5vh", xs: "0.2vh" },
        marginTop: { xs: "0" },
        borderRadius: "2px",
        background: "white",
        padding: "1px",
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
          onClick={() => {
            setVisible(!visible);
          }}
          sx={{
            flex: 1,
            background: "#f1c550",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "13px", md: "10px", xs: "10px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            Live Scoreboard
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <div className="slanted" />
        </Box>
        <Box
          onClick={() => {
            setIsTv((prev: boolean) => !prev);
          }}
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "13px", md: "10px", xs: "10px" },
              fontWeight: "bold",
              marginLeft: "7px",
              color: "#fff",
              marginTop: "5px",
            }}
          >
            TV
          </Typography>
          <img
            // onClick={() => {
            //   setIsTv((prev: boolean) => !prev);
            //   setVisible((prev: any) => !prev);
            // }}
            style={{
              width: "35px",
              height: "30px",
              color: "white",
              // marginLeft: "1.3rem",
              cursor: "pointer",
            }}
            src={liveTv}
            alt="live tv"
          />
          {/* <img
            onClick={() => {
              setIsTv((prev: boolean) => !prev);
              setVisible(!visible);
            }}
            src={ARROWUP}
            style={{
              transform: !visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
            alt="arrow up"
          /> */}
        </Box>
      </Box>
      <Box>
        {visible && data && (
          <div className="m-scorecard" style={{ width: width }}>
            <div className="row">
              <div className="col-12 ">
                <p className="team-1 row" style={{ fontSize: "12px" }}>
                  <span className=" col-2">{data?.spnnation1}</span>
                  <span className=" col-5 text-end">{data?.score1}</span>
                  {data?.spnrunrate1 && (
                    <div className="col-5 d-flex justify-content-start">
                      <span className="me-2">CRR {data?.spnrunrate1}</span>
                      {data?.spnreqrate1 && (
                        <span className="d-inline ms-2">
                          RR {data?.spnreqrate1}
                        </span>
                      )}
                    </div>
                  )}
                </p>
                <p className="team-1 row mt-2" style={{ fontSize: "12px" }}>
                  <span className="team-name col-2">{data?.spnnation2}</span>
                  <span className="score col-5 text-end">{data?.score2}</span>
                  {data?.spnrunrate2 && (
                    <div className="col-5 d-flex justify-content-start">
                      <span className="d-inline">CRR {data?.spnrunrate2}</span>
                      {data?.spnreqrate2 && (
                        <span className="d-inline ms-2">
                          RR {data?.spnreqrate2}
                        </span>
                      )}
                    </div>
                  )}
                </p>
              </div>
              <div className="col-12 d-flex align-items-center justify-content-xl-end">
                <div className="row">
                  <div className="col-12">
                    {data?.spnmessage && (
                      <div
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        {data?.dayno} | {data?.spnmessage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <p className="text-xl-end ball-by-ball mt-2 mb-0">
                    {data?.balls?.map((ball: any, index: any) => {
                      return ball == "" ? (
                        ""
                      ) : (
                        <span
                          key={index}
                          className={`ball-runs ${
                            ball === "4" || ball === "6" ? "four" : ""
                          }`}
                          style={{
                            backgroundColor:
                              ball === "ww"
                                ? "#ff0000"
                                : ball === "4"
                                ? "#087f23"
                                : ball === "6"
                                ? "#883997"
                                : "#08c",
                            fontSize: "12px",
                          }}
                        >
                          {ball}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default memo(LiveScoreBoard);
