import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { BallStart } from "../../../assets";
import SeparateModal from "../MatchOdds/SeparateModal";
import PlaceBetComponentWeb from "../MatchOdds/Bets/PlaceBetComponentWeb";
import FastTimePlaceBet from "../MatchOdds/Bets/FastTimePlaceBet";
import PlaceBetComponent from "../MatchOdds/Bets/PlaceBetComponent";
import { formatToINR } from "../../../helper";

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
  selectedItem,
  eventType,
  profitLossData,
  show,
  setShow,
}: any) => {
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
        {upcoming && (
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
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
            height: "38px",
            width: { xs: "100%", lg: "100%" },
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          {/* <Typography
            sx={{
              color: "black",
              fontSize: { lg: "11px", md: "10px", xs: "8px" },
              marginLeft: "7px",
              fontWeight: "600",
              textAlign: "start",
              width: "100%",
            }}
          >
            {data?.name}
          </Typography> */}
          <Typography>
            <Typography
              sx={{
                color: "black",
                fontSize: { lg: "11px", md: "10px", xs: "10px" },
                marginLeft: "7px",
                fontWeight: "600",
                textAlign: "start",
                width: "100%",
                lineHeight: "0.9"
              }}
            >
              {data?.name}
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontSize: { lg: "11px", md: "8px", xs: "8px" },
                marginLeft: "7px",
                fontWeight: "500",
                textAlign: "start",
                width: "100%",
              }}
            >
              max:{formatToINR(data?.maxBet)}
            </Typography>
          </Typography>
          {/* <MoneyBox
            rates={maxLoss ?? 0}
            color={(maxLoss || 0) > 0 ? "#319E5B" : "#FF4D4D"}
          /> */}
 
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
           {/* <Box
              sx={{ width: "20%", display: "flex", background: "pink" }}
            ></Box> */}
        {!["active", "", undefined, null, ""].includes(data?.status) ||
        (data.yesRate === null && data.noRate === null) ? (
          <Box
            sx={{
              background: "rgba(0,0,0,1)",
              // marginLeft: "-2px",
              height: "38px",
              // position: "absolute",
              minWidth: "10%",
              marginRight: {lg:"20%", xs: "0"}, 
              marginLeft: "auto",
              width: { lg: "24%", md: "40%", xs: "40%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
              zIndex: 1,
            }}
          >
            {data?.status == "ball start" ? (
              <img src={BallStart} style={{ width: "113px", height: "32px" }} alt=""/>
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
                {data?.status}
              </Typography>
            )}
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                overflow: "hidden",
                background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
                height: "38px",
                width: { lg: "60%", xs: "40%", sm: "40%" },
                justifyContent: "flex-end",
                alignItems: "center",
                marginRight: "auto",
                minWidth: {lg:"60%", xs: "40%"},
                marginLeft: {lg:"40%", xs: "60%", sm: "60%"}
              }}
            >
              {/* {!matchesMobile && <SeparateModal po={1} color={"white"} />} */}

              {/* {false && (
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
              )} */}
              {/* <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box> */}
              {/* {!matchesMobile && <SeparateModal po={6} color={"white"} />} */}
              <SeparateModal
                bettingOn={"session"}
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
                lock={[null, 0, "0"].includes(data?.noRate) ? true : false}
                color={"#F6D0CB"}
                type={{ color: "#FFB5B5", type: "YN" }}
                typeOfBet={typeOfBet}
                data={data}
                mainData={mainData}
                handleRateChange={handleRateChange}
                eventType={eventType}
              />
              <Box
                sx={{ width: ".45%", display: "flex", background: "pink" }}
              ></Box>
              <SeparateModal
                bettingOn={"session"}
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
                lock={[null, 0, "0"].includes(data?.yesRate) ? true : false}
                color={"#B3E0FF"}
                type={{ color: "#A7DCFF", type: "YN" }}
                typeOfBet={typeOfBet}
                data={data}
                mainData={mainData}
                eventType={eventType}
                handleRateChange={handleRateChange}
              />
             {!matchesMobile && <Box
                sx={{ width: "32%", display: "flex", background: "pink" }}
              ></Box>}
              {/* {!matchesMobile && (
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
              )} */}
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
             </Box>
    </>
  );
};

export default memo(QuickSessionMarketBox);
