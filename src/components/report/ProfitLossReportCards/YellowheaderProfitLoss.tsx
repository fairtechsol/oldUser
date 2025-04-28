import { Box, Typography } from "@mui/material";
import { memo } from "react";
import Calendar from "../../../components/Common/Calendar";
import CustomButton from "../../../components/Common/CustomButton";

interface YellowHeaderProfitLossProps {
  startDate: any;
  setEndDate: (date: any) => void;
  setStartDate: (date: any) => void;
  endDate: any;
  onClick: () => void;
  title: string;
}

const YellowHeaderProfitLoss = ({
  startDate,
  setEndDate,
  setStartDate,
  endDate,
  onClick,
  title,
}: YellowHeaderProfitLossProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: ".1vh",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          color: "white",
          marginLeft: "0.5%",
          fontWeight: "600",
          marginY: { lg: "0.5%", xs: "2%" },
          alignSelf: "start",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          flexDirection: "column",
          width: "99%",
          paddingY: { lg: "0vh", xs: "1vh" },
          background: "#F8C851",
          alignSelf: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { lg: "60%", xs: "100%" },
            flexDirection: { lg: "row", xs: "column" },
            padding: "10px 20px",
          }}
        >
          <Box sx={{ width: "10px" }} />

          <Box sx={{ display: "flex", width: { xs: "100%", lg: "60%" } }}>
            <Box sx={{ display: "flex", width: { lg: "70%", xs: "60%" } }}>
              <Calendar
                title="From"
                startDate={startDate}
                setStartDate={setStartDate}
              />
              <Box sx={{ width: "10px" }} />

              <Calendar
                title="To"
                startDate={endDate}
                setStartDate={setEndDate}
                limit={startDate}
              />
            </Box>
            <Box sx={{ width: "10px" }} />
            <Box
              sx={{
                width: { xs: "40%", lg: "30%" },
                alignSelf: "flex-end",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: ".3vh",
                  opacity: "0",
                }}
              >
                456
              </Typography>
              <CustomButton
                onClick={onClick}
                btnStyle={{
                  width: { xs: "100%", lg: "100%" },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default memo(YellowHeaderProfitLoss);
