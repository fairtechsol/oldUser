import { Box, Typography } from "@mui/material";

const Rules = ({ userPadding }: any) => {
  const ListHeader = () => {
    return (
      <Box
        sx={{
          width: "100%",
          height: "25px",
          background: "white",
          display: "flex",
          padding: "1px",
        }}
      >
        <Box
          sx={{
            width: { lg: "3%", xs: "6%" },
            height: "100%",
            background: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "500", color: "white", fontSize: "12px" }}
          >
            No.
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "97%", xs: "94%" },
            height: "100%",
            background: "black",
            display: "flex",
            marginLeft: "1px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "400",
              color: "white",
              fontSize: "10px",
              paddingLeft: "5px",
            }}
          >
            Description
          </Typography>
        </Box>
      </Box>
    );
  };
  const RowComponent = ({ index }: any) => {
    let flag = index % 2 != 0;
    return (
      <Box
        sx={{
          width: "100%",
          height: "35px",
          background: "white",
          display: "flex",
          padding: "1px",
          paddingTop: "0px",
        }}
      >
        <Box
          sx={{
            width: { lg: "3%", xs: "6%" },
            height: "100%",
            background: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "500", color: "white", fontSize: "12px" }}
          >
            {index + 1}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "97%", xs: "94%" },
            height: "100%",
            background: flag ? "#ECECEC" : "#FFE094",
            display: "flex",
            marginLeft: "1px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "400",
              color: "black",
              fontSize: { lg: "10px", xs: "8px" },
              paddingLeft: "5px",
            }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et
          </Typography>
        </Box>
      </Box>
    );
  };
  return (
    <>
      <Typography
        sx={{
          fontSize: { xs: "12px", lg: "15px" },
          marginLeft: { lg: "2px", xs: "3px" },
          marginTop: "10px",
          marginBottom: "5px",
          color: "white",
          fontWeight: "bold",
          paddingTop: userPadding,
        }}
      >
        {"RULES"}
      </Typography>
      <ListHeader />
      {["", "", "", ""].map((_, index) => {
        return <RowComponent key={index} index={index} />;
      })}{" "}
    </>
  );
};

export default Rules;
