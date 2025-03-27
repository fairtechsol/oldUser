import { Box, Typography } from "@mui/material";
import CommissionDot from "../../Common/CommissionDot";

const SingleBox = ({
  data,
  header,
  color,
  up,
  first,
  time,
  boxWidth,
  isCommissionActive,
}: any) => {
  return !header ? (
    first ? (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          background: "#F1C550",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                  fontSize: { xs: "8px", md: "10px", lg: ".7vw" },
                  color: "black",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                {isCommissionActive && <CommissionDot />}
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
                  fontSize: { xs: "8px", md: "10px", lg: ".7vw" },
                  color: "black",
                  textAlign: "center",
                  maxHeight: "2em",
                  overflowWrap: "anywhere",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {" "}
                {isCommissionActive && <CommissionDot />}
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
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { lg: "9px", md: "9px", xs: "9px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {time}
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { lg: "9px", md: "10px", xs: "10px" },
            color: "black",
            textAlign: "center",
            textTransform: "uppercase",
            maxHeight: "2em",
            overflow: "hidden",
            lineHeight: 1,
            overflowWrap: "anywhere",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isCommissionActive && <CommissionDot />}
          {data}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          width: boxWidth,
          height: "40px",
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            overflow: "hidden",
            fontSize: {
              xs: "8px",
              md: "9px",
              lg: "9px",
              textTransform: "capitalize",
              lineHeight: 0.9,
            },
            color: "black",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isCommissionActive && <CommissionDot />}
          {data}
        </Typography>
      </Box>
    )
  ) : (
    header && (
      <Box
        sx={{
          width: boxWidth,
          height: "25px",
          background: "#319E5B",
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
