import { Box } from "@mui/material";
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

const LiveCasinoDesktop = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
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

  const handleParent = (key: string, secKey: string) => {
    const isCasino = location.pathname.includes("/casino");
    const casinoData = isCasino
      ? liveCasinoData?.casino
      : liveCasinoData?.intCasino;

    if (!casinoData?.[key]) return;

    const firstKey =
      key === "All" ? Object.keys(casinoData[key] || {})[0] : "All";
    const selectedKey = secKey || firstKey;

    setType(key);
    setType2(selectedKey);
    setGame(casinoData[key]?.[selectedKey]);
  };

  useEffect(() => {
    if (!liveCasinoData) return;

    const isCasino = location.pathname.includes("/casino");
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
  }, [liveCasinoData, location]);

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
      platformId: "desktop",
      providerName: data?.provider_name,
    };
    dispatch(liveCasinoLogin(payLoad));
    setIsShow(true);
  };

  const LiveCasinoTab = ({ data2 }: { data2: any }) => {
    return (
      <div
        className="d-flex flex-row"
        style={{
          // width: "100%",
          backgroundColor: "#bbbbbb",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "0px 2px",
          overflowX: "auto",
          flexWrap: "nowrap",
        }}
      >
        {Object.keys(data2)
          ?.sort((a, b) => {
            if (a === "All") return -1;
            if (b === "All") return 1;
            return 0;
          })
          ?.map((item: any, index: number) => {
            const isActive = item === type2 ? true : false;
            return (
              <>
                <Box
                  key={index}
                  onClick={() => {
                    setGame(data2[item]);
                    setType2(item);
                  }}
                  className="d-flex justify-content-center flex-column align-items-center py-1 px-2"
                  sx={{
                    cursor: "pointer",
                    backgroundColor: isActive ? "#004A25" : "",
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
                </Box>
              </>
            );
          })}
      </div>
    );
  };
  const LiveCasinoGames = ({ data3 }: { data3: any }) => {
    return (
      <div
        className="w-100 d-flex flex-row flex-wrap mt-1 cursor-pointer"
        style={{ gap: "10px" }}
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
              style={{ width: "calc(16.66% - 10px)", height: "10vh" }}
              onClick={(e) => {
                e.stopPropagation();
                handleGame(item);
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="w-100 d-flex flex-column mt-1 gap-2 px-2">
        <div
          className="w-100 d-flex flex-row"
          style={{
            backgroundColor: "#bbbbbb",
          }}
        >
          {Object.keys(list)?.map((key, index) => {
            const isActive = type === key;
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 1,
                  px: 2,
                  fontSize: "14px",
                  color: isActive ? "#fff" : "#000",
                  cursor: "pointer",
                  backgroundColor: isActive ? "#004A25" : "",
                  fontWeight: isActive ? "bold" : "",
                  borderRight: "1px solid #000",
                }}
                onClick={() => handleParent(key, "")}
              >
                {key}
              </Box>
            );
          })}
        </div>

        <div className="d-flex flex-column" style={{ width: "100%" }}>
          <LiveCasinoTab data2={list[type]} />
          <LiveCasinoGames data3={game ?? []} />
        </div>
      </div>
      <Modal show={isShow} fullscreen={true} onHide={() => setIsShow(false)}>
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
                  setIsShow(false);
                }}
              >
                <FaHome color="#fff" size={40} />
                <img
                  src={FgLogo}
                  width={"auto"}
                  alt="fairGame"
                  style={{
                    margin: "5px 5px 0",
                    maxWidth: "250px",
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

export default LiveCasinoDesktop;
