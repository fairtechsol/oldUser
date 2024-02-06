import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
//   import {
//     CancelDark,
//     HourGlass,
//   } from "../assets";
//   import "../components/index.css";
import StyledImage from "../../../Common/StyledImages";
import { useDispatch, useSelector } from "react-redux";
import BoxInput from "../../Common/BoxInput";
import MoneyBox from "../MoneyBox";
import TeamsOdssData from "./TeamOddsData";
import { CancelDark } from "../../../../assets";
import { AppDispatch, RootState } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../../../store/actions/betPlace/betPlaceActions";
import axios from "axios";
import { ApiConstants } from "../../../../utils/Constants";

const OddsPlaceBet = ({ handleClose, season, type, color }: any) => {
  const [stakeValue, setStakeValue] = useState(" ");
  const [betPlaceLoading] = useState(false);

  const [stake, setStake] = useState<any>(0);
  // console.log(stake);
  const [newRates, setNewRates] = useState({
    lossAmount: 0,
    winAmount: 0,
  });
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { success } = useSelector((state: RootState) => state.match.bet);
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [ipAddress, setIpAddress] = useState(null);

  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  useEffect(() => {
    setStake(selectedBet?.team?.stake);
  }, [selectedBet]);

  useEffect(() => {
    // Get browser information
    const { userAgent, appName, appVersion, platform } = navigator;
    const info: any = { userAgent, appName, appVersion, platform };
    setBrowserInfo(info);
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://geolocation-db.com/json/");
        if (data) {
          setIpAddress(data?.IPv4);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(selectedBetAction(null));
      dispatch(betPlaceSuccessReset());
      handleClose();
    }
  }, [success]);

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
            (theme: any) => ({
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
          <Box sx={{ display: "flex", alignItems: "center" ,}}>
            <MoneyBox
         
              trendingUp={false}
              rate={Number(newRates?.winAmount)?.toFixed(2)}
              color={"#10DC61"}
            />
            <Box sx={{ width: "5px" }}></Box>
            <MoneyBox
              trendingDown={false}
              rate={Number(newRates?.lossAmount).toFixed(2)}
              color={"#FF4D4D"}
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
            value={selectedBet?.team?.name ?? selectedBet?.team?.betOnTeam}
          />
          <TeamsOdssData
            input={true}
            title={"Odds"}
            valueContainerStyle={{
              background: type?.color ? type?.color : "#F8C851",
            }}
            value={selectedBet?.team?.rate}
            containerStyle={{ marginLeft: "2px", flex: 1 }}
            // onChange={(e:any) => {
            //   dispatch(
            //     selectedBetAction({
            //       ...selectedBet,
            //       team: { ...selectedBet?.team, stake: +e.target.value },
            //     })
            //   );
            // }}
          />
          <TeamsOdssData
            title={"Back/Lay"}
            value={selectedBet?.team?.type}
            valueContainerStyle={{ background: type?.color }}
            containerStyle={{ marginLeft: "2px", flex: 1 }}
          />
          {!matchesMobile && <Box sx={{ width: "20px" }}></Box>}
          <BoxInput
            setStakeValue={setStakeValue}
            stakeValue={stakeValue}
            selectedColorBox={type?.color}
            containerStyle={{ marginLeft: "2px", flex: 1.3 }}
            title={"Stake"}
            selectedBetAction={(value:any) =>
              value && selectedBetAction(selectedBet?.data)
            }
          />
        </Box>
        {matchesMobile && (
          <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }} />
        )}
        {
          <>
            <Box
              sx={{
                display: "flex",
                marginTop: "15px",
                marginX: "2px",
                border: "2px solid white",
              }}
            >
              {["2000", "3000", "5000", "10000"]?.map((v, idx) => (
                <NumberData
                  key={idx}
                  containerStyle={{ marginLeft: "2px", flex: 1 }}
                  value={v}
                  selectedBetAction={(value:any) =>
                    value && selectedBetAction(selectedBet?.data)
                  }
                  setStakeValue={setStakeValue}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
              {["20000", "100000", "200000", "500000"]?.map((v, idx) => (
                <NumberData
                  key={idx}
                  containerStyle={{ marginLeft: "2px", flex: 1 }}
                  value={v}
                  selectedBetAction={(value:any) =>
                    value && selectedBetAction(selectedBet?.data)
                  }
                  setStakeValue={setStakeValue}
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
              setStakeValue(" ");
              setNewRates({
                lossAmount: 0,
                winAmount: 0,
              });
            }}
          >
            Reset
          </button>

          <button
            type="submit"
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
            onClick={() => {
              let payloadForSession: any = {
                betId: selectedBet?.team?.betId,
                betType: selectedBet?.team?.type.toUpperCase(),
                browserDetail: browserInfo?.userAgent,
                eventName: selectedBet?.team?.name,
                eventType: selectedBet?.team?.eventType,
                matchId: selectedBet?.team?.matchId,
                ipAddress:
                  ipAddress === "Not found" || !ipAddress
                    ? "192.168.1.100"
                    : ipAddress,
                odds: selectedBet?.team?.rate,
                ratePercent: selectedBet?.team?.percent,
                stake: stakeValue || selectedBet?.team?.stake,
              };
              let payloadForBettings: any = {
                betId: selectedBet?.team?.betId,
                teamA: selectedBet?.team?.teamA,
                teamB: selectedBet?.team?.teamB,
                teamC: selectedBet?.team?.teamC,
                eventName: selectedBet?.team?.name,
                eventType: selectedBet?.team?.eventType,
                matchId: selectedBet?.team?.matchId,
                bettingType: selectedBet?.team?.type.toUpperCase(),
                browserDetail: browserInfo?.userAgent,

                ipAddress:
                  ipAddress === "Not found" || !ipAddress
                    ? "192.168.1.100"
                    : ipAddress,
                odd: selectedBet?.team?.rate,
                stake: stakeValue || selectedBet?.team?.stake,
                matchBetType: selectedBet?.team?.matchBetType,
                betOnTeam: selectedBet?.team?.betOnTeam,
                placeIndex: selectedBet?.team?.placeIndex,
              };
              dispatch(
                placeBet({
                  url:
                    selectedBet?.data?.type === "session" ||
                    selectedBet?.data?.SelectionId
                      ? ApiConstants.BET.PLACEBETSESSION
                      : ApiConstants.BET.PLACEBETMATCHBETTING,
                  data:
                    selectedBet?.data?.type === "session" ||
                    selectedBet?.data?.SelectionId
                      ? JSON.stringify(payloadForSession)
                      : JSON.stringify(payloadForBettings),
                })
              );
              // handleClose()
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
  setStakeValue,
  selectedBetAction,
}: any) => {
  return (
    <Box
      onClick={() => {
        setStakeValue(value);
        selectedBetAction(value);
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
