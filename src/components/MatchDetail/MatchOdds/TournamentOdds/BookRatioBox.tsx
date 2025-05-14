import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { handleDecimalAmount } from "../../../../helper";
import { BookRatioBoxProps } from "../../../../interface/common/GameDetail";

const BookRatioBox = ({ valueA, valueB }: BookRatioBoxProps) => {
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
          {handleDecimalAmount(parseFloat(valueA || 0.0), "")}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "70px", xs: "45px", md: "70px" },
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
          {handleDecimalAmount(parseFloat(valueB || 0.0), "")}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(BookRatioBox);
