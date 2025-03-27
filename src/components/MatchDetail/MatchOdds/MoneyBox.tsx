import { Box, Typography } from "@mui/material";
import { handleDecimalAmount } from "../../../helper";

const MoneyBox = ({ color, rates }: any) => {
  let val: any = parseFloat(rates || 0);

  return (
    <Box
      sx={{
        width: "90px",
        marginRight: "15px",
        border: "1px solid #2626264D",
        borderRadius: "5px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "25px",
        background: "#F6F6F6",
        zIndex: 100,
      }}
    >
      <Typography sx={{ fontSize: "10px", fontWeight: "bold", color: color }}>
        {handleDecimalAmount(val, color)}
      </Typography>
    </Box>
  );
};
export default MoneyBox;
