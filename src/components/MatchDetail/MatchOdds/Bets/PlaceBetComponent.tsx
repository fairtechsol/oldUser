import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { getRunAmount } from "../../../../store/actions/betPlace/betPlaceActions";
import { useState } from "react";
import RunsDropDown from "./RunsDropDown";
import { AppDispatch, RootState } from "../../../../store/store";
import { useSelector } from "react-redux";

const PlaceBetComponent = ({ profitLoss, data, show, setShow }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [proLoss, setProfitLoss] = useState(profitLoss);
  const { runAmount } = useSelector((state: RootState) => state.bets);
  const [anchorEl] = useState(null);
  // const handleClick = (event:any) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const [show, setShow] = React.useState(false);

  useEffect(() => {
    if (profitLoss) {
      setProfitLoss(profitLoss);
    }
  }, [profitLoss]);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        onClick={() => {
          if (!show.open && show?.id !== data?.id) {
            dispatch(getRunAmount(data?.id));
            setShow({ open: true, id: data?.id });
          } else setShow({ open: false, id: "" });
        }}
        sx={{
          background: "#0B4F26",
          position: "absolute",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          right: { xs: "43vw", lg: "41vw", md: "41vw" },
          justifyContent: "center",
          width: { lg: "90px", xs: "60px", md: "90px" },
          borderRadius: "5px",
          height: "35px",

          zIndex: 100,
        }}
      >
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
        <Box sx={{ zIndex: 100, display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              marginTop: "2px",
              fontSize: {
                lg: !profitLoss?.maxLoss ? "8px" : "8px",
                md: !profitLoss?.maxLoss ? "8px" : "8px",
                xs: !profitLoss?.maxLoss ? "8px" : "8px",
              },
              fontWeight: !profitLoss?.profitLoss?.max_loss ? "500" : "500",
              color: "white",
            }}
          >
            {!profitLoss?.maxLoss ? "Profit/Loss" : profitLoss?.maxLoss}
          </Typography>
        </Box>
      </Box>
      {show.open && show?.id === data?.id && (
        <RunsDropDown
          style={{ zIndex: 10 }}
          list={runAmount && runAmount}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          //   handleClose={handleClose}
        />
      )}
    </Box>
  );
};

export default PlaceBetComponent;
