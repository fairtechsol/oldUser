import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const TeamsOdssData = ({
    input,
    title,
    value,
    containerStyle,
    valueContainerStyle,
    valueTextStyle,
    bet_condition,
  }:any) => {
    const [oddValue, setOddValue] = useState(value);
    useEffect(() => {
      setOddValue(value);
    }, [value]);
    
    return (
      <Box sx={[{ display: "flex", flexDirection: "column" }, containerStyle]}>
        <Box
          sx={{
            background: "#262626",
            border: "2px solid #C7B6B6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "25px",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "10px", md: "11px", lg: "11px" },
              fontWeight: "600",
            }}
          >
            {title}
          </Typography>
        </Box>
        {!input && (
          <Box
            sx={[
              {
                background: "white",
                border: "1px solid #FFF",
                // border: "0px solid #C7B6B6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "32px",
                marginTop: "1px",
              },
              valueContainerStyle,
            ]}
          >
            <Typography
              sx={[
                {
                  overflow: bet_condition && "hidden",
                  textOverflow: bet_condition && "ellipsis",
                  whiteSpace: bet_condition && "nowrap",
                  width: bet_condition && { lg: "140px", xs: "100px" },
                  margin: bet_condition && "auto",
                  marginTop: bet_condition && "5px",
                  color: "#262626",
                  padding: "1px",
                  fontSize: {
                    xs: "12px",
                    md: "12px",
                    lg: "12px",
                  },
                  fontWeight: { xs: "700", lg: "600" },
                  textTransform: 'capitalize'
                },
                valueTextStyle,
              ]}
            >
              {value}
            </Typography>
          </Box>
        )}
        {input && (
          <Box
            sx={[
              {
                // background: selectedColorBox,
                border: "1px solid #FFF",
                // border: "0px solid #C7B6B6",
                display: "flex",
                justifyContent: "center",
                paddingX: "4px",
                alignItems: "center",
                height: "32px",
                marginTop: "1px",
              },
              valueContainerStyle,
            ]}
          >
            {/* {!season && (
              <Box
                onClick={() => {
                  setOddValue((i:any) => Number(i) - 1);
                }}
                sx={{
                  width: "18px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  borderRadius: "3px",
                  height: "18px",
                  background: "#319E5B",
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
                >
                  -
                </Typography>
              </Box>
            )} */}
            <Box
              sx={{
                width: "30px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                borderRadius: "3px",
                height: "15px",
              }}
            >
              <Typography
                className="OddValue"
                sx={{
                  color: "black",
                  fontSize: { xs: "12px", lg: "12px" },
                  fontWeight: { xs: "700", lg: "600" },
                }}
              >
                {oddValue}
              </Typography>
            </Box>
            {/* {!season && (
              <Box
                onClick={() => {
                  setOddValue((i:any) => Number(i) + 1);
                }}
                sx={{
                  width: "18px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  borderRadius: "3px",
                  height: "18px",
                  background: "#319E5B",
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
                >
                  +
                </Typography>
              </Box>
            )} */}
          </Box>
        )}
      </Box>
    );
  };

  export default TeamsOdssData;