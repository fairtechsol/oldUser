import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const LiveMarket = ({ title, boxStyle, titleStyle, onClick }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const colors = [
    "#ff0000",
    "#117378",
    "#00a83a",
    "#913800",
    "#0000ff",
    "#4b0082",
    "#880088",
  ];
  useEffect(() => {
    let i = setInterval(() => {
      setCurrentIndex((state) => {
        if (state < 6) {
          return state + 1;
        } else {
          return 0;
        }
      });
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, []);
  const classes = {
    mainBoxsx: [
      {
        paddingX: "0.5%",
        display: "flex",
        height: "28px",
        alignItems: "center",
        background: "red",
        justifyContent: "center",
      },
      boxStyle,
    ],
    mainBoxTypography: [
      {
        fontSize: boxStyle?.fontSize ? boxStyle?.fontSize : "11px",
        lineHeight: "12px",
        fontWeight: "bold",
        color: colors[currentIndex],
        fontFamily: "Montserrat",
      },
      titleStyle,
    ],
  };

  return (
    <Box
      onClick={() => {
        onClick();
      }}
      sx={classes.mainBoxsx}
    >
      <Typography sx={classes.mainBoxTypography}>{title}</Typography>
    </Box>
  );
};

export default LiveMarket;
