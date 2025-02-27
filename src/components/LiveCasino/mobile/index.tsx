import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { Modal } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { liveCasinoLogin } from "../../../store/actions/card/cardDetail";
import { dt2020, FgLogo } from "../../../assets";
import Loader from "../../Loader";
import { Box } from "@mui/material";

const LiveCasinoMobile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { liveCasinoData, liveCasinoGame } = useSelector(
    (state: RootState) => state.card.cardDetail
  );

  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const initialType: any =
    liveCasinoData && Object.keys(liveCasinoData).length > 0
      ? Object.keys(liveCasinoData)[0]
      : null;

  const [list, setList] = useState<Record<string, any>>({});
  const [type, setType] = useState<string>("");
  const [type2, setType2] = useState<string>("");
  const [game, setGame] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (liveCasinoData && Object.keys(liveCasinoData).length > 0) {
      setList(liveCasinoData);
      setType(Object.keys(liveCasinoData)[0]);
      const firstKey = Object.keys(liveCasinoData[initialType])[0];
      setType2(Object.keys(liveCasinoData[initialType])[0]);
      const firstObject = liveCasinoData[initialType][firstKey];
      setGame(firstObject);
      setIsLoading(false);
    }
  }, [liveCasinoData]);

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
      <div className="w-100 d-flex flex-row">
        {Object.keys(data2)?.map((item: any, index: number) => {
          const isActive = item === type2 ? true : false;
          return (
            <div
              key={index}
              onClick={() => {
                setGame(data2[item]);
                setType2(item);
              }}
              className="w-100 d-flex justify-content-center align-items-center py-2 px-3 title-14 fbold text-white"
              style={{
                cursor: "pointer",
                backgroundColor: isActive ? "#004A25" : "",
              }}
            >
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
  // const GameScreen = ({ data4 }: { data4: any }) => {
  //   return (
  //     <div className="d-flex flex-column mt-1 position-absolute" style={{width:"100vw",height:"vh"}}>
  //       <div className="w-100 d-flex flex-row justify-content-between align-items-center px-1 py-2 bg-primary text-white">
  //         <span>{gameData?.game_name}</span>
  //         <div className="fbold" onClick={() => setIsShow(false)}>
  //           EXIT
  //         </div>
  //       </div>
  //       <div className="w-100" style={{ height: "80vh" }}>
  //         <iframe
  //           src={data4?.url}
  //           title="Live Stream"
  //           referrerPolicy={"strict-origin-when-cross-origin"}
  //           width={"100%"}
  //           height={"100%"}
  //         ></iframe>
  //       </div>
  //     </div>
  //   );
  // };
  const handleParent = (key: any) => {
    setType(key);
    const firstKey = Object.keys(liveCasinoData[key])[0];
    setType2(firstKey);
    setGame(liveCasinoData[key][firstKey]);
  };
  return (
    <>
      <div className="w-100 d-flex flex-column gap-2 ">
        <div className="w-100 d-flex man-tab px-6 bg-secondary">
          {Object.keys(list)?.map((key, index) => {
            const isActive = type === key;
            return (
              <>
                <Box
                  key={index}
                  onClick={() => handleParent(key)}
                  className={`w-100 d-flex justify-content-center px-3 align-items-center fbold py-2`}
                  sx={{
                    color: isActive ? "#000" : "white",
                    cursor: "pointer",
                    backgroundColor: isActive ? "#FDCB52" : "",
                    fontWeight: isActive ? "bold" : "",
                    fontSize: "14px",
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
        </div>
      </div>
      <Box
        className="d-flex flex-column"
        sx={{
          overflowX: "auto",
          flexWrap: "nowrap",
          backgroundColor: "#0088cca5",
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
                  // navigate("/home");
                  setIsShow(false);
                }}
              >
                <FaHome color="#fff" size={20} />
                <img
                  src={FgLogo}
                  width={"auto"}
                  height="27px"
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

export default LiveCasinoMobile;
