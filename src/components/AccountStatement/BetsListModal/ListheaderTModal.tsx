import { Box, Typography } from "@mui/material";
import React from "react";

interface HeaderItem {
  label: string;
  width: {
    xs: string;
    md: string;
    lg: string;
  };
  align?: "left" | "center";
}

const headerItems: HeaderItem[] = [
  {
    label: "Game Name",
    width: { xs: "14%", md: "11%", lg: "11%" },
    align: "left",
  },
  {
    label: "Type",
    width: { xs: "16%", md: "14%", lg: "14%" },
    align: "left",
  },
  {
    label: "Amount",
    width: { xs: "16%", md: "14%", lg: "14%" },
    align: "left",
  },
  {
    label: "Total",
    width: { xs: "14%", md: "11%", lg: "11%" },
    align: "left",
  },
  {
    label: "Date",
    width: { xs: "18%", md: "18%", lg: "11%" },
    align: "left",
  },
  {
    label: "Round Id",
    width: { xs: "24%", md: "24%", lg: "17%" },
    align: "center",
  },
  {
    label: "Transaction Id",
    width: { xs: "30%", md: "30%", lg: "30%" },
    align: "center",
  },
];

const ListHeaderTModal: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        width: { xs: "222vw", md: "100%", lg: "100%" },
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      {headerItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            width: item.width,
            display: "flex",
            paddingLeft: item.align === "center" ? 0 : "10px",
            justifyContent: item.align === "center" ? "center" : "flex-start",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ListHeaderTModal;
