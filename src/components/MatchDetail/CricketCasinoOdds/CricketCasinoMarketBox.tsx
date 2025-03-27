import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { BallStart } from "../../../assets";
import CommissionDot from "../../Common/CommissionDot";
import PlaceBetComponent from "../MatchOdds/Bets/PlaceBetComponent";
import PlaceBetComponentWeb from "../MatchOdds/Bets/PlaceBetComponentWeb";
import SeparateModal from "../MatchOdds/SeparateModal";

const CricketCasinoMarketBox = ({
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
              lineHeight: "0.8rem",
            }}
          >
            {data?.isCommissionActive && <CommissionDot />}
            {data?.nat || `${index} Number`}
          </Typography>
        </Typography>

        {matchesMobile && (
          <PlaceBetComponent
            amount={index == 2}
            data={data}
            show={show}
            setShow={setShow}
            profitLoss={(profitLossData && profitLossData[0]) ?? {}}
            hideCount={true}
            index={index}
          />
        )}
        {!matchesMobile && (
          <PlaceBetComponentWeb
            amount={index === 2}
            data={data}
            show={show}
            setShow={setShow}
            profitLoss={(profitLossData && profitLossData[0]) ?? {}}
            hideCount={true}
            index={index}
          />
        )}
        {!["ACTIVE", "active", "", undefined, null, "", "OPEN"].includes(
          data?.gstatus
        ) || !data.odds?.length ? (
          <Box
            sx={{
              background: "rgba(0,0,0,1)",
              height: "38px",
              minWidth: "10%",
              width: { lg: "12%", md: "20%", xs: "20%" },
              justifyContent: { xs: "center", lg: "center" },
              marginLeft: "auto",
              alignItems: "center",
              display: "flex",
              marginRight: { lg: "26%", xs: "0%" },
              zIndex: 1,
            }}
          >
            {data?.gstatus == "Ball Running" ? (
              <img
                src={BallStart}
                style={{ width: "113px", height: "32px" }}
                alt=""
              />
            ) : (
              <Typography
                sx={{
                  fontSize: { xs: "12px", lg: "12px" },
                  textTransform: "uppercase",
                  textAlign: "center",
                  width: "100%",
                  color: "white",
                  fontWeight: "400",
                }}
              >
                {!data?.gstatus ? "SUSPENDED" : data?.gstatus}
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
                marginLeft: { lg: "37.9%", xs: "59.9%", sm: "59.9%" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "50%", lg: "20%" },
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {data?.odds?.map((item: any, index: number) => {
                  return (
                    <SeparateModal
                      key={index}
                      bettingOn={"session"}
                      closeModal={closeModal}
                      setFastBetLoading={setFastBetLoading}
                      po={item?.tno}
                      eventType={eventType}
                      setFastAmount={setFastAmount}
                      rates={allRates}
                      session={true}
                      sessionMain={sessionMain}
                      selectedFastAmount={selectedFastAmount}
                      betType={"back"}
                      value={item?.odds ?? 0}
                      lock={
                        [null, 0, "0"].includes(item?.odds ?? 0) ? true : false
                      }
                      color={"#B3E0FF"}//
                      type={{
                        color: "#A7DCFF",
                        type: "YN",
                      }}
                      typeOfBet={typeOfBet}
                      data={data}
                      mainData={mainData}
                      handleRateChange={handleRateChange}
                      width={"100%"}
                      mid={data?.mid}
                      teamName={data?.nat}
                    />
                  );
                })}
              </Box>
            </Box>
            {!matchesMobile && (
              <Box
                sx={{ width: "33%", display: "flex", background: "pink" }}
              ></Box>
            )}
            {!matchesMobile && (
              <PlaceBetComponentWeb
                amount={index === 2}
                data={data}
                show={show}
                setShow={setShow}
                profitLoss={(profitLossData && profitLossData[0]) ?? {}}
                hideCount={true}
                index={index}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default memo(CricketCasinoMarketBox);
