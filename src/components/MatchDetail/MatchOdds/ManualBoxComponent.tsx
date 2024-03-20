import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { BallStart } from "../../../assets";
import { useEffect } from "react";
import { memo } from "react";
import MoneyBox from "./MoneyBox";
import SeparateModal from "./SeparateModal";

const ManualBoxComponent = ({
  name,
  data,
  typeOfBet,
  rate,
  allRates,
  teamImage,
  newData,
  backTeamA,
  backTeamB,
  showBox,
  livestatus,
  matchOddsData,
  ballStatus,
  isBall,
  selectedFastAmount,
  setFastAmount,
  sessionMain,
  setFastRate,
  fastRate,
  setPlaceBetData,
  placeBetData,
  setFastBetLoading,
  isTeamC,
  handleRateChange,
  marketDetails,
  color,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { status } = data ?? {};
  useEffect(() => {
    if (livestatus || status !== "ACTIVE" || showBox) {
      setPlaceBetData(null);
    }
  }, [livestatus, status, showBox]);

  const handleDecimal = (value: any, gap: any, type: any) => {
    let checkDecimal = value % 1;
    if (checkDecimal >= 0.5) {
      let getValue =
        type == "back" ? Math.round(value) - gap : Math.round(value - 1) + gap;
      let checkZeroHundred =
        type == "back"
          ? getValue < 1
            ? 0
            : Math.round(getValue)
          : getValue >= 100
          ? 100
          : Math.round(getValue);
      let returnValue;
      if (type == "back") {
        let check = value % 1;
        returnValue =
          check >= 0.5
            ? getValue < 1
              ? checkZeroHundred
              : checkZeroHundred - 1
            : checkZeroHundred;
      } else {
        returnValue = checkZeroHundred;
      }
      return returnValue;
    } else {
      let getValue = type == "back" ? value - gap : value + gap;
      let checkZeroHundred =
        type == "back"
          ? getValue < 1
            ? 0
            : Math.round(getValue)
          : getValue >= 100
          ? 100
          : Math.round(getValue);
      let returnValue;
      if (type == "back") {
        let check = value % 1;
        returnValue = check >= 0.5 ? checkZeroHundred - 1 : checkZeroHundred;
      } else {
        returnValue = checkZeroHundred;
      }
      return returnValue;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "40px",
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "white",
          position: "relative",
          height: "40px",
          width: { xs: "60%", lg: "40%" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            width: { xs: "70%", lg: "100%", md: "100%" },
            alignItems: "center",
          }}
        >
          {/* {name != "DRAW" ? (
            <></>
          ) : (
            <><img
                // src={name == "INDIA" ? INDIA : PAKISTAN}
                style={{
                  width: "22px",
                  height: "25px",
                  marginLeft: "10px",
                  backgroundSize: "contains",
                }}
                alt="draw" /><Box
                  sx={{ width: "22px", height: "25px", marginLeft: "10px" }}
                ></Box></>
          )} */}

          {teamImage != null && (
            <>
              <img
                // src={`${apiBasePath}/${teamImage}`}
                style={{
                  width: "22px",
                  height: "25px",
                  marginLeft: "10px",
                  backgroundSize: "contains",
                }}
                alt={name}
              />
              <Box
                sx={{ width: "22px", height: "25px", marginLeft: "10px" }}
              ></Box>
            </>
          )}
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "14px", xs: "10px" },
              fontWeight: "600",
              marginLeft: "10px",
              marginRight: "10px",
              width: { xs: "113px", md: "100%", lg: "100%" },
              textTransform: "capitalize",
            }}
          >
            {name}
          </Typography>
        </Box>
        <MoneyBox color={color} rates={rate} />
      </Box>
      {ballStatus ? (
        <>
          {isBall ? (
            <Box
              sx={{
                background: "#000",
                height: isTeamC ? "125px" : "82px",
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: 10,
                width: { lg: "60%", xs: "40.5%" },
                justifyContent: { xs: "center", lg: "center" },
                alignItems: "center",
                display: "flex",
              }}
            >
              <img src={BallStart} style={{ width: "108px", height: "30px" }} alt=""/>
            </Box>
          ) : null}
        </>
      ) : (
        <>
          {showBox && (
            <Box
              sx={{
                background: "rgba(0,0,0,0.5)",
                height: "40px",
                position: "absolute",
                right: 0,
                zIndex: 10,
                width: { lg: "60%", xs: "40.5%" },
                justifyContent: { xs: "flex-end", lg: "center" },
                alignItems: "center",
                display: "flex",
              }}
            ></Box>
          )}
          {livestatus ? (
            <Box
              sx={{
                background: "rgba(0,0,0,1)",
                height: "40px",
                width: { lg: "60%", xs: "40.5%" },
                justifyContent: { xs: "flex-end", lg: "center" },
                alignItems: "center",
                display: "flex",
              }}
            >
              {ballStatus ? null : (
                // <img src={BallStart} style={{ width: '113px', height: "32px" }} />
                <Typography
                  sx={{
                    fontSize: { xs: "12px", lg: "22px" },
                    textTransform: "uppercase",
                    textAlign: "center",
                    width: "100%",
                    color: "white",
                    fontWeight: "400",
                  }}
                >
                  {livestatus ? "SUSPENDED" : status}
                </Typography>
              )}
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  background: "white",
                  height: "40px",
                  width: { lg: "60%", xs: "40%" },
                  justifyContent: { xs: "flex-end", lg: "center" },
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {!matchesMobile && (
                  <SeparateModal
                    closeModal={ballStatus}
                    setFastBetLoading={setFastBetLoading}
                    placeBetData={placeBetData}
                    po={2}
                    setFastRate={setFastRate}
                    fastRate={fastRate}
                    setPlaceBetData={setPlaceBetData}
                    sessionMain={sessionMain}
                    setFastAmount={setFastAmount}
                    selectedFastAmount={selectedFastAmount}
                    back={true}
                    currentMatch={newData}
                    backTeamA={backTeamA}
                    betType={"back"}
                    lock={
                      matchOddsData?.back
                        ? handleDecimal(+matchOddsData?.back, 2, "back") > 0
                          ? false
                          : true
                        : true
                    }
                    rates={allRates}
                    value={
                      matchOddsData?.back
                        ? handleDecimal(+matchOddsData?.back, 2, "back")
                        : 0
                    }
                    value2={""}
                    color={matchesMobile ? "white" : "#CEEBFF"}
                    type={{ color: "#A7DCFF", type: "BL" }}
                    name={name}
                    data={data}
                    typeOfBet={typeOfBet}
                    handleRateChange={handleRateChange}
                    marketDetails={marketDetails}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
                {!matchesMobile && (
                  <SeparateModal
                    backTeamB={backTeamB}
                    closeModal={ballStatus}
                    setFastBetLoading={setFastBetLoading}
                    placeBetData={placeBetData}
                    po={1}
                    setPlaceBetData={setPlaceBetData}
                    setFastRate={setFastRate}
                    fastRate={fastRate}
                    sessionMain={sessionMain}
                    setFastAmount={setFastAmount}
                    selectedFastAmount={selectedFastAmount}
                    back={true}
                    betType={"back"}
                    currentMatch={newData}
                    // lock={lock}
                    lock={
                      matchOddsData?.back
                        ? handleDecimal(+matchOddsData?.back, 1, "back") > 0
                          ? false
                          : true
                        : true
                    }
                    rates={allRates}
                    // value={matchOddsData?.back ? matchOddsData?.back - 1 : 0}
                    value={
                      matchOddsData?.back
                        ? handleDecimal(+matchOddsData?.back, 1, "back")
                        : 0
                    }
                    value2={""}
                    color={matchesMobile ? "white" : "#C2E6FF"}
                    type={{ color: "#A7DCFF", type: "BL" }}
                    name={name}
                    data={data}
                    typeOfBet={typeOfBet}
                    handleRateChange={handleRateChange}
                    marketDetails={marketDetails}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>

                <SeparateModal
                  closeModal={ballStatus}
                  setFastBetLoading={setFastBetLoading}
                  placeBetData={placeBetData}
                  po={0}
                  setPlaceBetData={setPlaceBetData}
                  setFastRate={setFastRate}
                  fastRate={fastRate}
                  sessionMain={sessionMain}
                  setFastAmount={setFastAmount}
                  selectedFastAmount={selectedFastAmount}
                  back={true}
                  currentMatch={newData}
                  betType={"back"}
                  // lock={lock}
                  lock={matchOddsData?.back > 0 ? false : true}
                  rates={allRates}
                  value={matchOddsData?.back ? +matchOddsData?.back : 0}
                  value2={""}
                  color={matchesMobile ? "#B3E0FF" : "#A7DCFF"}
                  type={{ color: "#A7DCFF", type: "BL" }}
                  name={name}
                  data={data}
                  typeOfBet={typeOfBet}
                  handleRateChange={handleRateChange}
                  marketDetails={marketDetails}
                />

                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>

                <SeparateModal
                  closeModal={ballStatus}
                  setFastBetLoading={setFastBetLoading}
                  placeBetData={placeBetData}
                  po={0}
                  setPlaceBetData={setPlaceBetData}
                  setFastRate={setFastRate}
                  fastRate={fastRate}
                  sessionMain={sessionMain}
                  setFastAmount={setFastAmount}
                  selectedFastAmount={selectedFastAmount}
                  back={true}
                  currentMatch={newData}
                  betType={"lay"}
                  lock={matchOddsData?.lay > 0 ? false : true}
                  rates={allRates}
                  value={matchOddsData?.lay ? +matchOddsData?.lay : 0}
                  value2={""}
                  color={matchesMobile ? "#F6D0CB" : "#FFB5B5"}
                  type={{ color: "#FFB5B5", type: "BL" }}
                  name={name}
                  data={data}
                  typeOfBet={typeOfBet}
                  handleRateChange={handleRateChange}
                  marketDetails={marketDetails}
                />
                {!matchesMobile && (
                  <SeparateModal
                    closeModal={ballStatus}
                    setFastBetLoading={setFastBetLoading}
                    placeBetData={placeBetData}
                    po={1}
                    setPlaceBetData={setPlaceBetData}
                    setFastRate={setFastRate}
                    fastRate={fastRate}
                    sessionMain={sessionMain}
                    setFastAmount={setFastAmount}
                    selectedFastAmount={selectedFastAmount}
                    back={true}
                    currentMatch={newData}
                    rates={allRates}
                    betType={"lay"}
                    lock={
                      matchOddsData?.lay
                        ? handleDecimal(+matchOddsData?.lay, 1, "") > 0
                          ? false
                          : true
                        : true
                    }
                    value={
                      matchOddsData?.lay
                        ? handleDecimal(+matchOddsData?.lay, 1, "")
                        : 0
                    }
                    value2={""}
                    color={matchesMobile ? "white" : "#F2CBCB"}
                    type={{ color: "#FFB5B5", type: "BL" }}
                    name={name}
                    data={data}
                    typeOfBet={typeOfBet}
                    handleRateChange={handleRateChange}
                    marketDetails={marketDetails}
                  />
                )}
                {!matchesMobile && (
                  <SeparateModal
                    closeModal={ballStatus}
                    setFastBetLoading={setFastBetLoading}
                    placeBetData={placeBetData}
                    po={2}
                    setPlaceBetData={setPlaceBetData}
                    setFastRate={setFastRate}
                    fastRate={fastRate}
                    sessionMain={sessionMain}
                    setFastAmount={setFastAmount}
                    selectedFastAmount={selectedFastAmount}
                    back={true}
                    currentMatch={newData}
                    allRates={allRates}
                    betType={"lay"}
                    lock={
                      matchOddsData?.lay
                        ? handleDecimal(+matchOddsData?.lay, 2, "") > 0
                          ? false
                          : true
                        : true
                    }
                    // value={matchOddsData?.lay ? matchOddsData?.lay + 2 : 0}
                    value={
                      matchOddsData?.lay
                        ? handleDecimal(+matchOddsData?.lay, 2, "")
                        : 0
                    }
                    value2={""}
                    color={matchesMobile ? "white" : "#ECD6D6"}
                    type={{ color: "#FFB5B5", type: "BL" }}
                    name={name}
                    data={data}
                    typeOfBet={typeOfBet}
                    handleRateChange={handleRateChange}
                    marketDetails={marketDetails}
                  />
                )}
                <Box
                  sx={{ width: ".25%", display: "flex", background: "pink" }}
                ></Box>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(ManualBoxComponent);
