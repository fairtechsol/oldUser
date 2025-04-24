import { Box, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CasinoModal from "../../components/Inplay/CasinoModal";
import DesktopGameList from "../../components/Inplay/DesktopGameList";
import MobileGameList from "../../components/Inplay/MobileGameList";
import MatchesComponent from "../../components/MatchDetail/MatchOdds/index";
import { liveCasinoLogin } from "../../store/actions/card/cardDetail";
import {
  getMatchList,
  updateMatchRatesFromApiOnList,
} from "../../store/actions/match/matchListAction";
import { AppDispatch } from "../../store/store";
import { marketApiConst } from "../../utils/Constants";
import "./style.scss";

const Inplay = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleModal = (data: any) => {
    if (data?.game_id) {
      let payLoad: any = {
        gameId: data?.game_id,
        platformId: "desktop",
        providerName: data?.provider_name,
      };
      dispatch(liveCasinoLogin(payLoad));
      setShow(true);
    }
  };

  const getMatchListMarket = async (matchType: string) => {
    try {
      const resp: any = await axios.get(marketApiConst[matchType], {
        timeout: 2000,
      });
      if (resp?.status) {
        dispatch(updateMatchRatesFromApiOnList(resp?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("jwtUser")) {
      dispatch(getMatchList({}));
    }
  }, [sessionStorage]);

  useEffect(() => {
    setTimeout(() => {
      getMatchListMarket("cricket");
      getMatchListMarket("tennis");
      getMatchListMarket("football");
    }, 1500);
    const intervalId = setInterval(() => {
      getMatchListMarket("cricket");
      getMatchListMarket("tennis");
      getMatchListMarket("football");
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {!matchesMobile ? (
        <Box
          sx={{
            display: "flex",
            overflowX: "hidden",
            flexDirection: "column",
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
            overflowY: "auto",
            alignItems: "flex-start",
          }}
        >
          <div style={{ height: "1vh" }} />
          <Box sx={{ overflowX: "hidden", maxHeight: "45vh", width: "100%" }}>
            <MatchesComponent />
          </Box>
          <DesktopGameList handleModal={handleModal} />
        </Box>
      ) : (
        <>
          <Box sx={{ overflowX: "hidden", maxHeight: "45vh", width: "100%" }}>
            <MatchesComponent />
          </Box>
          <MobileGameList handleModal={handleModal} />
        </>
      )}

      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <CasinoModal setShow={setShow} />
      </Modal>
    </>
  );
};

export default memo(Inplay);
