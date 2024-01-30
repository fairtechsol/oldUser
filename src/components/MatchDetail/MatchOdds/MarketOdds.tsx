
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import { TIME, ARROWUP, LockIcon } from "../../../assets";
import { memo, useState } from "react";
import Divider from "../../../helper/Divider";
import FastTime from "./FastTime";
import ManualBoxComponent from "./ManualBoxComponent";
import BoxComponent from "./BoxComponent";
import FastTimePlaceBet from "./Bets/FastTimePlaceBet";
import OddsPlaceBet from "./Bets/OddsPlacebet";
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
                    {valueA}
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
                    {valueB}
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
    minBet,
    maxBet,
    showBox,
    showDely,
    newData,
    isRound,
    typeOfBet,
    session,
    matchOdd,
    setFastAmount,
    fastAmount,
    betLock,
    showFast,
    upcoming,
    handleRateChange,
    teamA,
    teamB,
    teamC,
    name,
    statusTeamA,
    statusTeamB,
    statusTeamC
    
}: any) => {
    const theme = useTheme();
    const [showFastTimeBox, setShowFastTimeBox] = useState(false);
    const [placeBetData, setPlaceBetData] = useState(null);
    const [fastRate, setFastRate] = useState(null);

    const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

    const { matchDetails } = useSelector(
        (state: RootState) => state.match.matchList
      );

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
                            <Time time={30} />
                        )}
                        {showFast && (
                            <FastTime
                               
                                setPlaceBetData={setPlaceBetData}
                               
                                data={"8"}
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
                        <SmallBox valueA={"9"} valueB={"8"} />
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
                                    MIN: {minBet} MAX:{maxBet}
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
                                  
                                    setPlaceBetData={setPlaceBetData}
                                  
                                    livestatus={
                                        matchOdd?.statusTeamA === "suspended" ? true : false
                                      }
                                    color={teamARates <= 0 ? "#FF4D4D" : "#319E5B"}
                                   
                                    team={"teamA"}

                                />
                          
                                <Divider />

                                
                                <ManualBoxComponent
                                  
                                    setPlaceBetData={setPlaceBetData}
                                    
                                    color={teamBRates <= 0 ? "#FF4D4D" : "#319E5B"}
                                   
                                    team={"teamB"}
                                  
                                />
                                {newData?.teamC && (
                                    <>
                                        <Divider />
                                        <ManualBoxComponent
                                          
                                            color={teamCRates <= 0 ? "#FF4D4D" : "#46e080"}
                                          
                                        />
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                  
                                <BoxComponent
                                    livestatus={statusTeamA === "suspended" ? true : false}
                                    setPlaceBetData={setPlaceBetData}
                                     name={teamA}
                                    color={teamARates <= 0 ? "#FF4D4D" : "#319E5B"}
                                   
                               

                                />
           
                                <Divider />
                                {/* {console.log("newData :",newData)} */}
                                <BoxComponent
                                        livestatus={statusTeamB === "suspended" ? true : false}
                                    setPlaceBetData={setPlaceBetData}
                                   
                                    color={teamBRates <= 0 ? "#FF4D4D" : "#319E5B"}
                                   
                                   name={teamB}
                                   
                                />
                                {newData?.teamC && (
                                    <>
                                        <Divider />
                                        <BoxComponent
                                                  livestatus={statusTeamC === "suspended" ? true : false}
                                            setPlaceBetData={setPlaceBetData}
                                           
                                            color={teamCRates <= 0 ? "#FF4D4D" : "#319E5B"}
                                           
                                            name={teamC}
                                           
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
            //  setCanceled={setCanceled}
             setPlaceBetData={setPlaceBetData}
             placeBetData={placeBetData}
             handleClose={() => setPlaceBetData(null)}
            //  name={placeBetData?.name}
             setFastRate={setFastRate}
             fastRate={fastRate}
            //  rates={placeBetData?.rates}
             season={session}
            //  back={placeBetData?.back}
            //  currentMatch={placeBetData?.currentMatch}
            //  isBack={placeBetData?.isBack}
            //  selectedValue={placeBetData?.selectedValue}
            //  type={placeBetData?.type}
             typeOfBet={typeOfBet}
             handleRateChange={handleRateChange}
            
            />
          </Box>

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
