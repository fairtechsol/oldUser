import { Box, Typography } from "@mui/material";
import StyledImage from "../../../Common/StyledImages";

const MoneyBox = ({ color, trendingDown, rate, trendingUp }: any) => {
  return (
    <Box
      sx={{
        width: { xs: "70px", md: "100px", lg: "100px" },
        height: "25px",
        alignItems: "center",
        justifyContent: "center",
        background: color,
        borderRadius: "4px",
        display: "flex",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "10px", md: "13px", lg: "13px" },
          fontWeight: "700",
          color: "white",
        }}
      >
        {rate}
      </Typography>
      {trendingUp && (
        <StyledImage
          src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
          sx={{
            height: "20px",
            marginLeft: "5px",
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            width: "20px",
          }}
          alt=""
        />
      )}
      {trendingDown && (
        <StyledImage
          src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
          sx={{
            height: "20px",
            marginLeft: "5px",
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            width: "20px",
          }}
          alt=""
        />
      )}
    </Box>
  );
};

export default MoneyBox;
