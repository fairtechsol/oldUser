import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FgLogo } from "../../assets";
import MatchesComponent from "../../components/MatchDetail/MatchOdds/index";
import { liveCasinoLogin } from "../../store/actions/card/cardDetail";
import {
  getMatchList,
  updateMatchRatesFromApiOnList,
} from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import {
  homeCasinoListIcons,
  liveCasinoGameList,
  marketApiConst,
} from "../../utils/Constants";
import "./style.scss";

const Inplay = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const { liveCasinoGame } = useSelector(
    (state: RootState) => state.card.cardDetail
  );
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

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
    getMatchListMarket("cricket");
    getMatchListMarket("tennis");
    getMatchListMarket("football");
    const intervalId = setInterval(() => {
      getMatchListMarket("cricket");
      getMatchListMarket("tennis");
      getMatchListMarket("football");
    }, 60000);

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
          <div className=" mt-2 casino-list">
            <div className="w-100 d-flex flex-row casino-list-item">
              {["mines", "aviator", "fun games", "color prediction"].map(
                (item: any) => (
                  <div
                    key={item}
                    style={{
                      maxWidth: "25%",
                      padding: 1,
                    }}
                    onClick={() =>
                      navigate("/liveCasino", {
                        state: {
                          key: item,
                        },
                      })
                    }
                  >
                    <img
                      src={homeCasinoListIcons[item]}
                      alt={item}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                )
              )}
            </div>
            <Grid container spacing={1} className="w-100">
              {liveCasinoGameList.map((item: any) => (
                <Grid xs={3} lg={2}  item>
                  <Link
                    to={item.url}
                    key={item?.name || item?.game_id}
                    className="casino-list-item"
                    onClick={() => {
                      // dispatch(betPlacedReset());
                    }}
                  >
                    <div className="w-100 d-inline-block casinoicons">
                      <img
                        src={item.url_thumb || item.imgSrc}
                        className=""
                        alt={item.game_name || item.name}
                        style={{ height: "120px", width: "100%" }}
                        onClick={() => {
                          if (!item?.url) {
                            handleModal(item);
                          }
                        }}
                      />
                      <div className="casino-name">
                        {item.game_name || item.name}
                      </div>
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>
      ) : (
        <>
          <Box sx={{ overflowX: "hidden", maxHeight: "45vh", width: "100%" }}>
            <MatchesComponent />
          </Box>
          <div className="w-100 tab-pane active casino-tables d-flex">
            <div>
              <div className="mt-2" style={{}}>
                <div className="w-100 d-flex flex-row flex-wrap casinoiconsm">
                  {["aviator", "mines", "fun games", "color prediction"].map(
                    (item: any) => (
                      <div
                        key={item}
                        style={{
                          maxWidth: "50%",
                          padding: "2px",
                        }}
                        onClick={() =>
                          navigate("/liveCasino", {
                            state: {
                              key: item,
                            },
                          })
                        }
                      >
                        <img
                          src={homeCasinoListIcons[item]}
                          alt={item}
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
                {liveCasinoGameList.map((item: any, index: number) => (
                  <div className="d-inline-block casinoiconsm">
                    <Link
                      to={item.url}
                      key={index}
                      // onClick={() => dispatch(betPlacedReset())}
                    >
                      <img
                        src={item.url_thumb || item.imgSrc}
                        // className="img-fluid"
                        alt={item.game_name || item.name}
                        style={{ height: "100px", width: "100%" }}
                        onClick={() => {
                          if (!item?.url) {
                            handleModal(item);
                          }
                        }}
                      />
                      <div className="mcasino-name">
                        {(item.game_name || item.name).length > 15
                          ? (item.game_name || item.name).slice(0, 15) + "..."
                          : item.game_name || item.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header
          // closeButton
          // closeVariant={"white"}
          style={{ color: "#fff", backgroundColor: "#004A25" }}
        >
          <Modal.Title className="w-100">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div
                className="d-flex flex-row align-items-center"
                onClick={() => {
                  // navigate("/home");
                  setShow(false);
                }}
              >
                <FaHome color="#fff" size={matchesMobile ? 20 : 40} />
                <img
                  src={FgLogo}
                  width={"auto"}
                  alt="fairGame"
                  style={{
                    margin: "5px 5px 0",
                    maxWidth: matchesMobile ? "150px" : "250px",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: "14px",
                }}
              >
                <div>
                  Balance:
                  <b>
                    {parseFloat(
                      profileDetail?.userBal?.currentBalance || 0
                    ).toFixed(2)}
                  </b>
                </div>
                <div>
                  <span className="white-text  cursor-pointer">
                    Exposure:
                    <b>
                      {parseInt(profileDetail?.userBal?.exposure) === 0
                        ? 0
                        : -parseFloat(
                            profileDetail?.userBal?.exposure || 0
                          ).toFixed(2)}
                    </b>
                  </span>
                </div>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="w-100 h-100">
            <iframe
              src={liveCasinoGame?.url}
              title="Live Stream"
              referrerPolicy={"strict-origin-when-cross-origin"}
              width={"100%"}
              height={"100%"}
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Inplay;
