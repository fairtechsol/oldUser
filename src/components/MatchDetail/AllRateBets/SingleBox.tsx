import { Box, Typography } from "@mui/material";

const SingleBox = ({
  data,
  header,
  color,
  up,
  first,
  time,
  width,
  boxWidth,
}: any) => {
  return !header ? (
    first ? (
      <Box
        sx={{
          width: width ? width : "100%",
          height: "40px",
          background: "#F1C550",
          // marginX: { xs: "0.5px", lg: "0.5px" },
          display: "flex",
          // gap: '0.5px',
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Box sx={{ height: ".4vh" }}></Box> */}
        {data === "Bookmaker" ? (
          <>
            <Box>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "9px", lg: "11px" },
                  color: "black",
                  textAlign: "center",
                }}
              >
                {time}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "8px", md: "10px", lg: ".5vw" },
                  color: "black",
                  textAlign: "center",
                }}
              >
                {data}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Box>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "9px", lg: "11px" },
                  color: "black",
                  textAlign: "center",
                }}
              >
                {time}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "8px", md: "10px", lg: ".5vw" },
                  color: "black",
                  textAlign: "center",
                  maxHeight: "2em",
                  overflow: "hidden",
                  lineHeight: 1,
                }}
              >
                {data}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    ) : up ? (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          flexDirection: "column",
          background: color,
          // marginX: { xs: "1px", lg: "1px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { lg: "11px", md: "9px", xs: "9px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {time}
        </Typography>
        {/* <Box sx={{ height: ".4vh" }}></Box> */}
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { lg: "12px", md: "10px", xs: "10px" },
            color: "black",
            textAlign: "center",
            textTransform: "uppercase",
            maxHeight: "1em",
            overflow: "hidden",
            lineHeight: 1,
          }}
        >
          {data}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          // width: "100%",
          width: boxWidth,
          height: "40px",
          background: color,
          // marginX: { xs: "1px", lg: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: {
              xs: "10px",
              md: "10px",
              lg: "12px",
              textTransform: "capitalize",
            },
            color: "black",
          }}
        >
          {data}
        </Typography>
      </Box>
    )
  ) : (
    header && (
      <Box
        sx={{
          // width: "100%",
          width: boxWidth,
          height: "25px",
          background: "#319E5B",
          // gap: '0.5px',
          // marginX: { xs: "1px", lg: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: { lg: ".7vw", xs: "10px" },
            color: "white",
            flexWrap: "wrap",
          }}
        >
          {data}
        </Typography>
      </Box>
    )
  );
};

export default SingleBox;
