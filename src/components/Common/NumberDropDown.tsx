import { Box, Typography } from "@mui/material";
import { memo } from "react";
import SmallDropDown from "./SmallDropDown";

const NumberDropDown = ({ textColor, setPageLimit, pageLimit }: any) => {
  return (
    <Box display="flex" alignItems="center" sx={{ width: "100%" }}>
      <Typography
        sx={{ fontSize: "10px", color: `${textColor}`, fontWeight: "500" }}
      >
        Show
      </Typography>
      <SmallDropDown pageLimit={pageLimit} setPageLimit={setPageLimit} />
      <Typography
        sx={{ fontSize: "10px", color: `${textColor}`, fontWeight: "500" }}
      >
        Entries
      </Typography>
    </Box>
  );
};

export default memo(NumberDropDown);
