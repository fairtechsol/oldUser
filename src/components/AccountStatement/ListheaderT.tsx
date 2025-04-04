import { Box, Typography } from "@mui/material";

const headerItems = [
  { label: "Date", width: { xs: "14%", lg: "11%", md: "11%" }, align: "left" },
  {
    label: "Credit",
    width: { xs: "16%", lg: "14%", md: "14%" },
    align: "left",
  },
  { label: "Debit", width: { xs: "16%", lg: "14%", md: "14%" }, align: "left" },
  {
    label: "Closing",
    width: { xs: "14%", lg: "11%", md: "11%" },
    align: "left",
  },
  {
    label: "Description",
    width: { xs: "36%", lg: "36%", md: "36%" },
    align: "left",
  },
  {
    label: "From",
    width: { xs: "18%", lg: "11%", md: "18%" },
    align: "center",
  },
  { label: "To", width: { xs: "18%", lg: "11%", md: "18%" }, align: "center" },
];

const ListHeaderT = () => {
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
      {headerItems.map((item) => (
        <Box
          key={item.label}
          sx={{
            width: item.width,
            display: "flex",
            paddingLeft: item.align === "left" ? "10px" : 0,
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

export default ListHeaderT;
