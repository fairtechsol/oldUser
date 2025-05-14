import { Box, Typography } from "@mui/material";
import { memo, useCallback } from "react";
import { NumberDataProps } from "../../../../interface/common/GameDetail";

const NumberData = ({
  value,
  containerStyle,
  setStakeValue,
  selectedBetAction,
}: NumberDataProps) => {
  const handleClick = useCallback(() => {
    setStakeValue(value.value);
    selectedBetAction(value);
  }, [value, setStakeValue, selectedBetAction]);

  return (
    <Box
      onClick={handleClick}
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

export default memo(NumberData);
