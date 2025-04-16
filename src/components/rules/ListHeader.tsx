import { Box, Typography } from "@mui/material";
import { memo } from "react";

const ListHeader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 25,
        bgcolor: "white",
        display: "flex",
        p: 0.125,
      }}
    >
      <Box
        sx={{
          width: { lg: "3%", xs: "6%" },
          bgcolor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "white",
            fontSize: 12,
          }}
        >
          No.
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "97%", xs: "94%" },
          bgcolor: "black",
          display: "flex",
          ml: 0.125,
          alignItems: "center",
          px: 0.625,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            color: "white",
            fontSize: 10,
          }}
        >
          Description
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(ListHeader);
