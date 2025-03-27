import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useState } from "react";
import ARROWUP from "../../../assets/images/arrowup1.webp";

const LiveScore = ({ liveScoreData, submit }: any) => {
  const [visible, setVisible] = useState(false);

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
      {!visible && (
        <div
          dangerouslySetInnerHTML={{
            __html: liveScoreData ? liveScoreData : "",
          }}
        ></div>
      )}
    </Box>
  );
};

export default LiveScore;
