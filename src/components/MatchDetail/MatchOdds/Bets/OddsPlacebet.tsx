import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelDark } from "../../../../assets";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { ApiConstants } from "../../../../utils/Constants";
import StyledImage from "../../../Common/StyledImages";
import BoxInput from "../../Common/BoxInput";
import PlaceBetMoneyBox from "../PlaceBetMoneyBox";
import NumberData from "./NumberDataOdds";
import TeamsOdssData from "./TeamOddsData";
import NotificationModal from "../../../Common/NotificationModal";
import { toast } from "react-toastify";


const OddsPlaceBet = ({ handleClose, season, type }: any) => {
  const [stakeValue, setStakeValue] = useState<any>(" ");
  const [matchOddLoading, setMatchOddLoading] = useState<any>(false);
  const { buttonValues, getProfile } = useSelector(
    (state: RootState) => state.user.profile
  );
  const { selectedBet, minMax } = useSelector(
    (state: RootState) => state.match.matchList
  );
  let sessionButtonValues: any = [];
  let matchButtonValues: any = [];

  buttonValues.forEach((item: any) => {
    const parsedValue = JSON.parse(item.value);

    const buttonValuesArray = Object.entries(parsedValue).map(
      ([label, value]) => ({
        label,
        value,
      })
    );

    if (item.type === "Match") {
      matchButtonValues = buttonValuesArray;
    } else if (item.type === "Session") {
      sessionButtonValues = buttonValuesArray;
    }
  });

  const buttonToShow: any =
    selectedBet?.data?.type === "session"
      ? sessionButtonValues
      : matchButtonValues;

  const [_, setStake] = useState<any>(0);
  const [__, setNewRates] = useState({
    lossAmount: 0,
    winAmount: 0,
  });
  const { success, loading, error } = useSelector(
    (state: RootState) => state.match.bet
  );
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
      setMatchOddLoading(false);
      handleClose();
    }
    if (error) {
      setMatchOddLoading(false);
    }
  }, [success, error]);

  const handleProfit = (value: any) => {
    let profit;
    if (selectedBet?.data?.type === "session") {
      profit =
        selectedBet?.team?.type === "no"
          ? value
          : (value * selectedBet?.team?.percent) / 100;
    } else if (
      selectedBet?.data?.type === "matchOdd" ||
      selectedBet?.data?.type === "tiedMatch1" ||
      selectedBet?.data?.type === "completeMatch"
    ) {
      profit =
        selectedBet?.team?.type === "back"
          ? (value * ((selectedBet?.team?.rate - 1) * 100)) / 100
          : value;
    } else {
      profit =
        selectedBet?.team?.type === "back"
          ? (value * selectedBet?.team?.rate) / 100
          : value;
    }
    return Number(+profit).toFixed(2);
  };
  const handleLoss = (value: any) => {
    let profit;
    if (selectedBet?.data?.type === "session") {
      profit =
        selectedBet?.team?.type === "yes"
          ? value
          : (value * selectedBet?.team?.percent) / 100;
    } else if (
      selectedBet?.data?.type === "matchOdd" ||
      selectedBet?.data?.type === "tiedMatch1" ||
      selectedBet?.data?.type === "completeMatch"
    ) {
      profit =
        selectedBet?.team?.type === "lay"
          ? (value * ((selectedBet?.team?.rate - 1) * 100)) / 100
          : value;
    } else {
      profit =
        selectedBet?.team?.type === "lay"
          ? (value * selectedBet?.team?.rate) / 100
          : value;
    }
    return Number(+profit).toFixed(2);
  };
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
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "60px" }}
          >
            <PlaceBetMoneyBox
              trendingUp={false}
              rate={handleProfit(stakeValue)}
              // rate={Number(newRates?.winAmount)?.toFixed(2)}
              color={"#10DC61"}
            />
            <Box sx={{ width: "5px" }}></Box>
            <PlaceBetMoneyBox
              trendingDown={false}
              rate={handleLoss(stakeValue)}
              color={"#FF4D4D"}
            />
            <Box sx={{ width: "5px", marginRight: "20px" }}></Box>
          </Box>
          <StyledImage
            onClick={handleClose}
            src={CancelDark}
            sx={{
              padding: "10px",
              height: "50px",
              width: "50px",
              cursor: "pointer",
            }}
            alt=""
          />
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
            selectedBetAction={(value: any) =>
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
              {buttonToShow?.slice(0, 4)?.map((v: any, idx: number) => (
                <NumberData
                  key={idx}
                  containerStyle={{ marginLeft: "2px", flex: 1 }}
                  value={v}
                  selectedBetAction={(value: any) =>
                    value && selectedBetAction(selectedBet?.data)
                  }
                  setStakeValue={setStakeValue}
                  setNewRatesValue={setNewRates}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
              {buttonToShow?.slice(4, 8)?.map((v: any, idx: number) => (
                <NumberData
                  key={idx}
                  containerStyle={{ marginLeft: "2px", flex: 1 }}
                  value={v}
                  selectedBetAction={(value: any) =>
                    value && selectedBetAction(selectedBet?.data)
                  }
                  setStakeValue={setStakeValue}
                  setNewRatesValue={setNewRates}
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
            disabled={loading || !stakeValue ? true : false}
            style={{
              color: "#fff",
              backgroundColor: "#262626",
              width: "150px",
              cursor: loading || !stakeValue ? "not-allowed" : "pointer",
              // width: { lg: "150px", xs: "130px" },
              height: "35px",
              borderRadius: "5px",
              border: "2px solid white",
            }}
            onClick={() => {
              if (loading) {
                return;
              } else {
                if(stakeValue > minMax?.max){
                  toast.error('Amount should be less then maximum bet amount!');
                  return false ;
                }else if(stakeValue < minMax?.min){
                  toast.error('Amount should be greater then minimum bet amount!');
                  return false ;
                }
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
                  bettingName: selectedBet?.team?.bettingName,
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
                if (
                  selectedBet?.data?.type === "matchOdd" ||
                  selectedBet?.team?.matchBetType === "matchOdd"
                ) {
                  setMatchOddLoading(true);
                  setTimeout(() => {
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
                  }, getProfile?.delayTime * 1000);
                } else {
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
                }
              }
            }}
          >
            Submit
          </button>
        </Box>
      </Box>

      {(loading || matchOddLoading) && (
        <NotificationModal
          // open={{ value: true, loading: loading }}
          // handleClose={""}
        />
      )}
    </Box>
  );
};

export default OddsPlaceBet;
