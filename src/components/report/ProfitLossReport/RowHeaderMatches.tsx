import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { ARROW_DOWN, ARROW_UP, ArrowDown } from "../../../assets";
import { formatToINR } from "../../../helper";
import { gameIconConstants } from "../../../utils/Constants";
import StyledImage from "../../Common/StyledImages";

const RowHeaderMatches = ({ item, getHandleReport, show }: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      onClick={() => getHandleReport(item?.eventType)}
      sx={{
        width: "100%",
        height: { lg: "60px", xs: "50px" },
        background: "white",
        display: "flex",
        padding: 0.1,
      }}
    >
      <Box
        sx={{
          width: { xs: "10%", lg: "5%" },
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          background: "#F8C851",
        }}
      >
        <StyledImage
          src={gameIconConstants[item?.eventType]}
          sx={{ width: { lg: "35px", xs: "25px" } }}
          alt=""
        />
      </Box>
      <Box
        sx={{
          width: { xs: "40%", lg: "60%" },
          height: "100%",
          alignItems: "center",
          display: "flex",
          paddingX: "10px",
          background: "#F8C851",
          marginLeft: 0.1,
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: "15px", color: "black", fontWeight: "600" }}
        >
          {item?.eventType}
        </Typography>
        <StyledImage
          src={ArrowDown}
          sx={{
            width: { lg: "20px", xs: "10px" },
            transform: show ? "rotate(180deg)" : "rotate(0deg)",
            height: { lg: "10px", xs: "6px" },
          }}
          alt=""
        />
      </Box>
      <Box
        sx={{
          background: item?.totalLoss > 0 ? "#27AC1E" : "#E32A2A",
          paddingX: "2px",
          width: { xs: "25%", lg: "30%" },
          height: "100%",
          marginLeft: 0.1,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "14px", xs: "12px" },
              fontWeight: "700",
              color: "white",
            }}
          >
            {item?.totalLoss > 0 ? "Profit" : "Loss"}
          </Typography>
          <StyledImage
            src={item?.totalLoss > 0 ? ARROW_UP : ARROW_DOWN}
            sx={{
              width: { lg: "25px", xs: "15px" },
              height: { lg: "12px", xs: "8px" },
            }}
            alt=""
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: { lg: "14px", xs: "10px" },
              fontWeight: "700",
              color: "white",
            }}
          >
            {formatToINR(Number(item?.totalLoss).toFixed(2))}{" "}
            {`(${matchesMobile ? "TD(1%)" : "Total Deduction"}: 
                  ${formatToINR(
                    parseFloat(item?.totalDeduction || 0).toFixed(2)
                  )})`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#0B4F26",
          paddingX: "2px",
          width: { xs: "25%", lg: "30%" },
          height: "100%",
          marginLeft: 0.1,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "14px", xs: "12px" },
            fontWeight: "700",
            color: "white",
          }}
        >
          Total Bet
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontSize: { lg: "14px", xs: "10px" },
              fontWeight: "700",
              color: "white",
              textAlign: "center",
            }}
          >
            {item?.totalBet}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(RowHeaderMatches);
