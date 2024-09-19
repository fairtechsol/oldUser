import { Typography, useMediaQuery, useTheme } from "@mui/material";
import MUIModal from "@mui/material/Modal";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelDark, NOT } from "../../../../assets";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { ApiConstants, sessionBettingType } from "../../../../utils/Constants";
import NotificationModal from "../../../Common/NotificationModal";
import StyledImage from "../../../Common/StyledImages";
import BoxInput from "../../Common/BoxInput";
import PlaceBetMoneyBox from "../PlaceBetMoneyBox";
import NumberData from "./NumberDataOdds";
import TeamsOdssData from "./TeamOddsData";

// const types=["matchOdd","tiedMatch1","completeMatch"]

const OddsPlaceBet = ({ handleClose, season, type }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const [stakeValue, setStakeValue] = useState<any>(" ");
  const [matchOddLoading, setMatchOddLoading] = useState<any>(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [_, setStake] = useState<any>(0);
  const [__, setNewRates] = useState({
    lossAmount: 0,
    winAmount: 0,
  });

  const { buttonValues, profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const { selectedBet, minMax } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { success, loading, error } = useSelector(
    (state: RootState) => state.match.bet
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

  const buttonToShow: any = Object.values(sessionBettingType)?.includes(
    selectedBet?.data?.type
  )
    ? sessionButtonValues
    : matchButtonValues;

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
        const { data } = await axios.get("https://api.ipify.org?format=json");
        if (data) {
          setIpAddress(data?.ip);
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
    if (Object.values(sessionBettingType)?.includes(selectedBet?.data?.type)) {
      profit =
        selectedBet?.team?.type === "no" || selectedBet?.team?.type === "lay"
          ? value
          : [
              sessionBettingType.cricketCasino,
              sessionBettingType.fancy1,
              sessionBettingType.oddEven,
            ].includes(selectedBet?.data?.type)
          ? value * (parseFloat(selectedBet?.team?.percent) - 1)
          : (value * selectedBet?.team?.percent) / 100;
    } else if (
      ["matchOdd", "tiedMatch1", "completeMatch"].includes(
        selectedBet?.data?.type
      ) ||
      ["matchOdd", "tiedMatch1", "completeMatch"].includes(
        selectedBet?.team?.matchBetType
      )
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
    if (Object.values(sessionBettingType)?.includes(selectedBet?.data?.type)) {
      profit =
        selectedBet?.team?.type === "yes" || selectedBet?.team?.type === "back"
          ? value
          : [
              sessionBettingType.cricketCasino,
              sessionBettingType.fancy1,
              sessionBettingType.oddEven,
            ].includes(selectedBet?.data?.type)
          ? value * (parseFloat(selectedBet?.team?.percent) - 1)
          : (value * selectedBet?.team?.percent) / 100;
    } else if (
      ["matchOdd", "tiedMatch1", "completeMatch"].includes(
        selectedBet?.data?.type
      ) ||
      ["matchOdd", "tiedMatch1", "completeMatch"].includes(
        selectedBet?.team?.matchBetType
      )
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
  const handleModal = () => {
    setOpenModal1(true);
    setTimeout(() => {
      setOpenModal1(false);
      setErrorText("");
    }, 1500);
  };

  const handlePlaceBet = () => {
    if (loading) return;

    if (stakeValue > minMax?.max) {
      setErrorText("Amount should be less than the maximum bet amount!");
      handleModal();
      return false;
    }

    if (stakeValue < minMax?.min) {
      setErrorText("Amount should be greater than the minimum bet amount!");
      handleModal();
      return false;
    }
    const commonPayload = {
      betId: selectedBet?.team?.betId,
      eventName: selectedBet?.team?.name,
      eventType: selectedBet?.team?.eventType,
      matchId: selectedBet?.team?.matchId,
      browserDetail: browserInfo?.userAgent,
      ipAddress:
        ipAddress === "Not found" || !ipAddress ? "192.168.1.100" : ipAddress,
      stake: stakeValue || selectedBet?.team?.stake,
    };

    let payloadForSession: any;

    if (selectedBet?.team?.matchBetType === "tournament") {
      payloadForSession = {
        betId: selectedBet?.team?.betId,
        bettingType: selectedBet?.team?.type.toUpperCase(),
        browserDetail: browserInfo?.userAgent,
        matchId: selectedBet?.team?.matchId,
        ipAddress:
          ipAddress === "Not found" || !ipAddress ? "192.168.1.100" : ipAddress,
        odd: selectedBet?.team?.rate,
        stake: stakeValue || selectedBet?.team?.stake,
        matchBetType: selectedBet?.team?.matchBetType,
        betOnTeam: selectedBet?.team?.name,
        placeIndex: selectedBet?.team?.betPlaceIndex,
        bettingName: selectedBet?.team?.bettingName,
        gType: selectedBet?.team?.eventType,
        mid: selectedBet?.team?.mid?.toString(),
        selectionId: selectedBet?.team?.selectionId?.toString(),
        runnerId: selectedBet?.team?.runnerId,
      };
    } else {
      payloadForSession = {
        ...commonPayload,
        betType: selectedBet?.team?.type.toUpperCase(),
        odds: selectedBet?.team?.rate,
        ratePercent: selectedBet?.team?.percent,
        betPlaceIndex: selectedBet?.team?.betPlaceIndex,
        mid: selectedBet?.team?.mid?.toString(),
        ...(selectedBet?.team?.teamName
          ? { teamName: selectedBet?.team?.teamName }
          : {}),
      };
    }
    const payloadForBettings = {
      ...commonPayload,
      teamA: selectedBet?.team?.teamA,
      teamB: selectedBet?.team?.teamB,
      teamC: selectedBet?.team?.teamC,
      bettingName: selectedBet?.team?.bettingName,
      bettingType: selectedBet?.team?.type.toUpperCase(),
      odd: selectedBet?.team?.rate,
      matchBetType: selectedBet?.team?.matchBetType,
      betOnTeam: selectedBet?.team?.betOnTeam,
      placeIndex: selectedBet?.team?.placeIndex,
      mid: selectedBet?.data?.mid?.toString(),
      selectionId: selectedBet?.team?.selectionId?.toString(),
    };

    const isSessionBet =
      Object.values(sessionBettingType)?.includes(selectedBet?.data?.type) ||
      selectedBet?.data?.SelectionId;
    const url = isSessionBet
      ? selectedBet?.team?.matchBetType === "tournament"
        ? ApiConstants.BET.PLACEBETTOURNAMENT
        : ApiConstants.BET.PLACEBETSESSION
      : ApiConstants.BET.PLACEBETMATCHBETTING;
    const data = JSON.stringify(
      isSessionBet ? payloadForSession : payloadForBettings
    );

    if (
      selectedBet?.team?.matchBetType === "matchOdd" ||
      selectedBet?.data?.type === "matchOdd"
    ) {
      setMatchOddLoading(true);
      setTimeout(
        () => dispatch(placeBet({ url, data })),
        profileDetail?.delayTime * 1000
      );
    } else {
      dispatch(placeBet({ url, data }));
    }
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
            onClick={() => handlePlaceBet()}
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
      <MUIModal
        open={openModal1}
        // onClose={() => {
        //   setIsPopoverOpen(false);
        // }}
      >
        <Box
          sx={{
            width: "100%",
            height: "300px",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            top: "33%",
            overflow: "hidden",
            justifyContent: "center",
            outline: "none",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              width: "200px",
              // flex: 1,
              height: "160px",
              alignItems: "center",
              flexDirection: "column",
              // marginTop: "70px",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <img src={NOT} width={"50"} height={"50px"} />
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "500",
                color: "#000",
                textAlign: "center",
                margin: "10px",
              }}
            >
              {errorText}
            </Typography>
          </Box>
        </Box>
      </MUIModal>
    </Box>
  );
};

export default OddsPlaceBet;
