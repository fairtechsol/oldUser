import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { BallStart } from "../../../assets";
import { formatToINR } from "../../../helper";
import { sessionBettingType } from "../../../utils/Constants";
import PlaceBetComponent from "../MatchOdds/Bets/PlaceBetComponent";
import PlaceBetComponentWeb from "../MatchOdds/Bets/PlaceBetComponentWeb";
import SeparateModal from "../MatchOdds/SeparateModal";
import Divider from "../../../helper/Divider";

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
  mid,
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
              {data?.RunnerName || data?.name}
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
          {/* <Box
              sx={{ width: "20%", display: "flex", background: "pink" }}
            ></Box> */}

          {!["ACTIVE", "active", "", undefined, null, ""].includes(
            data?.GameStatus
          ) ||
          (!data.ex?.availableToBack?.length &&
            !data.ex?.availableToLay?.length) ? (
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
                marginRight: { lg: "20.5%", xs: "0%" },
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
                  {!data?.GameStatus ? "SUSPENDED" : data?.GameStatus}
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
                  // left: {lg:"23%", xs: "0%", sm: "40%"}
                  marginLeft: { lg: "37.5%", xs: "59.6%", sm: "59.6%" },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", lg: "20%" },
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "1px",
                  }}
                >
                  <SeparateModal
                    key={index}
                    bettingOn={"session"}
                    closeModal={closeModal}
                    setFastBetLoading={setFastBetLoading}
                    po={
                      sessionBettingType.oddEven == data?.type
                        ? data.ex?.availableToBack[0]?.tno
                        : data.ex?.availableToLay[0]?.tno
                    }
                    eventType={eventType}
                    setFastAmount={setFastAmount}
                    rates={allRates}
                    session={true}
                    sessionMain={sessionMain}
                    selectedFastAmount={selectedFastAmount}
                    betType={
                      sessionBettingType.oddEven == data?.type
                        ? "back"
                        : sessionBettingType.fancy1 == data?.type
                        ? "lay"
                        : "no"
                    }
                    value={
                      sessionBettingType.oddEven == data?.type
                        ? data.ex?.availableToBack[0]?.price ?? 0
                        : data.ex?.availableToLay[0]?.price ?? 0
                    }
                    value2={
                      sessionBettingType.oddEven == data?.type
                        ? data.ex?.availableToBack[0]?.size ?? 0
                        : data.ex?.availableToLay[0]?.size ?? 0
                    }
                    lock={
                      [null, 0, "0"].includes(
                        sessionBettingType.oddEven == data?.type
                          ? data.ex?.availableToBack[0]?.price ?? 0
                          : data.ex?.availableToLay[0]?.price ?? 0
                      )
                        ? true
                        : false
                    }
                    color={
                      sessionBettingType.oddEven == data?.type
                        ? "#B3E0FF"
                        : "#F6D0CB"
                    }
                    type={{
                      color:
                        sessionBettingType.oddEven == data?.type
                          ? "#A7DCFF"
                          : "#FFB5B5",
                      type: "YN",
                    }}
                    typeOfBet={typeOfBet}
                    data={data}
                    mainData={mainData}
                    handleRateChange={handleRateChange}
                    width={"100%"}
                    mid={mid}
                    teamName={
                      sessionBettingType.oddEven == data?.type ? "odd" : null
                    }
                  />
                </Box>

                <Box
                  sx={{
                    width: { lg: ".05%", md: "0.95%", sx: "1%" },
                    display: "flex",
                    background: "pink",
                  }}
                ></Box>
                <Box
                  sx={{
                    width: { xs: "100%", lg: "20%" },
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "0px",
                  }}
                >
                  <SeparateModal
                    key={index}
                    bettingOn={"session"}
                    closeModal={closeModal}
                    setFastBetLoading={setFastBetLoading}
                    po={
                      sessionBettingType.oddEven == data?.type
                        ? data.ex?.availableToLay[0]?.tno
                        : data.ex?.availableToBack[0]?.tno
                    }
                    eventType={eventType}
                    sessionMain={sessionMain}
                    rates={allRates}
                    setFastAmount={setFastAmount}
                    selectedFastAmount={selectedFastAmount}
                    session={true}
                    betType={
                      sessionBettingType.oddEven == data?.type ||
                      sessionBettingType.fancy1 == data?.type
                        ? "back"
                        : "yes"
                    }
                    value={
                      sessionBettingType.oddEven == data?.type
                        ? data.ex?.availableToLay[0]?.price ?? 0
                        : data.ex?.availableToBack[0]?.price ?? 0
                    }
                    value2={
                      sessionBettingType.oddEven == data?.type
                        ? data.ex?.availableToLay[0]?.size ?? 0
                        : data.ex?.availableToBack[0]?.size ?? 0
                    }
                    lock={
                      [null, 0, "0"].includes(
                        sessionBettingType.oddEven == data?.type
                          ? data.ex?.availableToLay[0]?.price ?? 0
                          : data.ex?.availableToBack[0]?.price ?? 0
                      )
                        ? true
                        : false
                    }
                    color={"#B3E0FF"}
                    type={{ color: "#A7DCFF", type: "YN" }}
                    typeOfBet={typeOfBet}
                    data={data}
                    mainData={mainData}
                    handleRateChange={handleRateChange}
                    width={"100%"}
                    mid={mid}
                    teamName={
                      sessionBettingType.oddEven == data?.type ? "even" : null
                    }
                  />
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
                />
              )}
            </>
          )}
        </Box>
      </Box>
      <Divider />
      {Array.from(
        {
          length:
            Math.max(
              data?.ex?.availableToLay?.length ?? 0,
              data?.ex?.availableToBack?.length ?? 0
            ) - 1,
        },
        (_, i) => i + 1
      )?.map((item: number) => (
        <>
          <Box
            key={item}
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
              {/* <Typography>
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
            </Typography> */}

              {/* {matchesMobile && (
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
            )} */}
              {/* <Box
              sx={{ width: "20%", display: "flex", background: "pink" }}
            ></Box> */}
              {!["ACTIVE", "active", "", undefined, null, ""].includes(
                data?.GameStatus
              ) ||
              (!data.ex?.availableToBack?.length &&
                !data.ex?.availableToLay?.length) ? (
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
                    marginRight: { lg: "20.5%", xs: "0%" },
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
                      {!data?.GameStatus ? "SUSPENDED" : data?.GameStatus}
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
                      // left: {lg:"23%", xs: "0%", sm: "40%"}
                      marginLeft: { lg: "37.5%", xs: "59.8%", sm: "59.8%" },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: "100%", lg: "20%" },
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <SeparateModal
                        key={index}
                        bettingOn={"session"}
                        closeModal={closeModal}
                        setFastBetLoading={setFastBetLoading}
                        po={
                          sessionBettingType.oddEven == data?.type
                            ? data.ex?.availableToBack[item]?.tno
                            : data.ex?.availableToLay[item]?.tno
                        }
                        eventType={eventType}
                        setFastAmount={setFastAmount}
                        rates={allRates}
                        session={true}
                        sessionMain={sessionMain}
                        selectedFastAmount={selectedFastAmount}
                        betType={
                          sessionBettingType.oddEven == data?.type
                            ? "back"
                            : sessionBettingType.fancy1 == data?.type
                            ? "lay"
                            : "no"
                        }
                        value={
                          sessionBettingType.oddEven == data?.type
                            ? data.ex?.availableToBack[item]?.price ?? 0
                            : data.ex?.availableToLay[item]?.price ?? 0
                        }
                        value2={
                          sessionBettingType.oddEven == data?.type
                            ? data.ex?.availableToBack[item]?.size ?? 0
                            : data.ex?.availableToLay[item]?.size ?? 0
                        }
                        lock={
                          [null, 0, "0"].includes(
                            sessionBettingType.oddEven == data?.type
                              ? data.ex?.availableToBack[item]?.price ?? 0
                              : data.ex?.availableToLay[item]?.price ?? 0
                          )
                            ? true
                            : false
                        }
                        color={
                          sessionBettingType.oddEven == data?.type
                            ? "#B3E0FF"
                            : "#F6D0CB"
                        }
                        type={{
                          color:
                            sessionBettingType.oddEven == data?.type
                              ? "#A7DCFF"
                              : "#FFB5B5",
                          type: "YN",
                        }}
                        typeOfBet={typeOfBet}
                        data={data}
                        mainData={mainData}
                        handleRateChange={handleRateChange}
                        width={"100%"}
                        mid={mid}
                        teamName={
                          sessionBettingType.oddEven == data?.type
                            ? "odd"
                            : null
                        }
                      />
                    </Box>

                    <Box
                      sx={{
                        width: ".45%",
                        display: "flex",
                        background: "pink",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        width: { xs: "100%", lg: "20%" },
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <SeparateModal
                        key={index}
                        bettingOn={"session"}
                        closeModal={closeModal}
                        setFastBetLoading={setFastBetLoading}
                        po={
                          sessionBettingType.oddEven == data?.type
                            ? data.ex?.availableToLay[item]?.tno
                            : data.ex?.availableToBack[item]?.tno
                        }
                        eventType={eventType}
                        sessionMain={sessionMain}
                        rates={allRates}
                        setFastAmount={setFastAmount}
                        selectedFastAmount={selectedFastAmount}
                        session={true}
                        betType={
                          sessionBettingType.oddEven == data?.type ||
                          sessionBettingType.fancy1 == data?.type
                            ? "back"
                            : "yes"
                        }
                        value={
                          sessionBettingType.oddEven == data?.type
                            ? data.ex?.availableToLay[item]?.price ?? 0
                            : data.ex?.availableToBack[item]?.price ?? 0
                        }
                        value2={
                          sessionBettingType.oddEven == data?.type
                            ? data.ex?.availableToBack[item]?.size ?? 0
                            : data.ex?.availableToLay[item]?.size ?? 0
                        }
                        lock={
                          [null, 0, "0"].includes(
                            sessionBettingType.oddEven == data?.type
                              ? data.ex?.availableToBack[item]?.price ?? 0
                              : data.ex?.availableToLay[item]?.price ?? 0
                          )
                            ? true
                            : false
                        }
                        color={"#B3E0FF"}
                        type={{ color: "#A7DCFF", type: "YN" }}
                        typeOfBet={typeOfBet}
                        data={data}
                        mainData={mainData}
                        handleRateChange={handleRateChange}
                        width={"100%"}
                        mid={mid}
                        teamName={
                          sessionBettingType.oddEven == data?.type
                            ? "even"
                            : null
                        }
                      />
                    </Box>
                  </Box>
                  {!matchesMobile && (
                    <Box
                      sx={{ width: "33%", display: "flex", background: "pink" }}
                    ></Box>
                  )}
                  {/* {!matchesMobile && (
                  <PlaceBetComponentWeb
                    amount={index === 2}
                    data={data}
                    show={show}
                    setShow={setShow}
                    profitLoss={(profitLossData && profitLossData[0]) ?? {}}
                  />
                )} */}
                </>
              )}
            </Box>
          </Box>
          <Divider />
        </>
      ))}
    </>
  );
};

export default memo(SessionMarketBox);
