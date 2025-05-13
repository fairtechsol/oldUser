import { Box, Typography } from "@mui/material";
import { memo } from "react";

const SeparateBox = ({ color, value, value2 }: any) => {
  const classes = {
    container: {
      background: color,
      border: color !== "white" ? "1px solid #2626264D" : "0px solid white",
      width: { xs: "24.5%", lg: "20%" },
      height: "94%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    emptylockWrapper: { alignItems: "center", justifyContent: "space-around" },
    value1: {
      fontSize: "13px",
      color: color === "white" ? "white" : "black",
      fontWeight: "700",
      textAlign: "center",
    },
    value2: {
      fontSize: "12px",
      marginTop: -0.4,
      color: color === "white" ? "white" : "black",
      textAlign: "center",
    },
    lockImage: { width: "10px", height: "15px" },
  };

  return (
    <Box sx={classes.container}>
      <Box sx={classes.emptylockWrapper}>
        <Typography sx={classes.value1}>{value}</Typography>
        {value2 ? (
          <Typography sx={classes.value2}>
            {value2 >= 1000
              ? (value2 / 1000)?.toFixed(1) + "k"
              : value2?.toString()}
          </Typography>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default memo(SeparateBox);
