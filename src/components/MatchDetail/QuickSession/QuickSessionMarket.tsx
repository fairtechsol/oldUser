import { Box, Typography } from "@mui/material";
import { ARROWUP } from "../../../assets";
import SmallBoxSeason from "../QuickSession/SmallBoxSeason";
import { memo } from "react";
import { useState } from "react";
import { LockIcon } from "../../../assets";
import Divider from "../../../helper/Divider";
import QuickSessionMarketBox from "./QuickSessionMarketBox";

const QuickSessionMarket = ({
  newData,
  backTeamA,
  backTeamB,
  backTeamC,
  allBetsData,
  sessionExposer,
  sessionBets,
  setFastAmount,
  fastAmount,
  session,
  betLock,
  upcoming,
  handleRateChange,
  title,
  maxBet,
  minBet,
  typeOfBet,
  eventType,
}: any) => {
  const [showFastTimeBox, setShowFastTimeBox] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");

  const [visible, setVisible] = useState(true);

  return (
    <>
      <Box
        id={"test"}
        sx={{
          display: "flex",
          position: "relative",
          background: "white",
          padding: "1px",
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
            width: "99.9%",
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
                fontSize: { lg: "13px", md: "10px", xs: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {title}
            </Typography>
            {/* {showFast && (
              <FastTime
                session={session}
                setFastAmount={setFastAmount}
                setShowFastTimeBox={setShowFastTimeBox}
                data={fastAmount ? currencyFormatter(fastAmount) : ""}
              />
            )} */}
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
            {/* {console.warn("newData11 ",newData)} */}
            <SmallBoxSeason
              allBetsData={allBetsData}
              sessionBets={sessionBets}
              totalAmount={sessionExposer}
            />
            <Box
              className="arrowUpCollaps"
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
                  transform: visible ? "rotate(180deg)" : "rotate(0deg)",
                  width: "15px",
                  height: "15px",
                  marginRight: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>
        </Box>

        {visible && (
          <Box sx={{ width: "100%", position: "relative" }}>
            {
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
                    MIN:{minBet} MAX:
                    {maxBet}
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
                      background: "#FF9292",
                      width: { lg: "16%", xs: "30%" },
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                      borderLeft: {
                        lg: "0 solid #319e5b",
                        xs: "1px solid #319e5b",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      NO
                    </Typography>
                  </Box>
                  <Box sx={{ width: ".35%", display: "flex" }}></Box>
                  <Box
                    sx={{
                      background: "#00C0F9",
                      width: { lg: "16.5%", xs: "29.9%" },
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: {
                        lg: " 4px solid #319e5b;",
                        xs: "0 solid #319e5b",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      YES
                    </Typography>
                  </Box>
                </Box>
              </Box>
            }
            {betLock && (
              <Box
                sx={{
                  position: "absolute",
                  height: "86%",
                  top: "14%",
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

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                position: "relative",
                maxHeight: "387px",
                overflowY: "visible",
              }}
            >
              {newData?.length > 0 &&
                newData?.map((item: any) => {
                  let element = JSON.parse(item);
                  return (
                    <Box
                      key={element?.id}
                      sx={{
                        width: "100%",
                        display: element?.betStatus === 2 ? "none" : "block",
                      }}
                    >
                      <QuickSessionMarketBox
                        betStatus={false}
                        upcoming={upcoming}
                        closeModal={true}
                        typeOfBet={typeOfBet}
                        // setFastBetLoading={setFastBetLoading}
                        data={element}
                        sessionMain={session}
                        setShowFastTimeBox={setShowFastTimeBox}
                        selectedFastAmount={fastAmount}
                        setFastAmount={setFastAmount}
                        showFastTimeBox={showFastTimeBox}
                        setSelectedItem={setSelectedItem}
                        selectedItem={selectedItem}
                        allRates={{
                          teamA: backTeamA,
                          teamB: backTeamB,
                          teamC: backTeamC,
                        }}
                        handleRateChange={handleRateChange}
                        eventType={eventType}
                      />
                      <Divider />
                    </Box>
                  );
                })}
            </Box>
          </Box>
        )}
      </Box>

      <style>
        {`
          @media only screen and (max-width: 600px) {
            body .arrowUpCollaps img {
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

export default memo(QuickSessionMarket);
