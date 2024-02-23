import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import NotificationModal from "../../../Common/NotificationModal";
import { ApiConstants } from "../../../../utils/Constants";
import { useDispatch } from "react-redux";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../../../store/actions/betPlace/betPlaceActions";
import NumberData from "./NumberDataFastTime";
const FastTimePlaceBet = ({
  session,
  selectedFastAmount,
  typeOfBet,
  matchOddsData,
  data,
  fromOdds,
  selectedValue,
  setShowFastTimeBox,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { success } = useSelector((state: RootState) => state.match.bet);
  const [ipAddress] = useState(null);
  const [canceled, setCanceled] = useState({
    value: false,
    msg: "",
    loading: false,
    type: false,
  });
  const dispatch: AppDispatch = useDispatch();

  const [browserInfo, setBrowserInfo] = useState<any>(null);
  const { matchDetails } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { buttonValues } = useSelector(
    (state: RootState) => state.user.profile
  );

  const [matchButtonList, setMatchButtonList] = useState<any>([]);
  useEffect(() => {
    const typeIndexMap: Record<string, number> = {};
    const { userAgent, appName, appVersion, platform } = navigator;
    const info: any = { userAgent, appName, appVersion, platform };
    setBrowserInfo(info);
    for (let i = 0; i < buttonValues.length; i++) {
      const entry = buttonValues[i];
      const type = entry.type;

      typeIndexMap[type] = i;
    }
    const indexOfTypeMatch = typeIndexMap["Match"];
    if (buttonValues[indexOfTypeMatch]?.value) {
      const response = JSON.parse(buttonValues[indexOfTypeMatch]?.value);
      const keys = Object.keys(response);
      const additionalFieldsCount = Math.max(0, 8 - keys.length);
      const additionalFields = Array.from({
        length: additionalFieldsCount,
      }).map((_) => ({
        label: "",
        value: "",
      }));
      setMatchButtonList(
        keys
          .map((item) => ({
            label: item,
            value: response[item],
          }))
          .concat(additionalFields)
      );
    }
  }, [buttonValues]);

  const myDivRef = useRef(null);

  useEffect(() => {
    if (!fromOdds) {
    }
  }, [selectedValue, fromOdds]);

  const handleBet = (stake: any, type: string, index: any, team: string) => {
    let betTeam;
    
    if (matchOddsData?.type === "tiedMatch2") {
      betTeam =
        matchOddsData?.statusTeamA === "active" &&
        matchOddsData?.statusTeamB === "active"
          ? index === 0
            ? "Yes"
            : "No"
          : matchOddsData?.statusTeamA === "active" &&
            matchOddsData?.statusTeamB === "suspended"
          ? "Yes"
          : matchOddsData?.statusTeamA === "suspended" &&
            matchOddsData?.statusTeamB === "active"
          ? "No"
          : "";
    } else {
      betTeam =
        matchOddsData?.statusTeamA === "active" &&
        matchOddsData?.statusTeamB === "active"
          ? index === 0
            ? matchDetails?.teamA
            : matchDetails?.teamB
          : matchOddsData?.statusTeamA === "active" &&
            matchOddsData?.statusTeamB === "suspended"
          ? matchDetails?.teamA
          : matchOddsData?.statusTeamA === "suspended" &&
            matchOddsData?.statusTeamB === "active"
          ? matchDetails?.teamB
          : "";
    }

    let payload: any = {
      betId: matchOddsData?.id,
      betOnTeam: team === ''? betTeam : team,
      bettingType: type,
      browserDetail: browserInfo?.userAgent,
      matchId: matchOddsData?.matchId,
      ipAddress:
        ipAddress === "Not found" || !ipAddress ? "192.168.1.100" : ipAddress,
      odd:
        matchOddsData?.statusTeamA === "active"
          ? type === "BACK"
            ? matchOddsData?.backTeamA
            : matchOddsData?.layTeamA
          : matchOddsData?.statusTeamB === "active"
          ? type === "BACK"
            ? matchOddsData?.backTeamB
            : matchOddsData?.layTeamB
          : type === "BACK"
          ? matchOddsData?.backTeamC
          : matchOddsData?.layTeamC,
      matchBetType: matchOddsData?.type,
      stake: stake,
      placeIndex: 0,
      teamA: matchDetails?.teamA,
      teamB: matchDetails?.teamB,
      teamC: matchDetails?.teamC,
    };
    dispatch(
      placeBet({
        url: ApiConstants.BET.PLACEBETMATCHBETTING,
        data: JSON.stringify(payload),
      })
    );
  };

  // const handleChange = (e: any) => {
  //   const value = e.target.value.trim();

  //   if (value === "") {
  //     if (session === "sessionOdds") {
  //       setFastAmount((prev: any) => ({ ...prev, sessionOdds: 0 }));
  //     } else if (session === "manualBookMaker") {
  //       setFastAmount((prev: any) => ({ ...prev, [typeOfBet]: 0 }));
  //     } else if (session === "bookmaker") {
  //       setFastAmount((prev: any) => ({ ...prev, bookMaker: 0 }));
  //     }
  //   } else {
  //     if (Number(value) <= 500000) {
  //       if (session === "sessionOdds") {
  //         setFastAmount((prev: any) => ({
  //           ...prev,
  //           sessionOdds: Number(value),
  //         }));
  //       } else if (session === "manualBookMaker") {
  //         setFastAmount((prev: any) => ({
  //           ...prev,
  //           [typeOfBet]: Number(value),
  //         }));
  //       } else if (session === "bookmaker") {
  //         setFastAmount((prev: any) => ({ ...prev, bookMaker: Number(value) }));
  //       }
  //     } else {
  //       toast.warning(
  //         `Value must be between less then 500000
  //         `
  //       );
  //     }
  //   }
  // };

  useEffect(() => {
    if (success) {
      setShowFastTimeBox(false);
      dispatch(betPlaceSuccessReset());
    }
  }, [success]);
  // console.log(matchDetails)
  return (
    <>
      {session === "manualBookMaker" && (
        <Box
          // ref={refs}
          ref={myDivRef}
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              border: "1px solid white",
              borderRadius: "5px",
              gap: 1,
              overflow: "hidden",
              width: "100%",
            },
          ]}
        >
          <Box
            sx={{
              background: "#F8C851",
              width: { xs: "100%", lg: "100%" },
              overflow: "hidden",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              paddingY: "8px",
            }}
          >
            {matchesMobile && (
              <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }} />
            )}
            {
              <>
                {/* {matchOddsData?.isSingle === false || matchOddsData?.teamB_suspend !== "suspended" ? ( */}
                {matchOddsData?.statusTeamC === "active" ||
                (matchOddsData.statusTeamA === "active" &&
                  matchOddsData.statusTeamB === "active") ? (
                  // ||
                  //   ((matchOddsData?.teamA_suspend === null || false) &&
                  //     (matchOddsData?.teamB_suspend === null || false))
                  <>
                    <Box
                      sx={{
                        // display: "flex",
                        // marginTop: "15px",
                        marginX: "2px",
                        flexWrap: "wrap",
                        width: { lg: "49.1%", xs: "48%" },
                        flex: "0 0 auto",
                        border: "1px solid #cc9f30",
                        padding: "0.5rem",
                        gap: { xs: "3px", lg: 1, md: 1 },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          // marginTop: "15px",
                          ml: "6px",
                          flexWrap: "wrap",
                          maxWidth: "100%",
                          flex: 1,
                          // border: "1px solid black",
                          // padding: "0.5rem",
                          marginBottom: "5px",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "bold",
                            width: "100%",
                          }}
                        >
                          {matchDetails?.teamA}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          // marginTop: "15px",
                          marginX: "2px",
                          flexWrap: "wrap",
                          maxWidth: "100%",
                          flex: 1,
                          // border: "1px solid black",
                          // padding: "0.5rem",
                          gap: { xs: "3px", lg: 1, md: 1 },
                        }}
                      >
                        {matchButtonList &&
                          matchButtonList?.map((v: any, index: any) => {
                            return (
                              <>
                                <NumberData
                                  handleBet={() => {
                                    handleBet(
                                      v.value,
                                      "BACK",
                                      index,
                                      matchDetails?.teamA
                                    );
                                  }}
                                  key={index}
                                  containerStyle={{
                                    marginLeft: "2px",
                                    flex: 1,
                                    background:
                                      selectedFastAmount === v && "#FF4949",
                                    borderRadius: "5px",
                                    border: "2px solid white",
                                  }}
                                  value={v.value}
                                  lable={v.label}
                                  type={"back"}
                                  session={session}
                                  betOnTeam={matchOddsData?.teamA}
                                  teamSuspend={matchOddsData?.teamA_suspend}
                                  odds={matchOddsData?.teamA_Back}
                                  typeOfBet={typeOfBet}
                                  placeIndex={
                                    matchOddsData?.marketType ===
                                    "QuickBookmaker0"
                                      ? 0
                                      : matchOddsData?.marketType ===
                                        "QuickBookmaker1"
                                      ? 1
                                      : 2
                                  }
                                  backgroundColor={"#A7DCFF"}
                                  matchOddsData={matchOddsData}
                                />
                              </>
                            );
                          })}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        // display: "flex",
                        // marginTop: "15px",
                        marginX: "2px",
                        flexWrap: "wrap",
                        width: { lg: "49.1%", xs: "48%" },
                        flex: "0 0 auto",
                        border: "1px solid #cc9f30",
                        padding: "0.5rem",
                        gap: { xs: "3px", lg: 1, md: 1 },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          // marginTop: "15px",
                          ml: "6px",
                          flexWrap: "wrap",
                          maxWidth: "100%",
                          flex: 1,
                          // border: "1px solid black",
                          // padding: "0.5rem",
                          marginBottom: "5px",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "bold",
                            width: "100%",
                          }}
                        >
                          {matchDetails?.teamB}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          // marginTop: "15px",
                          marginX: "2px",
                          flexWrap: "wrap",
                          maxWidth: "100%",
                          flex: 1,
                          // border: "1px solid black",
                          // padding: "0.5rem",
                          gap: { xs: "3px", lg: 1, md: 1 },
                        }}
                      >
                        {matchButtonList.length > 0 &&
                          matchButtonList?.map((v: any, index: any) => {
                            return (
                              <NumberData
                                handleBet={() => {
                                  handleBet(
                                    v.value,
                                    "BACK",
                                    index,
                                    matchDetails?.teamB
                                  );
                                }}
                                key={index}
                                containerStyle={{
                                  marginLeft: "2px",
                                  flex: 1,
                                  background:
                                    selectedFastAmount === v && "#FF4949",
                                  borderRadius: "5px",
                                  border: "2px solid white",
                                }}
                                value={v.value}
                                lable={v.label}
                                type={"back"}
                                session={session}
                                betOnTeam={matchOddsData?.teamB}
                                teamSuspend={matchOddsData?.teamB_suspend}
                                odds={matchOddsData?.teamB_Back}
                                typeOfBet={typeOfBet}
                                placeIndex={
                                  matchOddsData?.marketType ===
                                  "QuickBookmaker0"
                                    ? 0
                                    : matchOddsData?.marketType ===
                                      "QuickBookmaker1"
                                    ? 1
                                    : 2
                                }
                                backgroundColor={"#A7DCFF"}
                                matchOddsData={matchOddsData}
                              />
                            );
                          })}
                      </Box>
                    </Box>
                    {matchOddsData?.statusTeamC === "active" && (
                      <Box
                        sx={{
                          // display: "flex",
                          // marginTop: "15px",
                          marginX: "2px",
                          flexWrap: "wrap",
                          width: { lg: "49.1%", xs: "48%" },
                          flex: "0 0 auto",
                          border: "1px solid #cc9f30",
                          padding: "0.5rem",
                          marginTop: "6px",
                          gap: { xs: "3px", lg: 1, md: 1 },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            // marginTop: "15px",
                            ml: "6px",
                            flexWrap: "wrap",
                            maxWidth: "100%",
                            flex: 1,
                            // border: "1px solid black",
                            // padding: "0.5rem",
                            marginBottom: "5px",
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "black",
                              fontWeight: "bold",
                              width: "100%",
                            }}
                          >
                            {matchDetails?.teamC}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            // marginTop: "15px",
                            marginX: "2px",
                            flexWrap: "wrap",
                            maxWidth: "100%",
                            flex: 1,
                            // border: "1px solid black",
                            // padding: "0.5rem",
                            gap: { xs: "3px", lg: 1, md: 1 },
                          }}
                        >
                          {matchButtonList.length > 0 &&
                            matchButtonList?.map((v: any, index: any) => (
                              <NumberData
                                handleBet={() => {
                                  handleBet(
                                    v.value,
                                    "BACK",
                                    index,
                                    matchDetails?.teamC
                                  );
                                }}
                                key={index}
                                containerStyle={{
                                  marginLeft: "2px",
                                  flex: 1,
                                  background:
                                    selectedFastAmount === v && "#FF4949",
                                  borderRadius: "5px",
                                  border: "2px solid white",
                                }}
                                value={v.value}
                                lable={v.label}
                                type={"back"}
                                session={session}
                                betOnTeam={matchOddsData?.teamC}
                                teamSuspend={matchOddsData?.teamC_suspend}
                                odds={matchOddsData?.teamC_Back}
                                typeOfBet={typeOfBet}
                                placeIndex={
                                  matchOddsData?.marketType ===
                                  "QuickBookmaker0"
                                    ? 0
                                    : matchOddsData?.marketType ===
                                      "QuickBookmaker1"
                                    ? 1
                                    : 2
                                }
                                backgroundColor={"#A7DCFF"}
                                matchOddsData={matchOddsData}
                              />
                            ))}
                        </Box>
                      </Box>
                    )}
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        // marginTop: "15px",
                        marginX: "2px",
                        flexWrap: "wrap",
                        maxWidth: "50%",
                        flex: 1,
                        gap: { xs: "3px", lg: 1, md: 1 },
                      }}
                    >
                      {matchButtonList.length > 0 &&
                        matchButtonList?.map((v: any, index: any) => (
                          <NumberData
                            handleBet={() => {
                              handleBet(v.value, "BACK", index, "");
                            }}
                            key={index}
                            containerStyle={{
                              marginLeft: "2px",
                              flex: 1,
                              background: selectedFastAmount === v && "#FF4949",
                              borderRadius: "5px",
                              border: "2px solid white",
                            }}
                            value={v.value}
                            lable={v.label}
                            type={"back"}
                            session={session}
                            betOnTeam={
                              ![null, ""].includes(matchOddsData?.teamA_Back)
                                ? matchOddsData?.teamA
                                : ![null, ""].includes(
                                    matchOddsData?.teamB_Back
                                  )
                                ? matchOddsData?.teamB
                                : matchOddsData?.teamC
                            }
                            teamSuspend={
                              ![null, ""].includes(matchOddsData?.teamA_Back)
                                ? matchOddsData?.teamA_suspend
                                : ![null, ""].includes(
                                    matchOddsData?.teamB_Back
                                  )
                                ? matchOddsData?.teamB_suspend
                                : matchOddsData?.teamC_suspend
                            }
                            odds={
                              ![null, ""].includes(matchOddsData?.teamA_Back)
                                ? matchOddsData?.teamA_Back
                                : ![null, ""].includes(
                                    matchOddsData?.teamB_Back
                                  )
                                ? matchOddsData?.teamB_Back
                                : matchOddsData?.teamC_Back
                            }
                            typeOfBet={typeOfBet}
                            backgroundColor={"#A7DCFF"}
                            matchOddsData={matchOddsData}
                            placeIndex={
                              matchOddsData?.marketType === "QuickBookmaker0"
                                ? 0
                                : matchOddsData?.marketType ===
                                  "QuickBookmaker1"
                                ? 1
                                : 2
                            }
                            data={data}
                          />
                        ))}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        // marginY: "8px",
                        marginX: "2px",
                        flexWrap: "wrap",
                        maxWidth: "50%",
                        flex: 1,
                        gap: { xs: "3px", lg: 1, md: 1 },
                      }}
                    >
                      {matchButtonList.length > 0 &&
                        matchButtonList?.map((v: any, index: any) => (
                          <NumberData
                            handleBet={() => {
                              handleBet(v.value, "LAY", index, "");
                            }}
                            key={index}
                            containerStyle={{
                              marginLeft: "2px",
                              flex: 1,
                              background: selectedFastAmount === v && "#FF4949",
                              borderRadius: "5px",
                              border: "2px solid white",
                            }}
                            value={v.value}
                            lable={v.label}
                            type={"lay"}
                            session={session}
                            betOnTeam={
                              ![null, ""].includes(matchOddsData?.teamA_lay)
                                ? matchOddsData?.teamA
                                : ![null, ""].includes(matchOddsData?.teamB_lay)
                                ? matchOddsData?.teamB
                                : matchOddsData?.teamC
                            }
                            teamSuspend={
                              ![null, ""].includes(matchOddsData?.teamA_lay)
                                ? matchOddsData?.teamA_suspend
                                : ![null, ""].includes(matchOddsData?.teamB_lay)
                                ? matchOddsData?.teamB_suspend
                                : matchOddsData?.teamC_suspend
                            }
                            odds={
                              ![null, ""].includes(matchOddsData?.teamA_lay)
                                ? matchOddsData?.teamA_lay
                                : ![null, ""].includes(
                                    matchOddsData?.teamB_Back
                                  )
                                ? matchOddsData?.teamB_lay
                                : matchOddsData?.teamC_lay
                            }
                            typeOfBet={typeOfBet}
                            backgroundColor={"#FFB5B5"}
                            matchOddsData={matchOddsData}
                            placeIndex={
                              matchOddsData?.marketType === "QuickBookmaker0"
                                ? 0
                                : matchOddsData?.marketType ===
                                  "QuickBookmaker1"
                                ? 1
                                : 2
                            }
                            data={data}
                          />
                        ))}
                    </Box>
                  </>
                )}
              </>
            }
          </Box>
        </Box>
      )}
      {session === "sessionOdds" && (
        <Box
          // ref={refs}
          ref={myDivRef}
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              border: "1px solid white",
              borderRadius: "5px",
              gap: 1,
              overflow: "hidden",
              width: "100%",
            },
          ]}
        >
          <Box
            sx={{
              background: "#F8C851",
              width: { xs: "100%", lg: "100%" },
              overflow: "hidden",
              display: "flex",

              // justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              paddingY: "8px",
            }}
          >
            {matchesMobile && (
              <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }} />
            )}
            {
              <>
                <>
                  <Box
                    sx={{
                      display: "flex",
                      // marginTop: "15px",
                      marginX: "2px",
                      flexWrap: "wrap",
                      maxWidth: "50%",
                      flex: 1,
                      gap: { xs: "3px", lg: 1, md: 1 },
                    }}
                  >
                    {/* {matchButtonList.length > 0 &&
                      matchButtonList?.map((v: any, index: any) => (
                        <NumberData
                          key={index}
                          containerStyle={{
                            marginLeft: "2px",
                            flex: 1,
                            background: selectedFastAmount === v && "#FF4949",
                            borderRadius: "5px",
                            border: "2px solid white",
                          }}
                          value={v.value}
                          lable={v.lable}
                          type={"back"}
                          session={session}
                          teamSuspend={data?.suspended}
                          odds={data?.no_rate}
                          typeOfBet={typeOfBet}
                          backgroundColor={"#FFB5B5"}
                          matchOddsData={matchOddsData}
                          data={data}
                          placeIndex={2}
                            handleAmountClick={handleAmountClick}
                          setShowFastTimeBox={setShowFastTimeBox}
                        />
                      ))} */}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // marginY: "8px",
                      marginX: "2px",
                      flexWrap: "wrap",
                      maxWidth: "50%",
                      flex: 1,
                      gap: { xs: "3px", lg: 1, md: 1 },
                    }}
                  >
                    {/* {matchButtonList.length > 0 &&
                      matchButtonList?.map((v: any, index: any) => (
                        <NumberData
                          key={index}
                          containerStyle={{
                            marginLeft: "2px",
                            flex: 1,
                            background: selectedFastAmount === v && "#FF4949",
                            borderRadius: "5px",
                            border: "2px solid white",
                          }}
                          value={v.value}
                          lable={v.lable}
                          type={"lay"}
                          session={session}
                          teamSuspend={data?.suspended}
                          odds={data?.yes_rate}
                          typeOfBet={typeOfBet}
                          backgroundColor={"#A7DCFF"}
                          matchOddsData={matchOddsData}
                          data={data}
                          placeIndex={1}
                            handleAmountClick={handleAmountClick}
                          setShowFastTimeBox={setShowFastTimeBox}
                        />
                      ))} */}
                  </Box>
                </>
              </>
            }
          </Box>
        </Box>
      )}
      {canceled.value && (
        <NotificationModal
          // time={
          //   typeOfBet == "MATCH ODDS"
          //     ? currentMatch?.delaySecond
          //       ? currentMatch?.delaySecond
          //       : 0
          //     : 0
          // }
          open={canceled}
          handleClose={() =>
            setCanceled({
              value: false,
              msg: "",
              loading: false,
              type: false,
            })
          }
        />
      )}
    </>
  );
};

export default FastTimePlaceBet;
