import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { dt2020, FgLogo } from "../../../assets";
import { liveCasinoLogin } from "../../../store/actions/card/cardDetail";
import { AppDispatch, RootState } from "../../../store/store";
import { liveCasinoPics } from "../../../utils/Constants";
import Loader from "../../Loader";

const LiveCasinoMobile = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const { liveCasinoData, liveCasinoGame } = useSelector(
    (state: RootState) => state.card.cardDetail
  );

  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const [list, setList] = useState<Record<string, any>>({});
  const [type, setType] = useState<string>("");
  const [type2, setType2] = useState<string>("");
  const [game, setGame] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [casinoType, setCasinoType] = useState("casino");

  const handleParent = (key: string, secKey: string, casinoType: string) => {
    const casinoData =
      casinoType === "casino"
        ? liveCasinoData?.casino
        : liveCasinoData?.intCasino;
    if (!casinoData?.[key]) return;

    setList(casinoData);
    setType(key);

    const firstKey =
      key === "All" ? Object.keys(casinoData[key] || {})[0] : "All";
    const selectedKey = secKey || firstKey;

    setType2(selectedKey);
    setGame(casinoData[key]?.[selectedKey]);
  };

  const handleCasinoType = (key: string) => {
    setCasinoType(key);
    handleParent(
      Object.keys(
        key === "casino" ? liveCasinoData?.casino : liveCasinoData?.intCasino
      )[0],
      "",
      key
    );
  };

  useEffect(() => {
    if (!liveCasinoData) return;

    const isCasino = casinoType === "casino";
    const casinoData = isCasino
      ? liveCasinoData?.casino
      : liveCasinoData?.intCasino;

    if (!casinoData || Object.keys(casinoData).length === 0) return;

    const initialType = Object.keys(casinoData)[0];
    const firstKey = isCasino
      ? "All"
      : Object.keys(casinoData[initialType] || {})[0];
    const firstObject = casinoData[initialType]?.[firstKey];

    setList(casinoData);
    setType(initialType);
    setType2(firstKey);
    setGame(firstObject);
    setIsLoading(false);
  }, [liveCasinoData, casinoType]);

  useEffect(() => {
    if (
      state?.key &&
      liveCasinoData &&
      Object.keys(liveCasinoData).length > 0
    ) {
      setCasinoType("intCasino");
      handleParent("All", state.key, "intCasino");
    }
  }, [state, liveCasinoData]);

  if (isLoading) {
    return (
      <div className="w-100 d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  const handleGame = (data: any) => {
    let payLoad: any = {
      gameId: data?.game_id,
      platformId: "mobile",
      providerName: data?.provider_name,
    };
    dispatch(liveCasinoLogin(payLoad));
    setIsShow(true);
  };
  const LiveCasinoTab = ({ data2 }: { data2: any }) => {
    return (
      <div className="w-100 d-flex flex-row overflow-auto">
        {Object.keys(data2)
          ?.sort((a, b) => {
            if (a === "All") return -1;
            if (b === "All") return 1;
            return 0;
          })
          ?.map((item: any, index: number) => {
            const isActive = item === type2 ? true : false;
            return (
              <div
                key={index}
                onClick={() => {
                  setGame(data2[item]);
                  setType2(item);
                }}
                className="w-100 d-flex flex-column justify-content-center align-items-center py-2 px-3 title-14 fbold"
                style={{
                  cursor: "pointer",
                  backgroundColor: isActive ? "#004A25" : "",
                  whiteSpace: "nowrap",
                  color: !isActive ? "#000" : "#fff",
                  fontWeight: isActive ? "bold" : "",
                  borderRight: "1px solid #000",
                }}
              >
                <img
                  src={liveCasinoPics[item]}
                  alt="abc"
                  style={{
                    height: 30,
                    width: 30,
                    filter: isActive
                      ? "invert(98%) sepia(0%) saturate(0%) hue-rotate(290deg) brightness(104%) contrast(101%)"
                      : "",
                  }}
                />
                {item}
              </div>
            );
          })}
      </div>
    );
  };
  const LiveCasinoGames = ({ data3 }: { data3: any }) => {
    return (
      <div
        className="w-100 d-flex flex-row flex-wrap mt-1 ms-1"
        style={{ gap: "8px" }}
      >
        {data3?.map((item: any, index: number) => {
          return (
            <img
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = dt2020;
              }}
              key={index}
              src={item?.url_thumb}
              className="img-fluid"
              alt={item?.game_name}
              loading="lazy"
              style={{ width: "calc(50% - 10px)", height: "14vh" }}
              onClick={() => handleGame(item)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Box
        className="d-flex flex-row"
        sx={{
          overflowX: "auto",
          flexWrap: "nowrap",
          backgroundColor: "#bbbbbb",
          whiteSpace: "nowrap",
          overflow: "auto",
          textOverflow: "ellipsis",
          padding: "0px 10px",
          width: "100%",
        }}
      >
        {[
          { id: "casino", val: "Casino" },
          { id: "intCasino", val: "Live Casino" },
        ]?.map((key, index) => {
          const isActive = casinoType === key.id;
          return (
            <>
              <Box
                key={index}
                onClick={() => handleCasinoType(key.id)}
                className={`w-100 d-flex justify-content-center px-3 align-items-center fbold py-2`}
                sx={{
                  color: isActive ? "#fff" : "#000",
                  cursor: "pointer",
                  backgroundColor: isActive ? "#004A25" : "",
                  fontWeight: isActive ? "bold" : "",
                  fontSize: "14px",
                  borderRight: "1px solid #000",
                  borderBottom: "1px solid #000",
                  height: "3rem",
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                {key.val}
              </Box>
            </>
          );
        })}
      </Box>
      <Box
        className="d-flex flex-row"
        sx={{
          overflowX: "auto",
          flexWrap: "nowrap",
          backgroundColor: "#bbbbbb",
          whiteSpace: "nowrap",
          overflow: "auto",
          textOverflow: "ellipsis",
          padding: "0px 10px",
          width: "100%",
        }}
      >
        {Object.keys(list)?.map((key, index) => {
          const isActive = type === key;
          return (
            <>
              <Box
                key={index}
                onClick={() => handleParent(key, "", casinoType)}
                className={`w-100 d-flex justify-content-center px-3 align-items-center fbold py-2`}
                sx={{
                  color: isActive ? "#fff" : "#000",
                  cursor: "pointer",
                  backgroundColor: isActive ? "#004A25" : "",
                  fontWeight: isActive ? "bold" : "",
                  fontSize: "14px",
                  borderRight: "1px solid #000",
                  borderBottom: "1px solid #000",
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                {key}
              </Box>
            </>
          );
        })}
      </Box>
      <Box
        className="d-flex flex-column"
        sx={{
          overflowX: "auto",
          flexWrap: "nowrap",
          backgroundColor: "#bbbbbb",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "0px 10px",
          width: "100%",
        }}
      >
        <LiveCasinoTab data2={list[type]} />
      </Box>
      <LiveCasinoGames data3={game ?? []} />
      <Modal show={isShow} fullscreen={true} onHide={() => setIsShow(false)}>
        <Modal.Header
          // closeButton
          className="p-2"
          style={{ color: "#fff", backgroundColor: "#004A25" }}
        >
          <Modal.Title className="w-100">
            <div className="w-100 d-flex justify-content-between align-items-center lh-1">
              <div
                className="d-flex flex-row align-items-center"
                onClick={() => {
                  setIsShow(false);
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
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LiveCasinoMobile;
