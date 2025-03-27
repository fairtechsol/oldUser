import { Box, Typography } from "@mui/material";

const NumberData = ({
  value,
  containerStyle,
  setStakeValue,
  selectedBetAction,
  setNewRatesValue,
}: any) => {
  return (
    <Box
      onClick={() => {
        setNewRatesValue({
          lossAmount: value?.value,
          winAmount: value?.value,
        });
        setStakeValue(value?.value);

        selectedBetAction(value);
      }}
      sx={[
        {
          display: "flex",
          cursor: "pointer",
          borderRadius: "3px",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          minWidth: "18%",
          background: "#0B4F26",
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "13px",
          fontWeight: "500",
        }}
      >
        {value?.label}
      </Typography>
    </Box>
  );
};

export default NumberData;
