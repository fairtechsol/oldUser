import { Box, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import OddsPlaceBet from "./Bets/OddsPlacebet";
import FastTimePlaceBet from "./Bets/FastTimePlaceBet";
import BoxComponent from "./BoxComponent";
import Divider from "../../../helper/Divider";
import ManualBoxComponent from "./ManualBoxComponent";
import { ARROWUP, LockIcon, TIME } from "../../../assets";
import { currencyFormatter } from "../../../helper";
import FastTime from "./FastTime";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const SmallBox = ({ valueA, valueB }: any) => {
  return (
    <Box
      sx={{
        marginLeft: { xs: 0, lg: "-14px", md: 0 },
        justifyContent: {
          xs: "center",
          lg: "center",
          md: "center",
        },
        display: "flex",
        width: { xs: "85%", lg: "80%", md: "85%" },
        gap: "4px",
      }}
    >
      <Box
        sx={{
          width: { lg: "70px", xs: "45px", md: "70px" },
          // position: "absolute",
          flexDirection: "column",
          paddingX: "5px",
          display: "flex",
          left: { xs: "53%", lg: "49vw", md: "53%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{
            color: "#FF4D4D",
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          Book
        </Typography>
        <Typography
          sx={{
            fontSize: { lg: "12px", xs: "10px", md: "10px" },
            fontWeight: "bold",
            color: valueA < 0 ? `#FF4D4D` : `#319E5B`,
          }}
        >
          {valueA < 0 ? ` ${valueA}` : `${valueA}`}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "70px", xs: "45px", md: "70px" },
          // position: "absolute",
          paddingX: "5px",
          display: "flex",
          flexDirection: "column",
          left: { xs: "65%", lg: "55vw", md: "65%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{
            color: "#FF4D4D",
            fontSize: "8px",
            fontWeight: "bold",
          }}
        >
          Book
        </Typography>

        <Typography
          sx={{
            fontSize: { lg: "12px", xs: "10px", md: "10px" },
            fontWeight: "bold",
            color: valueB < 0 ? `#FF4D4D` : `#319E5B`,
          }}
        >
          {valueB < 0 ? ` ${valueB}` : `${valueB}`}
        </Typography>
      </Box>
    </Box>
  );
};

const Time = (data: any) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{
          fontSize: { xs: "8px", lg: "12px" },
          fontWeight: "bold",
          color: "#black",
          width: { xs: "50px", lg: "80px" },
        }}
      >
        {data.time} sec Delay
      </Typography>
      <img style={{ width: "20px", height: "20px" }} src={TIME} />
    </Box>
  );
};

const MarketOdds = ({
  data,
  teamARates,
  teamBRates,
  teamCRates,
  title,
  min,
  showDely,
  max,
  showBox,
  newData,
  isRound,
  typeOfBet,
  session,
  matchOddsData,
  setFastAmount,
  fastAmount,
  betLock,
  showFast,
  upcoming,
  handleRateChange,
  marketDetails,
}: any) => {
  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const [showFastTimeBox, setShowFastTimeBox] = useState(false);
  const [placeBetData, setPlaceBetData] = useState<any>(null);
  const [fastRate, setFastRate] = useState(null);
  // const [canceled, setCanceled] = useState({
  //   value: false,
  //   msg: "",
  //   type: false,
  // });
  // console.log(matchOddsData);
  useEffect(() => {
    if (betLock) {
      setPlaceBetData(null);
    }
  }, [betLock]);
  const bookRatioB = (() => {
    if (teamARates === 0) {
      return 0;
    } else {
      const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
    }
  })();

  const bookRatioA = (() => {
    if (teamARates === 0) {
      return 0;
    } else {
      const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
      const formattedRatio = Math.abs(bookRatio).toFixed(2);
      return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
    }
  })();

  const [visible, setVisible] = useState(true);

  return (
    <>
      <Box
        key="odds"
        sx={{
          position: "relative",
          display: "flex",
          backgroundColor: "white",
          padding: { xs: "1px", lg: ".1vh" },
          flexDirection: "column",
          marginY: { xs: "2px", lg: ".5vh" },
          marginTop: { xs: "0" },
          width: { xs: "98%", lg: "97%" },
          marginX: "1vw",
          alignSelf: {
            xs: "center",
            md: "center",
            lg: "flex-start",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "99.7%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                width: "100%",
                fontSize: { lg: "13px", md: "12px", xs: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {title}
            </Typography>
            {showDely && typeOfBet === "MATCH ODDS" && (
              <Time time={(getProfile && getProfile?.delayTime) ?? 0} />
            )}
            {showFast && (
              <FastTime
                session={session}
                setPlaceBetData={setPlaceBetData}
                setFastAmount={setFastAmount}
                setShowFastTimeBox={setShowFastTimeBox}
                typeOfBet={typeOfBet}
                data={fastAmount ? currencyFormatter(fastAmount) : ""}
                matchOddsData={matchOddsData}
              />
            )}
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
              // '#262626'
            }}
          >
            <div className="slanted"></div>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "#262626",
              // '#262626' ,
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "flex-end",
                lg: "center",
                md: "flex-end",
              },
            }}
          >
            <SmallBox valueA={bookRatioA} valueB={bookRatioB} />
            <Box
              className="arrowUpCollapse"
              sx={{
                flex: 1,
                background: { lg: "#262626", xs: "none" },
                position: { lg: "static", xs: "absolute" },
                // '#262626' ,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <img
                onClick={() => {
                  setVisible(!visible);
                }}
                src={ARROWUP}
                style={{
                  transform: !visible ? "rotate(180deg)" : "rotate(0deg)",
                  width: "16px",
                  height: "16px",
                  marginRight: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                alt={"Banner"}
              />
            </Box>
          </Box>
        </Box>
        {visible && (
          <Box
            sx={{ color: "black", position: "relative", overflow: "hidden" }}
          >
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: { lg: "100%", xs: "99.9%" },
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "'#319E5B'",
                  height: "25px",
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { lg: "11px", xs: "9px" },
                    marginLeft: "7px",
                  }}
                >
                  MIN: {min} MAX:{max}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
                  gap: { xs: "0px", lg: "1px", md: "1px" },
                  width: { lg: "60%", xs: "80%" },
                  justifyContent: { lg: "center", xs: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { lg: "16.5%", xs: "30%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderLeft: {
                      lg: "3px solid #319e5b",
                      xs: "1px solid #319e5b",
                    },
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Back
                  </Typography>
                </Box>
                <Box sx={{ width: ".35%", display: "flex" }}></Box>
                <Box
                  sx={{
                    background: "#FF9292",
                    width: { lg: "16.4%", xs: "29.9%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                  >
                    Lay
                  </Typography>
                </Box>
              </Box>
            </Box>
            {betLock && (
              <Box
                sx={{
                  position: "absolute",
                  height: "65%",
                  top: "35%",
                  width: "100%",
                  display: "flex",
                  zIndex: "999",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, .6)",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "60%", lg: "40%", md: "60%" },
                  }}
                ></Box>
                <Box
                  sx={{
                    width: { xs: "40%", lg: "60%", md: "40%" },
                    gap: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ width: "35px", height: "40px" }}
                    src={LockIcon}
                  />
                  <Typography
                    sx={{
                      fontWeight: "600",
                      margin: "20px 0px 0px -25px",
                      fontSize: "20px",
                      color: "#FFF",
                    }}
                  >
                    Locked
                  </Typography>
                </Box>
              </Box>
            )}

            {(upcoming || showBox) && (
              <Box
                sx={{
                  position: "absolute",
                  height: "83%",
                  // top: "18%",
                  width: "100%",
                  display: "flex",
                  zIndex: "999",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, .5)",
                }}
              ></Box>
            )}
            {session === "manualBookMaker" ? (
              <>
                <ManualBoxComponent
                  setFastBetLoading={() => {}}
                  placeBetData={placeBetData}
                  setFastRate={(val: any) => setFastRate(val)}
                  fastRate={fastRate}
                  setPlaceBetData={setPlaceBetData}
                  setFastAmount={setFastAmount}
                  time={true}
                  sessionMain={session}
                  fromOdds={true}
                  showBox={showBox}
                  selectedFastAmount={fastAmount}
                  livestatus={
                    matchOddsData?.statusTeamA === "suspended" ? true : false
                  }
                  ballStatus={
                    matchOddsData?.statusTeamA === "ball" ||
                    matchOddsData?.statusTeamA == "ball start"
                      ? true
                      : false
                  }
                  teamImage={newData?.teamA_Image}
                  newData={newData}
                  color={teamARates <= 0 ? "#FF4D4D" : "#319E5B"}
                  allRates={{
                    teamA: teamARates,
                    teamB: teamBRates,
                    teamC: teamCRates,
                  }}
                  rate={teamARates}
                  name={
                    ["tied_manual"].includes(title) ? "YES" : newData?.teamA
                  }
                  data={data}
                  team={"teamA"}
                  typeOfBet={typeOfBet}
                  isRound={isRound}
                  matchOddsData={{
                    back: matchOddsData?.backTeamA,
                    lay: matchOddsData?.layTeamA,
                  }}
                  isBall={true}
                  isTeamC={newData?.teamC}
                  handleRateChange={handleRateChange}
                  marketDetails={marketDetails}
                />
                <Divider />
                <ManualBoxComponent
                  setFastBetLoading={() => {}}
                  placeBetData={placeBetData}
                  setFastRate={(val: any) => setFastRate(val)}
                  fastRate={fastRate}
                  setPlaceBetData={setPlaceBetData}
                  sessionMain={session}
                  setFastAmount={setFastAmount}
                  teamImage={newData?.teamB_Image}
                  time={true}
                  fromOdds={true}
                  showBox={showBox}
                  newData={newData}
                  selectedFastAmount={fastAmount}
                  // livestatus={newData?.status === "SUSPENDED" ? true : false}
                  livestatus={
                    matchOddsData?.statusTeamB === "suspended" ? true : false
                  }
                  ballStatus={
                    matchOddsData?.statusTeamB === "ball" ||
                    matchOddsData?.statusTeamB == "ball start"
                      ? true
                      : false
                  }
                  color={teamBRates <= 0 ? "#FF4D4D" : "#319E5B"}
                  name={["tied_manual"].includes(title) ? "NO" : newData?.teamB}
                  data={data}
                  rate={teamBRates}
                  allRates={{
                    teamA: teamARates,
                    teamB: teamBRates,
                    teamC: teamCRates,
                  }}
                  team={"teamB"}
                  typeOfBet={typeOfBet}
                  isRound={isRound}
                  matchOddsData={{
                    back: matchOddsData?.backTeamB,
                    lay: matchOddsData?.layTeamB,
                  }}
                  isBall={false}
                  isTeamC={newData?.teamC}
                  handleRateChange={handleRateChange}
                  marketDetails={marketDetails}
                />
                {newData?.teamC && !["tied_manual"].includes(title) && (
                  <>
                    <Divider />
                    <ManualBoxComponent
                      setFastBetLoading={() => {}}
                      placeBetData={placeBetData}
                      setFastRate={(val: any) => setFastRate(val)}
                      fastRate={fastRate}
                      setPlaceBetData={setPlaceBetData}
                      sessionMain={session}
                      setFastAmount={setFastAmount}
                      teamImage={null}
                      selectedFastAmount={fastAmount}
                      fromOdds={true}
                      time={true}
                      livestatus={
                        matchOddsData?.statusTeamC === "suspended"
                          ? true
                          : false
                      }
                      ballStatus={
                        matchOddsData?.statusTeamC === "ball" ||
                        matchOddsData?.statusTeamC == "ball start"
                          ? true
                          : false
                      }
                      showBox={showBox}
                      newData={newData}
                      // color={"#FF4D4D"}
                      color={teamCRates <= 0 ? "#FF4D4D" : "#46e080"}
                      name={newData?.teamC}
                      data={data?.length > 0 ? data[2] : []}
                      rate={teamCRates}
                      allRates={{
                        teamA: teamARates,
                        teamB: teamBRates,
                        teamC: teamCRates,
                      }}
                      team={"teamC"}
                      typeOfBet={typeOfBet}
                      isRound={isRound}
                      matchOddsData={{
                        back: matchOddsData?.backTeamC,
                        lay: matchOddsData?.layTeamC,
                      }}
                      isBall={false}
                      isTeamC={newData?.teamC}
                      handleRateChange={handleRateChange}
                      marketDetails={marketDetails}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <BoxComponent
                  setFastBetLoading={() => {}}
                  placeBetData={placeBetData}
                  setFastRate={(val: any) => setFastRate(val)}
                  fastRate={fastRate}
                  setPlaceBetData={setPlaceBetData}
                  sessionMain={session}
                  setFastAmount={setFastAmount}
                  time={true}
                  fromOdds={true}
                  selectedFastAmount={fastAmount}
                  showBox={showBox}
                  livestatus={newData?.status === "suspended" ? true : false}
                  //   teamImage={newData?.teamA_Image}
                  newData={newData}
                  // lock={data?.length > 0 ? false : true}
                  color={teamARates <= 0 ? "#FF4D4D" : "#319E5B"}
                  allRates={{
                    teamA: teamARates,
                    teamB: teamBRates,
                    teamC: teamCRates,
                  }}
                  rate={teamARates}
                  name={
                    ["tied_match", "complete_match"].includes(title)
                      ? "YES"
                      : newData?.teamA
                  }
                  data={data?.length > 0 ? data[0] : []}
                  team={"teamA"}
                  typeOfBet={typeOfBet}
                  isRound={isRound}
                  handleRateChange={handleRateChange}
                  marketDetails={marketDetails}
                />
                <Divider />
                <BoxComponent
                  setFastBetLoading={() => {}}
                  placeBetData={placeBetData}
                  setFastRate={(val: any) => {
                    setFastRate(val);
                  }}
                  fastRate={fastRate}
                  setPlaceBetData={setPlaceBetData}
                  sessionMain={session}
                  setFastAmount={setFastAmount}
                  teamImage={newData?.teamB_Image}
                  time={true}
                  showBox={showBox}
                  fromOdds={true}
                  selectedFastAmount={fastAmount}
                  newData={newData}
                  livestatus={newData?.status === "SUSPENDED" ? true : false}
                  // lock={data?.length > 0 ? false : true}
                  color={teamBRates <= 0 ? "#FF4D4D" : "#319E5B"}
                  name={
                    ["tied_match", "complete_match"].includes(title)
                      ? "NO"
                      : newData?.teamB
                  }
                  data={data?.length > 0 ? data[1] : []}
                  rate={teamBRates}
                  allRates={{
                    teamA: teamARates,
                    teamB: teamBRates,
                    teamC: teamCRates,
                  }}
                  team={"teamB"}
                  typeOfBet={typeOfBet}
                  isRound={isRound}
                  handleRateChange={handleRateChange}
                  marketDetails={marketDetails}
                />
                {newData?.teamC &&
                  !["tied_match", "complete_match"].includes(title) && (
                    <>
                      <Divider />
                      <BoxComponent
                        setFastBetLoading={() => {}}
                        placeBetData={placeBetData}
                        setFastRate={(val: any) => setFastRate(val)}
                        fastRate={fastRate}
                        setPlaceBetData={setPlaceBetData}
                        sessionMain={session}
                        setFastAmount={setFastAmount}
                        fromOdds={true}
                        teamImage={null}
                        selectedFastAmount={fastAmount}
                        time={true}
                        livestatus={
                          newData?.status === "SUSPENDED" ? true : false
                        }
                        showBox={showBox}
                        newData={newData}
                        // lock={data?.length > 0 ? false : true}
                        color={teamCRates <= 0 ? "#FF4D4D" : "#319E5B"}
                        name={newData?.teamC}
                        data={data?.length > 0 ? data[2] : []}
                        rate={teamCRates}
                        allRates={{
                          teamA: teamARates,
                          teamB: teamBRates,
                          teamC: teamCRates,
                        }}
                        team={"teamC"}
                        typeOfBet={typeOfBet}
                        isRound={isRound}
                        handleRateChange={handleRateChange}
                        marketDetails={marketDetails}
                      />
                    </>
                  )}
              </>
            )}
          </Box>
        )}
        {visible && showFastTimeBox && !upcoming && (
          <Box>
            <FastTimePlaceBet
              typeOfBet={typeOfBet}
              session={session}
              setFastAmount={setFastAmount}
              selectedFastAmount={fastAmount}
              setShowFastTimeBox={setShowFastTimeBox}
              matchOddsData={matchOddsData}
            />
          </Box>
        )}
      </Box>

      {placeBetData && (
        <Box
          sx={{
            width: "100%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: 0, lg: "40%", md: 0 },
            }}
          ></Box>
          <Box sx={{ width: { xs: "98%", lg: "58%", md: "98%" } }}>
            <OddsPlaceBet
              // setCanceled={setCanceled}
              setPlaceBetData={setPlaceBetData}
              placeBetData={placeBetData}
              handleClose={() => setPlaceBetData(null)}
              name={placeBetData?.name}
              setFastRate={setFastRate}
              fastRate={fastRate}
              rates={placeBetData?.rates}
              season={session}
              back={placeBetData?.back}
              currentMatch={placeBetData?.currentMatch}
              isBack={placeBetData?.isBack}
              selectedValue={placeBetData?.selectedValue}
              type={placeBetData?.type}
              typeOfBet={typeOfBet}
              handleRateChange={handleRateChange}
            />
          </Box>
          {/* {canceled.value && (
            <NotificationModal
              open={canceled}
              handleClose={() =>
                setCanceled({ value: false, msg: "", type: false })
              }
            />
          )} */}
        </Box>
      )}

      <style>
        {`
          @media only screen and (max-width: 600px) {
            body .arrowUpCollapse img {
              width: 14px !important;
              height: 14px !important;
              margin-right: 3px !important;
            }
          }
        `}
      </style>
    </>
  );
};
export default memo(MarketOdds);
