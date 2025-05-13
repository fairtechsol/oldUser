import { Box, Typography } from "@mui/material";
import { memo } from "react";
import CommissionDot from "../../Common/CommissionDot";

interface SingleBoxProps {
  data: any;
  header: boolean;
  color: string | any;
  up?: boolean;
  first?: boolean;
  time?: string;
  boxWidth?: string;
  isCommissionActive?: boolean;
}

const SingleBox = ({
  data,
  header,
  color,
  up,
  first,
  time,
  boxWidth,
  isCommissionActive,
}: SingleBoxProps) => {
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
            <Box
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
            </Box>
          </>
        ) : (
          <>
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
            <Box
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
              {isCommissionActive && <CommissionDot />}
              {data}
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
            fontSize: { lg: "9px", md: "9px", xs: "7px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {time}
        </Typography>
        <Box
          sx={{
            fontWeight: "600",
            fontSize: { lg: "9px", md: "10px", xs: "8px" },
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
        </Box>
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
        <Box
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
        </Box>
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

export default memo(SingleBox);
