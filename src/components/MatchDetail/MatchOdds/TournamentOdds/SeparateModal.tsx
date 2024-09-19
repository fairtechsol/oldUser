import { Box, Typography } from "@mui/material";
import MUIModal from "@mui/material/Modal";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectedBetAction,
  selectedBetMinMax,
} from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { Lock } from "../../../../assets";
import OddsPlaceBet from "../Bets/OddsPlacebet";

const SeparateModal = ({
  color,
  po,
  value,
  value2,
  lock,
  type,
  data,
  betType,
  marketDetails,
  upcoming,
  width,
  mid,
  teamName,
  matchDetails,
  selectionId,
}: any) => {
  console.log(data, "abc", marketDetails);

  const dispatch: AppDispatch = useDispatch();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const { loading } = useSelector((state: RootState) => state.match.bet);

  const handleClick = (team: any, data: any) => {
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
    dispatch(
      selectedBetMinMax({
        team,
        data,
      })
    );
  };

  const handleRateClick = () => {
    if (lock || [0, "0", null, undefined].includes(value) || upcoming) {
      return false;
    }
    if (loading) {
      return false;
    } else {
      setIsPopoverOpen(true);
      handleClick(
        {
          betId: marketDetails?.id,
          name: data?.name ?? data?.RunnerName ?? data?.nat,
          rate: value,
          type: betType,
          stake: 0,
          percent: value2,
          eventType: marketDetails?.gtype,
          bettingName: marketDetails?.name,
          betPlaceIndex: po,
          mid: mid || data?.mid,
          teamName: teamName,
          runnerId: data?.id,
          matchBetType: marketDetails?.type,
          matchId: matchDetails?.id,
          selectionId: selectionId,
        },
        { ...data, type: marketDetails?.type }
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          cursor: loading ? "not-allowed" : "pointer",
          padding: { xs: "0px", lg: "0px", md: "0px" },
          width: { xs: "100%", lg: width ?? "20%" },
          height: "94%",
        }}
      >
        <Box
          onClick={handleRateClick}
          style={{ position: "relative" }}
          sx={{
            background: lock || [0, "0"].includes(value) ? "#FDF21A" : color,
            border:
              color != "white" ? "1px solid #2626264D" : "0px solid white",
            width: { lg: "99%", sm: "101%" },
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            cursor: !lock && value && value2 && "pointer",
          }}
        >
          {!lock && ![0, "0", null, undefined].includes(value) && (
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
              outline: "none",
            }}
          >
            <OddsPlaceBet
              handleClose={() => {
                setIsPopoverOpen(false);
              }}
              type={type}
            />
          </Box>
        </MUIModal>
      </Box>
    </>
  );
};

export default memo(SeparateModal);
