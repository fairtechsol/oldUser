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

const LiveCasinoDesktop = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const { liveCasinoData } = useSelector(
    (state: RootState) => state.card.cardDetail
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

  useEffect(() => {
    if (
      state?.key &&
      liveCasinoData &&
      Object.keys(liveCasinoData).length > 0
    ) {
      handleParent("All", state.key);
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
      platformId: "desktop",
      providerName: data?.provider_name,
    };
    dispatch(liveCasinoLogin(payLoad));
    setIsShow(true);
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
          <LiveCasinoTab
            data2={list[type]}
            type2={type2}
            setGame={setGame}
            setType2={setType2}
          />
          <LiveCasinoGames data3={game ?? []} handleGame={handleGame} />
        </div>
      </div>
      <LiveCasinoModal isShow={isShow} setIsShow={setIsShow} />
    </>
  );
};

export default LiveCasinoDesktop;
