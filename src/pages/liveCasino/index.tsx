import { useMediaQuery, useTheme } from "@mui/material";
import LiveCasinoMobile from "../../components/LiveCasino/mobile";
import LiveCasinoDesktop from "../../components/LiveCasino/desktop";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { liveCasinoList } from "../../store/actions/card/cardDetail";

const LiveCasino = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch(liveCasinoList(""));
  }, []);

  return matchesMobile ? <LiveCasinoMobile /> : <LiveCasinoDesktop />;
};

export default LiveCasino;
