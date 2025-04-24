import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface CustomButtonProps {
  btnStyle: any;
  onClick: () => void;
}

const CustomButton = ({ btnStyle, onClick }: CustomButtonProps) => {
  return (
    <Box
      onClick={onClick}
      sx={[
        {
          width: "200px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: "4px",
          height: "35px",
          background: "#0B4F26",
          alignSelf: "end",
          marginRight: "10px",
          cursor: "pointer",
        },
        btnStyle,
      ]}
    >
      <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "600" }}>
        Load
      </Typography>
    </Box>
  );
};
export default memo(CustomButton);
