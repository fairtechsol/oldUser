
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import { memo } from "react";
import { currencyFormatter, formatNumber } from "../../../helper/index";
import { BallStart } from "../../../assets";
import SeparateModal from "../MatchOdds/SeparateModal";
import PlaceBetComponentWeb from "../MatchOdds/Bets/PlaceBetComponentWeb";
import FastTimePlaceBet from "../MatchOdds/Bets/FastTimePlaceBet";
import FastTime from "../MatchOdds/FastTime";
import PlaceBetComponent from "../MatchOdds/Bets/PlaceBetComponent";
import MoneyBox from "../MatchOdds/MoneyBox";


const QuickSessionMarketBox = ({
  index,
  typeOfBet,
  data,
  selectedFastAmount,
  mainData,
  allRates,
  sessionMain,
  setFastAmount,
  closeModal,
  setFastBetLoading,
  setShowFastTimeBox,
  handleRateChange,
  showFastTimeBox,
  upcoming,
  fastAmount,
  setSelectedItem,
  selectedItem,
  betStatus,
  suspended
}:any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
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
        {data?.betStatus === 0 && (
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
        {data?.betStatus === 1 && upcoming && (
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
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "11px", md: "10px", xs: "8px" },
              marginLeft: "7px",
              fontWeight: "600",
              textAlign: "start",
              width: '100%'
            }}
          >
            {data?.name}
          </Typography>
       <MoneyBox
      
       rates={data?.rates ? data?.rates : 0}
       />
        </Box>
        {/* {matchesMobile && (
          <PlaceBetComponent amount={index == 2} profitLoss={data} />
        )} */}
        {!matchesMobile && (
          <PlaceBetComponentWeb amount={index === 2} profitLoss={data} />
        )}
        {!["ACTIVE", "", undefined, null, ""].includes(data?.suspended) ||
        (data.yes_rate === null && data.no_rate === null) ? (
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
            {data?.suspended == "Ball Started" ? (
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
                {data?.suspended}
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
                closeModal={closeModal}
                setFastBetLoading={setFastBetLoading}
                po={2}
                setFastAmount={setFastAmount}
                rates={allRates}
                session={true}
                sessionMain={sessionMain}
                selectedFastAmount={selectedFastAmount}
                betType={"no"}
                value={data?.noRate}
                value2={data?.noPercent}
                lock={[null, 0, "0"].includes(data?.no_rate) ? true : false}
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
                closeModal={closeModal}
                setFastBetLoading={setFastBetLoading}
                po={1}
                sessionMain={sessionMain}
                rates={allRates}
                setFastAmount={setFastAmount}
                selectedFastAmount={selectedFastAmount}
                session={true}
                betType={"yes"}
                value={data?.yesRate}
                value2={data?.yesPercent}
                lock={[null, 0, "0"].includes(data?.yes_rate) ? true : false}
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
              <PlaceBetComponentWeb amount={index === 2} profitLoss={data} />
            )}
          </>
        )}
      </Box>
      {showFastTimeBox && selectedItem === data?.id && (
        <Box>
          <FastTimePlaceBet
            session={sessionMain}
            setFastAmount={setFastAmount}
            selectedFastAmount={fastAmount}
            setShowFastTimeBox={setShowFastTimeBox}
            data={data}
            typeOfBet={typeOfBet}
          />
        </Box>
      )}
    </>
  );
};

export default memo(QuickSessionMarketBox);
