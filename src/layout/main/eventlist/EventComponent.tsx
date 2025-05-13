import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { EventNamesType } from "../../../interface/common";

const EventComponent = ({ data }: { data: EventNamesType }) => {
  return (
    <Box
      className="eventTab"
      sx={{
        width: "60px",
        minHeight: 80,
        minWidth: 80,
        height: "60px",
        marginX: ".5vw",
        marginBottom: "1vh",
        borderRadius: ".6vh",
        display: "flex",
        flexDirection: "column",
        border: "2px solid white",
        alignItems: "center",
        justifyContent: { lg: "center", xs: "center" },
        background: "white",
        cursor: "pointer",
      }}
    >
      <img
        src={data.image}
        style={{ width: "35px", height: "35px", alignSelf: "center" }}
        alt="image"
      />
      <Typography
        noWrap
        sx={{
          fontSize: { lg: "11px", xs: "11px" },
          fontWeight: { xs: "500", md: "500" },
          marginTop: { xs: "5px", lg: ".8vh" },
          color: "black",
        }}
      >
        {data.title}
      </Typography>
    </Box>
  );
};

export default memo(EventComponent);
