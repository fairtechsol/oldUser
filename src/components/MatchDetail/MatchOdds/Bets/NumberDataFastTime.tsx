import { Box, Typography } from "@mui/material";
import { currencyFormatter } from "../../../../helper";

const NumberData = ({
  lable,
  containerStyle,
  backgroundColor,
  setMinWidth,
  handleBet,
}: any) => {
  return (
    <Box
      sx={[
        {
          display: "flex",
          cursor: "pointer",
          borderRadius: "3px",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          minWidth: { lg: "22%", xs: setMinWidth == "no" ? "" : "47%" },
          background: `${backgroundColor}`,
        },
        containerStyle,
      ]}
      onClick={handleBet}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        {currencyFormatter(lable)}
      </Typography>
    </Box>
  );
};

export default NumberData;
