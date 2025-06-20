import { Box, Typography } from "@mui/material";
import moment from "moment";

const TableRow = ({
  containerStyle,
  fContainerStyle,
  fTextStyle,
  index,
  date,
  closing,
  description,
  touserName,
  fromuserName,
  transType,
  amount,
  onClick,
}: any) => {
  const dateString = date;
  const formattedDate = moment
    .utc(dateString)
    .utcOffset("+05:30")
    .format("DD-MM-YYYY HH:mm:ss");
  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "45px",
          width: { xs: "222vw", md: "100%", lg: "100%" },
          background: "#0B4F26",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "2px solid white",
        },
        containerStyle,
      ]}
    >
      <Box
        sx={[
          {
            width: { xs: "14%", lg: "11%", md: "11%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          fContainerStyle,
        ]}
      >
        <Typography
          sx={[
            {
              fontSize: { xs: "10px", lg: "12px", md: "12px" },
              fontWeight: "600",
            },
            fTextStyle,
          ]}
        >
          {formattedDate}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "16%", lg: "14%", md: "14%" },
          display: "flex",
          paddingLeft: "10px",
          background: "#27AC1E",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
        >
          {["win", "add"].includes(transType)
            ? new Intl.NumberFormat("en-IN", { currency: "INR" }).format(amount)
            : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "16%", lg: "14%", md: "14%" },
          display: "flex",
          paddingLeft: { lg: "10px", xs: "5px" },
          background: "#E32A2A",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
        >
          {["withDraw", "loss", "creditReference"].includes(transType)
            ? new Intl.NumberFormat("en-IN", { currency: "INR" }).format(amount)
            : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "14%", lg: "11%", md: "11%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: index % 2 != 0 ? "#FFE094" : "#ECECEC",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {closing !== null
            ? new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                closing
              )
            : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "36%", lg: "36%", md: "36%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          overflow: "auto",
          height: "45px",
          lineHeight: "1",
          scrollbarWidth: "thin", // Customize scrollbar width (for Firefox)
          "&::-webkit-scrollbar": {
            width: "8px", // Customize scrollbar width (for WebKit browsers)
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Customize scrollbar thumb color
          },
          borderRight: "2px solid white",
          background: transType === "creditReference" ? "#F8C851" : "#FFE094",
          cursor: "pointer",
        }}
        onClick={() => onClick && onClick()}
      >
        <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "18%", lg: "11%", md: "18%" },
          display: "flex",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "center",
          background: index % 2 != 0 ? "#FFE094" : "#ECECEC",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "10px", lg: "12px", md: "10px" },
            fontWeight: "700",
          }}
        >
          {fromuserName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "18%", lg: "11%", md: "18%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: index % 2 != 0 ? "#FFE094" : "#ECECEC",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "10px", lg: "12px", md: "10px" },
            fontWeight: "700",
          }}
        >
          {touserName}
        </Typography>
      </Box>
    </Box>
  );
};

export default TableRow;
