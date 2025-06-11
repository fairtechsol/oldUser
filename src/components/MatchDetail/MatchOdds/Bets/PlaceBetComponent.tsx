import { Box, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDecimalAmount } from "../../../../helper";
import { PlaceBetComponentProps } from "../../../../interface/common/GameDetail";
import { getRunAmount } from "../../../../store/actions/betPlace/betPlaceActions";
import { AppDispatch, RootState } from "../../../../store/store";
import { sessionBettingType } from "../../../../utils/Constants";
import RunsDropDown from "./RunsDropDown";

const PlaceBetComponent = ({
  profitLoss,
  data,
  show,
  setShow,
  hideCount = false,
  index,
}: PlaceBetComponentProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [proLoss, setProfitLoss] = useState(profitLoss);
  const { runAmount } = useSelector((state: RootState) => state.bets);

  useEffect(() => {
    if (profitLoss) {
      setProfitLoss(profitLoss);
    }
  }, [profitLoss]);

  const handleClick = useCallback(() => {
    if (!show?.open && show?.id !== data?.id) {
      dispatch(getRunAmount({ id: data?.id, matchId: data?.matchId }));
      setShow({ open: true, id: data?.id });
    } else {
      setShow({ open: false, id: "" });
    }
  }, [show, data?.id, dispatch, setShow]);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        onClick={handleClick}
        sx={{
          background: "#0B4F26",
          position: "absolute",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          right: { xs: "40vw", lg: "41vw", md: "41vw" },
          justifyContent: "center",
          width: { lg: "90px", xs: "60px", md: "90px" },
          borderRadius: "5px",
          height: "35px",
          cursor: "pointer",
          zIndex: 100,
        }}
      >
        {!hideCount && (
          <Box
            sx={{
              background: "#FDF21A",
              borderRadius: "3px",
              width: "90%",
              height: "45%",
              zIndex: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "10px", xs: "8px" },
                fontWeight: "bold",
                color: "#FF4D4D",
              }}
            >
              Total Bet :{" "}
              <span style={{ color: "#0B4F26" }}>
                {" "}
                {proLoss?.totalBet < 10 ? 0 : ""}
                {proLoss?.totalBet || 0}
              </span>
            </Typography>
          </Box>
        )}
        <Box sx={{ zIndex: 100, display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              marginTop: "2px",
              fontSize: {
                lg: !profitLoss?.maxLoss ? "8px" : "8px",
                md: !profitLoss?.maxLoss ? "8px" : "8px",
                xs: !profitLoss?.maxLoss ? "8px" : "8px",
              },
              fontWeight: !profitLoss?.maxLoss ? "500" : "500",
              color: "white",
            }}
          >
            {data?.type == sessionBettingType.cricketCasino &&
            profitLoss?.profitLoss
              ? profitLoss?.profitLoss?.[index]
              : !profitLoss?.maxLoss
              ? "Profit/Loss"
              : handleDecimalAmount(profitLoss?.maxLoss, "")}
          </Typography>
        </Box>
      </Box>
      {show?.open &&
        show?.id === data?.id &&
        ![
          sessionBettingType?.oddEven,
          sessionBettingType.fancy1,
          sessionBettingType.cricketCasino,
        ].includes(data?.type) && (
          <RunsDropDown list={runAmount && runAmount?.runAmount} />
        )}
    </Box>
  );
};

export default memo(PlaceBetComponent);
