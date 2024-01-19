import { useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

import LabelButton from "../../components/ChangeValueButtons/LabelButton";
import ValueButton from "../../components/ChangeValueButtons/ValueButton";

const ChangeButtonValue = () => {

  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [valueLabel, setValueLabel] = useState([
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
  ]);

  const [valueLabel1, setValueLabel1] = useState([
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
    { lable: "", value: "" },
  ]);



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row", md: "column" },
      }}
    >
      {/* {visible ? ( */}
      <>
        <Box
          sx={{
            flex: 1,
            width: { xs: "96vw", lg: "35vw", md: "35vw" },
            minWidth: { lg: "450px", md: "450px", xs: "0px" },
            marginTop: "10px",
            marginX: { xs: "2vw", lg: "1vw" },
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "18px", xs: "20px" },
              fontWeight: "700",
            }}
          >
            Change Match Button Values
          </Typography>
          <Box
            sx={{
              width: "100%",
              minHeight: "200px",
              background: "#F8C851",
              borderRadius: "5px",
              padding: "20px",
              marginTop: "10px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    color: "#202020",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Price Lable
                </Typography>
                {valueLabel.map((item, index) => {
                  return (
                    <LabelButton
                      key={index}
                      value={item}
                      index={index}
                    //   onChange={handleLabelChange}
                    />
                  );
                })}
              </Box>
              <Box sx={{ flex: 1, marginLeft: "10px" }}>
                <Typography
                  sx={{
                    color: "#202020",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Price Value
                </Typography>
                {valueLabel.map((item, index) => {
                  return (
                    <ValueButton
                      key={index}
                      value={item}
                      index={index}
                    //   onChange={handleLabelChange}
                    />
                  );
                })}
              </Box>
            </Box>
            <Box
            //   onClick={setMatchButtonList}
              sx={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mx: "auto",
                marginTop: "50px",
                marginBottom: "40px",
                width: "80%",
                background: "#0B4F26",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{ fontSize: { lg: "18px", xs: "20px" } }}
                color={"white"}
              >
                {loader ? (
                  <CircularProgress
                    sx={{
                      color: "#FFF",
                    }}
                    size={20}
                    thickness={4}
                    value={60}
                  />
                ) : (
                  "Update"
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
      <>
        <Box
          sx={{
            flex: 1,
            width: { xs: "96vw", lg: "35vw", md: "35vw" },
            minWidth: { lg: "450px", md: "450px", xs: "0px" },
            marginTop: "10px",
            marginX: { xs: "2vw", lg: "1vw" },
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "18px", xs: "20px" },
              fontWeight: "700",
            }}
          >
            Change Session Button Values
          </Typography>
          <Box
            sx={{
              width: "100%",
              minHeight: "200px",
              background: "#F8C851",
              borderRadius: "5px",
              padding: "20px",
              marginTop: "10px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    color: "#202020",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Price Lable
                </Typography>
                {valueLabel1.map((item, index) => {
                  return (
                    <LabelButton
                      key={index}
                      value={item}
                      index={index}
                    //   onChange={handleLabel1Change}
                    />
                  );
                })}
              </Box>
              <Box sx={{ flex: 1, marginLeft: "10px" }}>
                <Typography
                  sx={{
                    color: "#202020",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Price Value
                </Typography>
                {valueLabel1.map((item, index) => {
                  return (
                    <ValueButton
                      key={index}
                      value={item}
                      index={index}
                    //   onChange={handleLabel1Change}
                    />
                  );
                })}
              </Box>
            </Box>
            <Box
            //   onClick={setSessionButtonList}
              sx={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mx: "auto",
                marginTop: "50px",
                marginBottom: "40px",
                width: "80%",
                background: "#0B4F26",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{ fontSize: { lg: "18px", xs: "20px" } }}
                color={"white"}
              >
                {loader1 ? (
                  <CircularProgress
                    sx={{
                      color: "#FFF",
                    }}
                    size={20}
                    thickness={4}
                    value={60}
                  />
                ) : (
                  "Update"
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    </Box>
  );
};

export default ChangeButtonValue;