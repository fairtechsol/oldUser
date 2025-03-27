import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { BallStart } from "../../../assets";
import { formatToINR } from "../../../helper";
import PlaceBetComponent from "../MatchOdds/Bets/PlaceBetComponent";
import PlaceBetComponentWeb from "../MatchOdds/Bets/PlaceBetComponentWeb";
import SeparateModal from "../MatchOdds/SeparateModal";

const FancyMarketBox = ({
  index,
  typeOfBet,
  data,
  selectedFastAmount,
  mainData,
  allRates,
  sessionMain,
  setFastAmount,
  eventType,
  closeModal,
  setFastBetLoading,
  handleRateChange,
  upcoming,
  profitLossData,
  show,
  setShow,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        background: "white",
        height: "38px",
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
      {(upcoming || data?.activeStatus === "save") && (
        <Box
          sx={{
            margin: "1px",
            width: "100%",
            height: "100%",
            position: "absolute",
            right: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 2,
          }}
        ></Box>
      )}
      <Box
        sx={{
          display: "flex",
          // background: "white",
          height: "38px",
          overflow: "hidden",
          width: { xs: "100%", lg: "100%" },
          justifyContent: "flex-start",
          alignItems: "center",
          background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
        }}
      >
        <Typography>
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "10px", md: "10px", xs: "9px" },
              marginLeft: "7px",
              fontWeight: "600",
              textAlign: "start",
              width: "100%",
              // paddingRight: "5rem",
              lineHeight: "0.8rem",
            }}
          >
            {data?.RunnerName}
          </Typography>
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "8px", md: "9px", xs: "7px" },
              marginLeft: "7px",
              fontWeight: "500",
              textAlign: "start",
            }}
          >
            max:{formatToINR(data?.max || 0)}
          </Typography>
        </Typography>

        {matchesMobile && (
          <PlaceBetComponent
            amount={index == 2}
            data={data}
            show={show}
            setShow={setShow}
            profitLoss={(profitLossData && profitLossData[0]) ?? {}}
          />
        )}
        {!matchesMobile && (
          <PlaceBetComponentWeb
            amount={index === 2}
            data={data}
            show={show}
            setShow={setShow}
            profitLoss={(profitLossData && profitLossData[0]) ?? {}}
          />
        )}
        {!["ACTIVE", "active", "", undefined, null, ""].includes(
          data?.GameStatus
        ) ||
        (data.BackSize1 === null && data.LaySize1 === null) ? (
          <Box
            sx={{
              background: "rgba(0,0,0,1)",
              height: "38px",
              minWidth: "10%",
              width: { lg: "24%", md: "40%", xs: "40%" },
              justifyContent: { xs: "center", lg: "center" },
              marginLeft: "auto",
              alignItems: "center",
              display: "flex",
              marginRight: { lg: "20%", xs: "0%" },
              zIndex: 1,
            }}
          >
            {data?.GameStatus == "Ball Running" ? (
              <img
                src={BallStart}
                style={{ width: "113px", height: "32px" }}
                alt=""
              />
            ) : (
              <Typography
                sx={{
                  fontSize: { xs: "12px", lg: "20px" },
                  textTransform: "uppercase",
                  textAlign: "center",
                  width: "100%",
                  color: "white",
                  fontWeight: "400",
                }}
              >
                {data?.GameStatus}
              </Typography>
            )}
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
                height: "38px",
                width: { lg: "60%", xs: "40%", sm: "40%" },
                justifyContent: { lg: "center", xs: "end" },
                alignItems: "center",
                minWidth: { lg: "60%", xs: "40%" },
                marginRight: "auto",
                overflow: "hidden",
                marginLeft: { lg: "38%", xs: "60%", sm: "60%" },
              }}
            >
              <SeparateModal
                bettingOn={"session"}
                closeModal={closeModal}
                setFastBetLoading={setFastBetLoading}
                po={2}
                eventType={eventType}
                setFastAmount={setFastAmount}
                rates={allRates}
                session={true}
                sessionMain={sessionMain}
                selectedFastAmount={selectedFastAmount}
                betType={"no"}
                value={data?.LayPrice1 ?? 0}
                value2={data?.LaySize1 ?? 0}
                lock={
                  [null, 0, "0"].includes(data?.LayPrice1 ?? 0) ? true : false
                }
                color={"#F6D0CB"}
                type={{ color: "#FFB5B5", type: "YN" }}
                typeOfBet={typeOfBet}
                data={data}
                mainData={mainData}
                handleRateChange={handleRateChange}
              />
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              />
              <SeparateModal
                bettingOn={"session"}
                closeModal={closeModal}
                setFastBetLoading={setFastBetLoading}
                po={1}
                eventType={eventType}
                sessionMain={sessionMain}
                rates={allRates}
                setFastAmount={setFastAmount}
                selectedFastAmount={selectedFastAmount}
                session={true}
                betType={"yes"}
                value={data?.BackPrice1 ?? 0}
                value2={data?.BackSize1 ?? 0}
                lock={
                  [null, 0, "0"].includes(data?.BackPrice1 ?? 0) ? true : false
                }
                color={"#B3E0FF"}
                type={{ color: "#A7DCFF", type: "YN" }}
                typeOfBet={typeOfBet}
                data={data}
                mainData={mainData}
                handleRateChange={handleRateChange}
              />
            </Box>
            {!matchesMobile && (
              <Box sx={{ width: "33%", display: "flex", background: "pink" }} />
            )}
            {!matchesMobile && (
              <PlaceBetComponentWeb
                amount={index === 2}
                data={data}
                show={show}
                setShow={setShow}
                profitLoss={(profitLossData && profitLossData[0]) ?? {}}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default memo(FancyMarketBox);
