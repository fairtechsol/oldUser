import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UD } from "../../../../assets";
import { getRunAmount } from "../../../../store/actions/betPlace/betPlaceActions";
import { AppDispatch, RootState } from "../../../../store/store";
import RunsDropDown from "./RunsDropDown";
import { formatToINR } from "../../../../helper";
// import useOuterClick from "../../../../utils/outerClick";

const PlaceBetComponentWeb = ({ profitLoss, data, show, setShow, color }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { runAmount } = useSelector((state: RootState) => state.bets);
  const [proLoss, setProfitLoss] = useState(profitLoss);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const innerRef = useOuterClick((ev: any) => {
  //   setShow({ open: false, id: "" });
  // });
  const handleNumber=(num:any)=>{
    let value :any = num?.toString()?.split('.')
    return(
      value?.length > 0 ? 
        <>
         <span style={{color:color}}>{formatToINR(value[0])}.</span>
         <span  style={{fontSize:"0.8em",color:color}}>{value[1]}</span>
        </> : null
    )
  }

  useEffect(() => {
    if (profitLoss) {
      setProfitLoss(profitLoss);
    }
  }, [profitLoss]);
  return (
    <>
      <Box
        // ref={innerRef}
        onClick={() => {
          if (!show.open && show?.id !== data?.id) {
            dispatch(getRunAmount(data?.id));
            setShow({ open: true, id: data?.id });
          } else setShow({ open: false, id: "" });
        }}
        sx={{
          background: "#0B4F26",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          paddingX: ".2vw",
          top: "3px",
          width: { lg: "10vw" },
          borderRadius: "5px",
          height: "32px",
          right: "8px",
          position: "absolute",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            background: "#FDF21A",
            borderRadius: "3px",
            width: "45%",
            height: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: ".5vw" },
              fontWeight: "bold",
              color: "#FF4D4D",
            }}
          >
            Total Bet
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: ".5vw" },
              fontWeight: "bold",
              color: "#0B4F26",
            }}
          >
            {proLoss?.totalBet < 10 ? 0 : ""}
            {proLoss?.totalBet || 0}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                lg: !profitLoss?.maxLoss ? ".65vw" : ".65vw",
              },
              fontWeight: !profitLoss?.maxLoss ? "bold" : "bold",
              color: "white",
            }}
          >
            {!profitLoss?.maxLoss ? "Profit/Loss" : handleNumber(profitLoss?.maxLoss)}
          </Typography>
          <img
            src={UD}
            style={{ width: "12px", height: "12px", marginLeft: "5px" }}
            alt=""
          />
        </Box>
        {show?.open && show?.id === data?.id && (
          <RunsDropDown
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            list={runAmount && runAmount?.runAmount}
            // list={profitLoss?.betData}
            handleClose={handleClose}
          />
        )}
      </Box>
    </>
  );
};

export default PlaceBetComponentWeb;
