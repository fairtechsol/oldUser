import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const BoxInput = ({
  title,
  stakeValue,
  containerStyle,
  valueContainerStyle,
  setStakeValue,
  selectedColorBox,
}: any) => {
  const handleInputChange = (e: any) => {
    let value = e.target.value.trim();

    // Remove non-numeric and non-decimal characters
    value = value.replace(/[^0-9.]/g, "");

    // Only allow one decimal point
    const decimalCount = value.split(".").length - 1;
    if (decimalCount > 1) {
      return;
    }

    if (value === "") {
      setStakeValue(" "); // Set your desired default value here
    } else {
      setStakeValue(value);
    }
  };
  return (
    <Box sx={[{ display: "flex", flexDirection: "column" }, containerStyle]}>
      <Box
        sx={{
          background: "#262626",
          border: "1px solid #C7B6B6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "25px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "10px", lg: "11px" },
            fontWeight: "600",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={[
          {
            background: selectedColorBox ? selectedColorBox : "#0B4F26",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "32px",
            marginTop: "1px",
            border: "1px solid #FFF",
          },
          valueContainerStyle,
        ]}
      >
        <TextField
          value={stakeValue}
          // autoFocus
          variant="standard"
          InputProps={{
            sx: {
              "& input": {
                textAlign: "center",
              },
            },
            disableUnderline: true,
            style: {
              fontSize: "12px",
              fontWeight: "600",
              color: "black",
            },
            inputProps: {
              inputMode: "numeric",
            },
          }}
          onChange={handleInputChange}
          sx={{ textAlign: "center", alignItems: "center" }}
        />
      </Box>
    </Box>
  );
};

export default BoxInput;
