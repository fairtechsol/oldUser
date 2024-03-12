import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { BallStart } from "../../../assets";
import SeparateModal from "../MatchOdds/SeparateModal";
import PlaceBetComponent from "../MatchOdds/Bets/PlaceBetComponent";
import PlaceBetComponentWeb from "../MatchOdds/Bets/PlaceBetComponentWeb";

const SessionMarketBox = ({
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
          background: "white",
          height: "38px",
          width: { xs: "60%", lg: "40%" },
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        
        <Typography>
        <Typography
          sx={{
            color: "black",
            fontSize: { lg: "14px", md: "12px", xs: "11px" },
            marginLeft: "7px",
            fontWeight: "600",
            textAlign: "start",
          }}
        >
          {data?.RunnerName}
        </Typography>
        <Typography
          sx={{
            color: "black",
            fontSize: { lg: "12px", md: "11px", xs: "10px" },
            marginLeft: "7px",
            fontWeight: "600",
            textAlign: "start",
          }}
        >
          MAX:{data?.max}
        </Typography>
        </Typography>
      </Box>
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
            // marginLeft: "-2px",
            height: "38px",
            // position: "absolute",
            marginLeft: { lg: "20%", md: "0%", xs: "0%" },
            // right: 0,
            width: { lg: "19.5%", md: "40%", xs: "40.5%" },
            justifyContent: { xs: "center", lg: "center" },
            alignItems: "center",
            display: "flex",
            zIndex: 1,
          }}
        >
          {data?.GameStatus == "Ball Running" ? (
            <img src={BallStart} style={{ width: "113px", height: "32px" }} />
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
              position: "relative",
              background: "white",
              height: "38px",
              width: { lg: "60%", xs: "40.5%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {!matchesMobile && <SeparateModal po={1} color={"white"} />}

            {false && (
              <>
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeparateModal po={2} color={"white"} rates={allRates} />
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeparateModal po={3} color={"white"} rates={allRates} />
              </>
            )}
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && <SeparateModal po={6} color={"white"} />}
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
            ></Box>
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
            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <>
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeparateModal color={"white"} rates={allRates} />
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeparateModal color={"white"} rates={allRates} />
              </>
            )}
          </Box>
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
  );
};

export default memo(SessionMarketBox);
