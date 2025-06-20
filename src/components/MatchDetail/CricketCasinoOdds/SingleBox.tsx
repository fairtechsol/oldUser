import { Box, Typography } from "@mui/material";

const SingleBox = ({
  data,
  header,
  color,
  up,
  first,
  time,
  isPercent,
  rate,
}: any) => {
  return !header ? (
    first ? (
      <Box
        sx={{
          width: "140%",
          height: "40px",
          flexDirection: "column",
          background: "#F8C851",
          // marginX: { xs: "1px", lg: "1px" },
          display: "flex",
          justifyContent: "center",
          // margin: "1px"
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { xs: "9px", lg: "9px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {time}
        </Typography>
        <Box sx={{ height: ".4vh" }}></Box>
        <Typography
          sx={{
            maxHeight: "1em",
            overflow: "hidden",
            lineHeight: 1,
            fontWeight: "600",
            fontSize: { lg: "9px", xs: "10px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {data}
        </Typography>
      </Box>
    ) : up ? (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          flexDirection: "column",
          background: color,
          marginX: { xs: "1px", lg: "1px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "8px",
            color: "black",
            textAlign: "end",
            marginRight: "3px",
          }}
        >
          {data.time}
        </Typography>
        <Box sx={{ height: ".4vh" }}></Box>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "12px",
            color: "black",
            textAlign: "start",
            marginLeft: "3px",
          }}
        >
          {data.country}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          width: "70%",
          height: "40px",
          background: color,
          // marginX: { xs: "1px", lg: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: {
              xs: "11px",
              lg: "9px",
              textTransform: "capitalize",
            },
            color: "black",
          }}
        >
          {data}
        </Typography>
        {isPercent && (
          <Typography
            sx={{
              fontSize: "9px",
              marginTop: -0.4,
              color: color == "white" ? "white" : "black",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {rate}
          </Typography>
        )}
      </Box>
    )
  ) : header && first ? (
    <Box
      sx={{
        width: "200%",
        height: "25px",
        background: "#319E5B",
        // marginX: { xs: "1px", lg: "1px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: "400",
          fontSize: "12px",
          color: "white",
          wordWrap: "break-word",
          lineHeight: "0.9"
        }}
      >
        {data}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "25px",
        background: "#319E5B",
        marginX: { xs: "0px", lg: "0px" },
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
  );
};

export default SingleBox;
