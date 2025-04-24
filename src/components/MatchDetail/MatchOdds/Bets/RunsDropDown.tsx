import { Box, Typography } from "@mui/material";
import { memo } from "react";
import StyledImage from "../../../Common/StyledImages";

const RunsDropDown = ({ list }: any) => {
  return (
    <Box
      sx={{
        borderRadius: "5px",
        border: "1px solid #306A47",
        zIndex: 1001,
        overflow: "hidden",
        top: "35px",
        left: { lg: "0%", xs: "60%", md: "60%" },
        position: "absolute",
        width: { md: "40%", xs: "40%", lg: "100%" },
      }}
    >
      <Box
        sx={{
          minHeight: "100px",
          flexDirection: "column",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <Box sx={{ display: "flex", height: "25px" }}>
          <Box
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              Runs
            </Typography>
          </Box>
          <Box
            sx={{
              width: "70%",
              display: "flex",
              borderLeft: "1px solid #306A47",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#306A47",
                fontWeight: "bold",
                fontSize: "12px",
                width: "62px",
              }}
            >
              Amount
            </Typography>
          </Box>
        </Box>
        <Box sx={{ maxHeight: "200px", overflowY: "scroll" }}>
          {list?.length > 0 ? (
            list?.map((v: any, index: number) => {
              const getColor = (value: number) => {
                if (value >= 1) {
                  return "#10DC61";
                } else if (value === v?.profit_loss && value > 1) {
                  return "#F8C851";
                } else if (value === 0) {
                  return "#F8C851";
                } else {
                  return "#DC3545";
                }
              };
              const getSVG = (value: number) => {
                if (value > 1) {
                  return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
                } else if (value === v?.profit_loss && value > 1) {
                  return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
                } else if (value === 0) {
                  return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
                } else {
                  return "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg";
                }
              };
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    height: "25px",
                    borderTop: "1px solid #306A47",
                  }}
                >
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#306A47",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {v?.odds}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "70%",
                      display: "flex",
                      borderLeft: `1px solid #306A47`,
                      background: getColor(v?.profitLoss),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "12px",
                        color: "white",
                        width: "40px",
                      }}
                    >
                      {Number(v?.profitLoss) >= 0 ? (
                        <>
                          <span style={{ visibility: "hidden" }}>-</span>
                          {v?.profitLoss}
                        </>
                      ) : (
                        v?.profitLoss
                      )}
                    </Typography>
                    <StyledImage
                      src={getSVG(v?.profitLoss)}
                      sx={{
                        height: "15px",
                        marginLeft: "5px",
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                        width: "15px",
                      }}
                      alt="profit"
                    />
                  </Box>
                </Box>
              );
            })
          ) : (
            <>
              {" "}
              <Box
                sx={{
                  display: "flex",
                  height: "25px",
                  borderTop: "1px solid #306A47",
                }}
               />{" "}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(RunsDropDown);
