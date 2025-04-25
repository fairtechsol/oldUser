import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  betPlaceErrorCheck,
  betPlaceSuccessReset,
  placeBet,
} from "../../../../store/actions/betPlace/betPlaceActions";
import { AppDispatch, RootState } from "../../../../store/store";
import { ApiConstants } from "../../../../utils/Constants";
import NotificationModal from "../../../Common/NotificationModal";
import NumberData from "./NumberDataFastTime";

const FastTimePlaceBet = ({
  session,
  selectedFastAmount,
  typeOfBet,
  data,
  fromOdds,
  selectedValue,
  matchOddsData,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { success, loading, betPlaceError } = useSelector(
    (state: RootState) => state.match.bet
  );
  const [ipAddress] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [canceled] = useState({
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

  const handleBet = (
    stake: any,
    type: string,
    index: any,
    team: string,
    bettingName?: string
  ) => {
    try {
      if (loading) {
        return;
      }
      let betTeam;

      if (
        matchOddsData?.type === "tiedMatch2" ||
        matchOddsData?.type === "completeManual"
      ) {
        betTeam =
          matchOddsData?.statusTeamA === "active" &&
            matchOddsData?.statusTeamB === "active"
            ? index === 0
              ? "YES"
              : "NO"
            : matchOddsData?.statusTeamA === "active" &&
              matchOddsData?.statusTeamB === "suspended"
              ? "YES"
              : matchOddsData?.statusTeamA === "suspended" &&
                matchOddsData?.statusTeamB === "active"
                ? "NO"
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
        betOnTeam: team === "" ? betTeam : team,
        bettingName: bettingName,
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
        teamA:
          matchOddsData?.type === "tiedMatch2" ||
            matchOddsData?.type === "completeManual"
            ? "YES"
            : matchDetails?.teamA,
        teamB:
          matchOddsData?.type === "tiedMatch2" ||
            matchOddsData?.type === "completeManual"
            ? "NO"
            : matchDetails?.teamB,
        teamC: matchDetails?.teamC,
      };
      if (payload?.odd > 0) {
        dispatch(
          placeBet({
            url: ApiConstants.BET.PLACEBETMATCHBETTING,
            data: JSON.stringify(payload),
          })
        );
      } else return;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (success) {
      // setShowFastTimeBox(false);
      dispatch(betPlaceSuccessReset());
    }
  }, [success]);

  useEffect(() => {
    setOpenModal(loading);
    if (betPlaceError) {
      setOpenModal1(!loading);
    }
    if (betPlaceError) {
      handleErrorModal();
    }
  }, [loading]);

  const handleErrorModal = () => {
    setTimeout(() => {
      setOpenModal1(false);
      dispatch(betPlaceErrorCheck());
    }, 2000);
  };

  return (
    <>
      <Box
        ref={myDivRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid white",
          borderRadius: "5px",
          gap: 1,
          overflow: "hidden",
          width: "100%",
        }}
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

          {matchOddsData?.statusTeamC === "active" ||
            (matchOddsData.statusTeamA === "active" &&
              matchOddsData.statusTeamB === "active") ? (
            <>
              <Box
                sx={{
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
                    ml: "6px",
                    flexWrap: "wrap",
                    maxWidth: "100%",
                    flex: 1,
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
                    {matchOddsData?.type === "tiedMatch2" ||
                      matchOddsData?.type === "completeManual"
                      ? "YES"
                      : matchDetails?.teamA}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginX: "2px",
                    flexWrap: "wrap",
                    maxWidth: "100%",
                    flex: 1,
                    gap: { xs: "3px", lg: 1, md: 1 },
                  }}
                >
                  {matchButtonList &&
                    matchButtonList?.map((v: any, index: any) => {
                      return (
                        <>
                          <NumberData
                            handleBet={() => {
                              if (
                                matchOddsData?.statusTeamA === "active" ||
                                matchOddsData?.statusTeamB === "active" ||
                                matchOddsData?.statusTeamC === "active"
                              ) {
                                handleBet(
                                  v.value,
                                  "BACK",
                                  index,
                                  matchOddsData?.type === "tiedMatch2" ||
                                    matchOddsData?.type === "completeManual"
                                    ? "YES"
                                    : matchDetails?.teamA,
                                  matchOddsData?.name
                                );
                              }
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
                            type="back"
                            session={session}
                            betOnTeam={matchOddsData?.teamA}
                            teamSuspend={matchOddsData?.teamA_suspend}
                            odds={matchOddsData?.teamA_Back}
                            typeOfBet={typeOfBet}
                            placeIndex={
                              matchOddsData?.marketType === "QuickBookmaker0"
                                ? 0
                                : matchOddsData?.marketType ===
                                  "QuickBookmaker1"
                                  ? 1
                                  : 2
                            }
                            backgroundColor="#A7DCFF"
                            matchOddsData={matchOddsData}
                          />
                        </>
                      );
                    })}
                </Box>
              </Box>

              <Box
                sx={{
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
                    ml: "6px",
                    flexWrap: "wrap",
                    maxWidth: "100%",
                    flex: 1,
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
                    {matchOddsData?.type === "tiedMatch2" ||
                      matchOddsData?.type === "completeManual"
                      ? "NO"
                      : matchDetails?.teamB}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginX: "2px",
                    flexWrap: "wrap",
                    maxWidth: "100%",
                    flex: 1,
                    gap: { xs: "3px", lg: 1, md: 1 },
                  }}
                >
                  {matchButtonList.length > 0 &&
                    matchButtonList?.map((v: any, index: any) => {
                      return (
                        <NumberData
                          handleBet={() => {
                            if (
                              matchOddsData?.statusTeamA === "active" ||
                              matchOddsData?.statusTeamB === "active" ||
                              matchOddsData?.statusTeamC === "active"
                            ) {
                              handleBet(
                                v.value,
                                "BACK",
                                index,
                                matchOddsData?.type === "tiedMatch2" ||
                                  matchOddsData?.type === "completeManual"
                                  ? "NO"
                                  : matchDetails?.teamB,
                                matchOddsData?.name
                              );
                            }
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
                          type="back"
                          session={session}
                          betOnTeam={matchOddsData?.teamB}
                          teamSuspend={matchOddsData?.teamB_suspend}
                          odds={matchOddsData?.teamB_Back}
                          typeOfBet={typeOfBet}
                          placeIndex={
                            matchOddsData?.marketType === "QuickBookmaker0"
                              ? 0
                              : matchOddsData?.marketType === "QuickBookmaker1"
                                ? 1
                                : 2
                          }
                          backgroundColor="#A7DCFF"
                          matchOddsData={matchOddsData}
                        />
                      );
                    })}
                </Box>
              </Box>
              {matchDetails?.teamC &&
                matchOddsData?.type !== "tiedMatch2" &&
                matchOddsData?.type !== "completeManual" && (
                  <Box
                    sx={{
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
                        ml: "6px",
                        flexWrap: "wrap",
                        maxWidth: "100%",
                        flex: 1,
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
                        marginX: "2px",
                        flexWrap: "wrap",
                        maxWidth: "100%",
                        flex: 1,
                        gap: { xs: "3px", lg: 1, md: 1 },
                      }}
                    >
                      {matchButtonList.length > 0 &&
                        matchButtonList?.map((v: any, index: any) => (
                          <NumberData
                            handleBet={() => {
                              if (
                                matchOddsData?.statusTeamA === "active" ||
                                matchOddsData?.statusTeamB === "active" ||
                                matchOddsData?.statusTeamC === "active"
                              ) {
                                handleBet(
                                  v.value,
                                  "BACK",
                                  index,
                                  matchDetails?.teamC,
                                  matchOddsData?.name
                                );
                              }
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
                            type="back"
                            session={session}
                            betOnTeam={matchOddsData?.teamC}
                            teamSuspend={matchOddsData?.teamC_suspend}
                            odds={matchOddsData?.teamC_Back}
                            typeOfBet={typeOfBet}
                            placeIndex={
                              matchOddsData?.marketType === "QuickBookmaker0"
                                ? 0
                                : matchOddsData?.marketType ===
                                  "QuickBookmaker1"
                                  ? 1
                                  : 2
                            }
                            backgroundColor="#A7DCFF"
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
                        if (
                          matchOddsData?.statusTeamA === "active" ||
                          matchOddsData?.statusTeamB === "active" ||
                          matchOddsData?.statusTeamC === "active"
                        ) {
                          handleBet(
                            v.value,
                            "BACK",
                            index,
                            "",
                            matchOddsData?.name
                          );
                        }
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
                      type="back"
                      session={session}
                      betOnTeam={
                        ![null, ""].includes(matchOddsData?.teamA_Back)
                          ? matchOddsData?.teamA
                          : ![null, ""].includes(matchOddsData?.teamB_Back)
                            ? matchOddsData?.teamB
                            : matchOddsData?.teamC
                      }
                      teamSuspend={
                        ![null, ""].includes(matchOddsData?.teamA_Back)
                          ? matchOddsData?.teamA_suspend
                          : ![null, ""].includes(matchOddsData?.teamB_Back)
                            ? matchOddsData?.teamB_suspend
                            : matchOddsData?.teamC_suspend
                      }
                      odds={
                        ![null, ""].includes(matchOddsData?.teamA_Back)
                          ? matchOddsData?.teamA_Back
                          : ![null, ""].includes(matchOddsData?.teamB_Back)
                            ? matchOddsData?.teamB_Back
                            : matchOddsData?.teamC_Back
                      }
                      typeOfBet={typeOfBet}
                      backgroundColor="#A7DCFF"
                      matchOddsData={matchOddsData}
                      placeIndex={
                        matchOddsData?.marketType === "QuickBookmaker0"
                          ? 0
                          : matchOddsData?.marketType === "QuickBookmaker1"
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
                        if (
                          matchOddsData?.statusTeamA === "active" ||
                          matchOddsData?.statusTeamB === "active" ||
                          matchOddsData?.statusTeamC === "active"
                        ) {
                          handleBet(
                            v.value,
                            "LAY",
                            index,
                            "",
                            matchOddsData?.name
                          );
                        }
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
                      type="lay"
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
                          : ![null, ""].includes(matchOddsData?.teamB_Back)
                            ? matchOddsData?.teamB_lay
                            : matchOddsData?.teamC_lay
                      }
                      typeOfBet={typeOfBet}
                      backgroundColor="#FFB5B5"
                      matchOddsData={matchOddsData}
                      placeIndex={
                        matchOddsData?.marketType === "QuickBookmaker0"
                          ? 0
                          : matchOddsData?.marketType === "QuickBookmaker1"
                            ? 1
                            : 2
                      }
                      data={data}
                    />
                  ))}
              </Box>
            </>
          )}
        </Box>
      </Box>

      {session === "sessionOdds" && (
        <Box
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
              flexDirection: "row",
              alignItems: "center",
              paddingY: "8px",
            }}
          >
            {matchesMobile && (
              <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }} />
            )}
            <>
              <Box
                sx={{
                  display: "flex",
                  marginX: "2px",
                  flexWrap: "wrap",
                  maxWidth: "50%",
                  flex: 1,
                  gap: { xs: "3px", lg: 1, md: 1 },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  marginX: "2px",
                  flexWrap: "wrap",
                  maxWidth: "50%",
                  flex: 1,
                  gap: { xs: "3px", lg: 1, md: 1 },
                }}
              />
            </>
          </Box>
        </Box>
      )}

      {canceled.value && <NotificationModal />}
      {openModal && <NotificationModal />}
      {openModal1 && <NotificationModal />}
    </>
  );
};

export default memo(FastTimePlaceBet);
