import {
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import { useState } from "react";
//   import {
//     CancelDark,
//     HourGlass,
//   } from "../assets";
//   import "../components/index.css";
  import Lottie from "lottie-react";
  import StyledImage from "../../../Common/StyledImages";
  import { useDispatch, useSelector } from "react-redux";
import BoxInput from "../../Common/BoxInput";
import MoneyBox from "../MoneyBox";
import TeamsOdssData from "./TeamOddsData";
import { CancelDark } from "../../../../assets";


  const OddsPlaceBet = ({
    handleClose,
    season,
    type,
    data,
    eventName,
    typeOfBet,
    placeBetData,
    setPlaceBetData,
    setFastRate,
    fastRate,
    setCanceled,
    handleRateChange
  }:any) => {
    const [defaultValue, setDefaultValue] = useState(" ");
    const [betPlaceLoading, setBetPlaceLoading] = useState(false);
    const dispatch = useDispatch();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [betPalaceError, setBetPalaceError] = useState(false);
  
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showModalMessage, setShowModalMessage] = useState("");
    const [newRates, setNewRates] = useState({
      loss_amount: 0,
      win_amount: 0,
    });
    const theme = useTheme();

    const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  
    // console.log(data);
    return (
      <Box
        sx={[
          {
            display: "flex",
            flexDirection: "column",
            border: "1px solid white",
            borderRadius: "5px",
            overflow: "hidden",
            marginLeft: season ? 0 : 0,
            width: { xs: "98vw", md: "60vw", lg: "40%" },
            position: "relative",
            boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
          },
        ]}
      >
        <Box sx={{ background: "#F8C851", width: "100%", overflow: "hidden" }}>
          <Box
            sx={[
              {
                height: "38px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: "10px",
              },
              (theme) => ({
                backgroundImage: `${theme.palette.primary.headerGradient}`,
              }),
            ]}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "10px", md: "10px", lg: "14px" },
                color: "white",
              }}
            >
              Place Bet
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MoneyBox
                trendingUp={false}
                rate={Number(newRates?.win_amount)?.toFixed(2)}
                color={"#10DC61"}
              />
              <Box sx={{ width: "5px" }}></Box>
              <MoneyBox
                trendingDown={false}
                rate={Number(newRates?.loss_amount).toFixed(2)}
                color="#FF4D4D"
              />
              <Box sx={{ width: "5px", marginRight: "20px" }}></Box>
              <StyledImage
                onClick={handleClose}
                src={CancelDark}
                sx={{
                  padding: "10px",
                  height: "50px",
                  width: "50px",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
            <TeamsOdssData
              title={"Team"}
              valueContainerStyle={{
                background: type?.color ? type?.color : "#F8C851",
              }}
              containerStyle={{ flex: season ? { xs: 2.5, lg: 2 } : 1 }}
              value={data?.name}
            />
            <TeamsOdssData
              input={true}
              title={"Odds"}
              valueContainerStyle={{
                background: type?.color ? type?.color : "#F8C851",
              }}
              value={60.00}
              containerStyle={{ marginLeft: "2px", flex: 1 }}
            />
            <TeamsOdssData
              title={"Back/Lay"}
              value={data?.type}
              valueContainerStyle={{ background: type?.color }}
              containerStyle={{ marginLeft: "2px", flex: 1 }}
            />
            {!matchesMobile && <Box sx={{ width: "20px" }}></Box>}
            <BoxInput
              setDefaultValue={setDefaultValue}
              defaultValue={defaultValue}
              selectedColorBox={type?.color}
           
              containerStyle={{ marginLeft: "2px", flex: 1.3 }}
              title={"Stake"}
            />
          </Box>
          {matchesMobile && (
            <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }} />
          )}
          {
            <>
              <Box sx={{ display: "flex", marginTop: "15px", marginX: "2px", border: '2px solid white' }}>
                {["2000", "3000", "5000", "10000"]?.map((v, idx) => (
                  <NumberData
                    key={idx}
                    containerStyle={{ marginLeft: "2px", flex: 1 }}
                    value={v}
                   
                    setDefaultValue={setDefaultValue}
                  />
                ))}
              </Box>
              <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
                {["20000", "100000", "200000", "500000"]?.map((v, idx) => (
                  <NumberData
                    key={idx}
                    containerStyle={{ marginLeft: "2px", flex: 1 }}
                    value={v}
                   
                    setDefaultValue={setDefaultValue}
                  />
                ))}
              </Box>
            </>
          }
          <Box
            sx={{
              display: "flex",
              flex: 1,
              paddingY: "2vh",
              justifyContent: "space-evenly",
            }}
          >
            <button
              // style={classes.CustomButton_Btn("#262626")}
              style={{
                color: "#FFF",
                backgroundColor: "#FF4949",
                width: "150px",
                // width: { lg: "150px", xs: "130px" },
                height: "35px",
                borderRadius: "5px",
                border: "2px solid white",
              }}
              onClick={() => {
                setDefaultValue(" ");
                setNewRates({
                  loss_amount: 0,
                  win_amount: 0,
                });
              }}
            >
              Reset
            </button>
  
            <button
              // style={classes.CustomButton_Btn("#262626")}
              style={{
                color: "#fff",
                backgroundColor: "#262626",
                width: "150px",
                cursor: betPlaceLoading ? "not-allowed" : "pointer",
                // width: { lg: "150px", xs: "130px" },
                height: "35px",
                borderRadius: "5px",
                border: "2px solid white",
              }}
            >
              Submit
            </button>
          </Box>
        </Box>
        {betPlaceLoading && (
          <Box
            sx={{
              position: "absolute",
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0, 0, 0, .5)",
            }}
          >
            {/* <Lottie
              animationData={HourGlass}
              style={{
                display: "flex",
                alignSelf: "center",
                width: "50px",
                height: "50px",
              }}
            /> */}
          </Box>
        )}
      </Box>
    );
  };
  
  const NumberData = ({
    value,
    containerStyle,
    setDefaultValue,
    getLatestBetAmount,
  }:any) => {
    return (
      <Box
        onClick={() => {
          setDefaultValue(value);
          getLatestBetAmount(value);
        }}
        sx={[
          {
            display: "flex",
            cursor: "pointer",
            borderRadius: "3px",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            minWidth: "18%",
            background: "#0B4F26",
          },
          containerStyle,
        ]}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  };
  export default OddsPlaceBet;
  