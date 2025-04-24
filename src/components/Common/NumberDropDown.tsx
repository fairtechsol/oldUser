import { Box, Typography } from "@mui/material";
import { memo } from "react";
import SmallDropDown from "./SmallDropDown";

interface NumberDropDownProps {
  textColor: string;
  setPageLimit: (value: number) => void;
  pageLimit: number;
}

const NumberDropDown = ({
  textColor,
  setPageLimit,
  pageLimit,
}: NumberDropDownProps) => {
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
