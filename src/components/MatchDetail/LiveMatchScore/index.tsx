// https://www.sciencekids.co.nz/images/pictures/flags680/India.jpg
// https://www.sciencekids.co.nz/images/pictures/flags680/Pakistan.jpg
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";

import ARROWUP from "../../../assets/images/arrowup1.webp";
import { useState, useEffect } from "react";
// import { apiBasePath } from "./helper/constants";

const LiveScore = ({ currentMatch, liveScoreData, submit }: any) => {
  const [visible, setVisible] = useState(false);
  const [ballOutcomes, setBallOutcomes] = useState([]);
  const [ballLastOutcomes, setBallLastOutcomes] = useState([]);
  // const [lastOverRun, setLastOverRun] = useState("");
  const [currentOverRun, setCurrentOverRun] = useState("");
  const [innings, setInnings] = useState([]);

  useEffect(() => {
    if (liveScoreData) {
      setBallOutcomes(liveScoreData?.CurrentOver?.Balls);
      setCurrentOverRun(liveScoreData?.CurrentOver?.Runs);
      setBallLastOutcomes(liveScoreData?.LastOver?.Balls);
      // setLastOverRun(liveScoreData?.LastOver?.Runs);
      setInnings(liveScoreData?.Innings);
    }
  }, [liveScoreData]);

  return (
    <Box
      sx={[
        {
          width: {
            md: submit ? "100%" : "98%",
            xs: submit ? "100%" : "98%",
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
          // alignSelf: {
          //     xs: "center",
          //     md: "center",
          //     lg: "flex-start",
          // },
        },
      ]}
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
            // '#262626'
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
            justifyContent: "flex-end",
          }}
        >
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
            alt=""
          />
        </Box>
      </Box>
      {visible && (
        <Box
          sx={{
            display: "flex",
            padding: "8px",
            flexDirection: "column",
            flex: 1,
            justifyContent: "flex-end",
            borderBottom: "0px solid",
            borderColor: "gray",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                maxWidth: "20%",
                // alignItems: "center",
                justifyContent: "flex-end",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "8px", md: "10px", lg: "12px" },
                  marginTop: "0px",
                  fontWeight: "bold",
                }}
              >
                CRR: {""}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "8px", md: "10px", lg: "12px" },
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                RRR: {""}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                flexDirection: "column",
              }}
            >
              {innings?.[0] && (
                <Typography
                  sx={{
                    fontSize: { xs: "8px", md: "10px", lg: "12px" },
                    marginTop: "0",
                    fontWeight: "bold",
                  }}
                >
                  {"Runs"}/{"Wickets"} ({"Overs"})
                </Typography>
              )}
              {currentMatch?.teamA_Image && (
                <img
                  style={{
                    width: "45px",
                    height: "35px",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                  src={ARROWUP}
                  alt={currentMatch?.teamA}
                />
              )}
              <Typography
                sx={{
                  fontSize: { xs: "8px", md: "10px", lg: "12px" },
                  marginTop: "1vh",
                  fontWeight: "600",
                }}
              >
                {/* {"innings?.[0]?.Team"} */}
                {/* {innings?.[0]?.Team || currentMatch?.teamA} */}
                {/* {currentMatch?.teamA} */}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flex: 0.2,
                alignItems: "center",
                flexDirection: "column",

                marginTop: "1vh",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "8px", md: "8px", lg: "10px" },
                  marginTop: "5vh",
                  color: "gray",
                  fontWeight: "600",
                }}
              >
                V/S
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                flexDirection: "column",
              }}
            >
              {innings?.[1] && (
                <Typography
                  sx={{
                    fontSize: { xs: "8px", md: "10px", lg: "12px" },
                    marginTop: "1vh",
                    fontWeight: "bold",
                  }}
                >
                  {/* 282-8 (50) */}
                  {"Runs"}/{"Wickets"} ({"Overs"})
                </Typography>
              )}
              {currentMatch?.teamB_Image && (
                <img
                  style={{
                    width: "45px",
                    height: "35px",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                  src={ARROWUP}
                  alt={currentMatch?.teamB}
                />
              )}
              <Typography
                sx={{
                  fontSize: { xs: "8px", md: "10px", lg: "12px" },
                  marginTop: "1vh",
                  fontWeight: "600",
                }}
              >
                {"Team"}
                {/* {innings?.[1]?.Team || currentMatch?.teamB} */}
                {/* {currentMatch?.teamB} */}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "8px", md: "10px", lg: "14px" },
                  // marginTop: "1vh",
                  fontWeight: "bold",
                  color: "#319e5b",
                }}
              >
                Last Overs:{" "}
                {ballLastOutcomes?.reduce((acc, curr) => {
                  const parsedValue = parseInt(curr);
                  return isNaN(parsedValue) ? acc : acc + parsedValue;
                }, 0)}
              </Typography>
              <List
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                {ballLastOutcomes?.map((outcome, index) => (
                  <ListItem
                    key={index}
                    style={{
                      padding: 0,
                      width: "auto",
                      paddingLeft: "0px",
                      paddingRight: "5px",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: { xs: "8px", md: "10px", lg: "12px" },
                            fontWeight: "bold",
                            color: "#FF4D4D",
                          }}
                        >
                          {outcome}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
                {/* {ballLastOutcomes?.map((outcome, index) => (
                                    <ListItem key={index} style={{ padding: 0, width: 'auto', paddingLeft: '0px', paddingRight: '5px', }}>
                                        <ListItemText primary={<Typography sx={{ fontSize: { xs: "8px", md: "10px", lg: "12px" }, fontWeight: 'bold' }}>{outcome}</Typography>} />
                                    </ListItem>
                                ))} */}
              </List>
            </Box>
            <Divider />
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "8px", md: "10px", lg: "14px" },
                  // marginTop: "1vh",
                  fontWeight: "bold",
                  color: "#319e5b",
                }}
              >
                Current Over: {currentOverRun}
              </Typography>
              <List
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                {ballOutcomes?.map((outcome, index) => (
                  <ListItem
                    key={index}
                    style={{
                      padding: 0,
                      width: "auto",
                      paddingLeft: "0px",
                      paddingRight: "5px",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: { xs: "8px", md: "10px", lg: "12px" },
                            fontWeight: "bold",
                            color: "#FF4D4D",
                          }}
                        >
                          {outcome}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
                {/* {ballOutcomes?.map((outcome, index) => (
                                    <ListItem key={index} style={{ padding: 0, width: 'auto', paddingLeft: '0px', paddingRight: '5px', }}>
                                        <ListItemText primary={<Typography sx={{ fontSize: { xs: "8px", md: "10px", lg: "12px" }, fontWeight: 'bold' }}>{outcome}</Typography>} />
                                    </ListItem>
                                ))} */}
              </List>
            </Box>
          </Box>
          {/* <Divider /> */}
        </Box>
      )}
    </Box>
  );
};

export default LiveScore;
