import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

interface HeaderColumn {
  label: string;
  width: {
    xs: string;
    md: string;
    lg: string;
  };
  align?: "left" | "center";
}

const headerColumns: HeaderColumn[] = [
  {
    label: "No",
    width: { xs: "14%", md: "11%", lg: "11%" },
    align: "left",
  },
  {
    label: "Type",
    width: { xs: "16%", md: "14%", lg: "14%" },
    align: "left",
  },
  {
    label: "Nation",
    width: { xs: "16%", md: "14%", lg: "14%" },
    align: "left",
  },
  {
    label: "Side",
    width: { xs: "14%", md: "11%", lg: "11%" },
    align: "left",
  },
  {
    label: "Rate",
    width: { xs: "18%", md: "18%", lg: "11%" },
    align: "left",
  },
  {
    label: "Amount",
    width: { xs: "18%", md: "18%", lg: "11%" },
    align: "center",
  },
  {
    label: "Win/Loss",
    width: { xs: "18%", md: "18%", lg: "11%" },
    align: "center",
  },
  {
    label: "Place Date",
    width: { xs: "18%", md: "18%", lg: "11%" },
    align: "center",
  },
  {
    label: "Match Date",
    width: { xs: "18%", md: "18%", lg: "11%" },
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
      {headerColumns.map((column, index) => (
        <Box
          key={index}
          sx={{
            width: column.width,
            display: "flex",
            paddingLeft: column.align === "center" ? 0 : "10px",
            justifyContent: column.align === "center" ? "center" : "flex-start",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            {column.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default memo(ListHeaderTModal);
