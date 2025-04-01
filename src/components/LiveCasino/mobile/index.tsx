import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { liveCasinoLogin } from "../../../store/actions/card/cardDetail";
import { AppDispatch, RootState } from "../../../store/store";
import Loader from "../../Loader";
import LiveCasinoGames from "./LiveCasinoGames";
import LiveCasinoModal from "./LiveCasinoModal";
import LiveCasinoTab from "./LiveCasinoTab";

const LiveCasinoMobile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const { liveCasinoData } = useSelector(
    (state: RootState) => state.card.cardDetail
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
        <LiveCasinoTab
          data2={list[type]}
          type2={type2}
          setGame={setGame}
          setType2={setType2}
        />
      </Box>
      <LiveCasinoGames data3={game ?? []} handleGame={handleGame} />
      <LiveCasinoModal isShow={isShow} setIsShow={setIsShow} />
    </>
  );
};

export default LiveCasinoMobile;
