import { Box, Typography } from "@mui/material";
import { memo } from "react";

const TableRowModal = ({
  containerStyle,
  fContainerStyle,
  fTextStyle,
  index,
  teamName,
  betType,
  odds,
  amount,
  result,
  createdAt,
  startAt,
}: any) => {
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
          {index + 1}
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
          {teamName}
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
          {betType}
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
          {odds}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "18%", lg: "11%", md: "18%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          overflow: "auto",
          height: "45px",
          lineHeight: "1",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
          {amount}
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
          {result}
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
          {createdAt}
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
          {startAt}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(TableRowModal);
