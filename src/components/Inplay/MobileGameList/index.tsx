import { Link, useNavigate } from "react-router-dom";
import { CasinoGameProps } from "../../../interface/common";
import { MobileGameListProps } from "../../../interface/common/MatchesComponent";
import { homeCasinoListIcons } from "../../../utils/Constants";
import liveCasinoGameList from "../../../utils/liveCasinoGameList.json";

const MobileGameList = ({ handleModal }: MobileGameListProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-100 tab-pane active casino-tables d-flex">
      <div className="mt-2 mx-1">
        <div className="w-100 d-flex flex-row flex-wrap casinoiconsm">
          {["aviator", "mines", "fun games", "color prediction"].map(
            (item: any, index: number) => (
              <div
                key={index}
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
                  alt={item || "casino icon"}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            )
          )}
        </div>
        {liveCasinoGameList.map((item: CasinoGameProps, index: number) => (
          <div
            className="d-inline-block casinoiconsm"
            style={{
              padding: "2px",
            }}
            key={index}
          >
            <Link to={item.url || "#"} style={{}}>
              <img
                src={item.url_thumb || item.imgSrc}
                alt={item.game_name || item.name || "casino icon"}
                style={{ height: "100px", width: "100%" }}
                onClick={() => {
                  if (!item?.url) {
                    handleModal(item);
                  }
                }}
              />
              <div className="mcasino-name">
                {(item?.game_name).length > 15
                  ? (item?.game_name).slice(0, 15) + "..."
                  : item?.game_name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileGameList;
