import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LiveCasinoDesktop from "../../components/LiveCasino/desktop";
import LiveCasinoMobile from "../../components/LiveCasino/mobile";
import { liveCasinoList } from "../../store/actions/card/cardDetail";
import { AppDispatch } from "../../store/store";

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
