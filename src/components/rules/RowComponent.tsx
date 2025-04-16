import { Box, Typography } from "@mui/material";
import { memo } from "react";

const RowComponent = ({ index }: any) => {
  let flag = index % 2 != 0;
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "35px",
        background: "white",
        display: "flex",
        padding: "1px",
        paddingTop: "0px",
      }}
    >
      <Box
        sx={{
          width: { lg: "3%", xs: "6%" },
          height: "100%",
          background: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontWeight: "500", color: "white", fontSize: "12px" }}
        >
          {index + 1}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "97%", xs: "94%" },
          height: "100%",
          background: flag ? "#ECECEC" : "#FFE094",
          display: "flex",
          marginLeft: "1px",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "400",
            color: "black",
            fontSize: { lg: "10px", xs: "8px" },
            paddingLeft: "5px",
          }}
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et
        </Typography>
      </Box>
    </Box>
  );
};
export default memo(RowComponent);
