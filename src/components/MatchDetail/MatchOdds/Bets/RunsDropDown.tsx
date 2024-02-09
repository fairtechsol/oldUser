import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import StyledImage from "../../../Common/StyledImages";



const RunsDropDown = ({ anchorEl, open, handleClose, list }:any) => {
  const theme = useTheme();


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
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px", width: "62px" }}
            >
              Amount
            </Typography>
          </Box>
        </Box>
        <Box sx={{ maxHeight: "200px", overflowY: "scroll" }}>
          {list?.length > 0 ? (
            list?.map((v: { profit_loss: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; odds: boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Key | null | undefined; }) => {
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
                //   key={v?.odds}
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
                      {"v?.odds"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "70%",
                      display: "flex",
                      borderLeft: `1px solid #306A47`,
                    //   background: getColor("v?.profit_loss"),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "12px",
                        color: "white",
                        width: "40px"
                      }}
                    >
                      {Number(v?.profit_loss) >= 0 ? (
                        <>
                          <span style={{ visibility: "hidden" }}>-</span>
                          {v?.profit_loss}
                        </>
                      ) : (
                        v?.profit_loss
                      )}
                    </Typography>
                    <StyledImage
                    //   src={getSVG(v?.profit_loss)}
                      sx={{
                        height: "15px",
                        marginLeft: "5px",
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                        width: "15px",
                      }}
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
              >
              </Box>{" "}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RunsDropDown;
