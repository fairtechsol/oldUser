
import { Box, Typography, useMediaQuery, useTheme, } from "@mui/material";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import Modal from '@mui/material/Modal';
import MUIModal from "@mui/material/Modal";
// import PlaceBet from "../PlaceBet";
// import BetPlaced from "..";
import { Modal } from "react-bootstrap";


import { Lock } from "../../../assets/index";
import { useState } from "react";
import OddsPlaceBet from "./Bets/OddsPlacebet";


// import NotificationModal from "../NotificationModal";


const SeparateModal = ({
  color,
  po,
  empty,
  value,
  value2,
  lock,
  session,
  back,
  currentMatch,
  type,
  name,
  data,
  typeOfBet,
  mainData,
  rates,
  betType,
  setFastAmount,
  selectedFastAmount,
  fromOdds,
  sessionMain,
  setFastRate,
  placeBetData,
  setFastBetLoading,
  closeModal,
  handleRateChange,
  updateRate,
}: any) => {
  const theme = useTheme();

  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBack, setIsBack] = React.useState(false);
  const [isSessionYes, setIsSessionYes] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(true);
  const [showModalMessage, setShowModalMessage] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [betPalaceError, setBetPalaceError] = useState(false);
  const [betPlaceLoading, setBetPlaceLoading] = useState(false);
  const [canceled, setCanceled] = useState({
    value: false,
    msg: "",
    loading: false,
    type: false,
  });


  const [previousValue, setPreviousValue] = useState(false);


  useEffect(() => {
    if (closeModal || lock) {
      // console.log("closeModal", closeModal);
      setShowSuccessModal(false);
    }
  }, [closeModal, lock]);



  // {console.log("isPopoverOpen state:", isPopoverOpen)}

  return (
    <>
      <Box
        sx={{
          cursor: betPlaceLoading ? "not-allowed" : "pointer",
          padding: { xs: "0px", lg: "1px", md: "1px" },
          width: { xs: "100%", lg: "20%" },
          height: "94%",
          //   position: typeOfBet === "SESSION" && "relative" : undefined,
        }}
      >
        <Box
          onClick={(e) => {
            if (lock || [0, "0"].includes(value)) {
              return false;
            }
            if (betPlaceLoading) {
              return false;
            } else {
              if (selectedFastAmount) {
                setFastBetLoading(true);

                let payload = {

                  id: currentMatch?.id,
                  matchType: currentMatch?.gameType,
                  // betId: currentMatch?.matchOddsData?.[0]?.id,
                  //   betId: findBetId(currentMatch),
                  bet_type: type?.color === "#A7DCFF" ? "back" : "lay",
                  odds: Number(value),
                  betOn: name,
                  stack: Number(selectedFastAmount),
                  team_bet: name,
                  // country: res?.country_name,
                  // ip_address: res?.IPv4,
                  stake: Number(selectedFastAmount),
                  teamA_name: currentMatch?.teamA,
                  teamB_name: currentMatch?.teamB,
                  teamC_name: currentMatch?.teamC,
                  marketType:
                    typeOfBet === "MATCH ODDS" ? "MATCH ODDS" : typeOfBet,
                };
                if (session) {
                  delete payload.betOn;
                  //   delete payload.odds;

                  payload.matchType = data?.matchType;
                  payload.teamA_name = mainData?.teamA;
                  payload.teamB_name = mainData?.teamB;
                  payload.id = data?.match_id;
                  //   payload.selectionId = data?.selectionId;
                  //   payload.betId = data?.id;
                  payload.bet_type = type?.color === "#A7DCFF" ? "yes" : "no";
                  //   payload.bet_condition = data?.bet_condition;
                  //   payload.rate_percent = data?.rate_percent;
                  payload.marketType = typeOfBet;
                  payload.odds = Number(value);
                  //   payload.sessionBet = true;
                }
                // handlePlaceBet(payload, currentMatch, po);
              } else {
                setIsPopoverOpen(true);
                setSelectedCountry(name);
                setSelectedValue(value);
                // dispatch(setUpdateBetData(value));
                type?.type === "BL"
                  ? setIsBack(type?.color === "#A7DCFF")
                  : setIsSessionYes(type?.color === "#A7DCFF");
                // dispatch(setColorValue(color));
              }
            }
          }}
          style={{ position: "relative" }}
          sx={{
            background: lock || [0, "0"].includes(value) ? "#FDF21A" : color,
            border:
              color != "white" ? "1px solid #2626264D" : "0px solid white",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            cursor: !empty && !lock && value && value2 && "pointer",
          }}
        >
          {!empty && !lock && ![0, "0"].includes(value) && (
            <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
              <Typography
                sx={{
                  fontSize: "15px",
                  color: color == "white" ? "white" : "black",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {value}
              </Typography>
              {typeOfBet != "MANUAL BOOKMAKER" ? (
                <Typography
                  sx={{
                    fontSize: "8px",
                    marginTop: -0.4,
                    color: color == "white" ? "white" : "black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {value2}
                </Typography>
              ) : null}
            </Box>
          )}
          {(lock || [0, "0"].includes(value)) && (
            <img
              src={Lock}
              style={{ width: "10px", height: "15px" }}
              alt="lock"
            />
          )}
        </Box>

        <MUIModal
          open={isPopoverOpen}
          onClose={() => {
            setIsPopoverOpen(false);
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              top: "33%",
              overflow: "hidden",
              justifyContent: "center",
            }}
          >
            <OddsPlaceBet
              betPlaceLoading={betPlaceLoading}
              name={name}
              rates={rates}
              // onSubmit={async (payload) => {
              //   if (betPlaceLoading) {
              //     return false;
              //   } else {
              //     // setBetPlaceLoading(true);// timer related
              //     handlePlaceBet(payload, currentMatch, payload?.po);
              //   }
              // }}
              onCancel={() => {
                setVisible(true);
                setIsPopoverOpen(false);
                setBetPlaceLoading(false);
              }}
              handleClose={() => {
                setIsPopoverOpen(false);
                setBetPlaceLoading(false);
              }}
              season={session}
              back={back}
              po={po}
              currentMatch={currentMatch}
              isBack={isBack}
              betType={betType}
              fromOdds={fromOdds}
              selectedValue={selectedValue}
              isSessionYes={isSessionYes}
              type={type}
              data={data}
              betOn={name}
              typeOfBet={typeOfBet}
              mainData={mainData}
            />
          </Box>
        </MUIModal>

        {showSuccessModal && (
          <Modal
            message={showModalMessage}
            setShowSuccessModal={true}
            showSuccessModal={showSuccessModal}
            buttonMessage={"OK"}
            navigateTo={"matchDetail"}
            userPG={true}
          />
        )}

</Box>

    </>
  );
};

export default memo(SeparateModal);
