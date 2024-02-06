import { Box, Typography } from "@mui/material";

const MoneyBox = ({ color, rates }: any) => {
  return (
    <Box
      sx={{
        width: "90px",
        marginRight: "20px",
        border: "1px solid #2626264D",
        borderRadius: "5px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "25px",
        background: color,

        zIndex: 100,
      }}
    >
      <Typography sx={{ fontSize: "10px", fontWeight: "bold", color: "white" }}>
        {rates || 0}
      </Typography>
    </Box>
  );
};
export default MoneyBox;
