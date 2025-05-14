import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CasinoGameProps } from "../../../interface/common";
import { homeCasinoListIcons } from "../../../utils/Constants";
import liveCasinoGameList from "../../../utils/liveCasinoGameList.json";

interface DesktopGameListProps {
  handleModal: (val: any) => void;
}

const DesktopGameList = ({ handleModal }: DesktopGameListProps) => {
  const navigate = useNavigate();
  return (
    <div className="mt-2 mx-1 casino-list">
      <div className="w-100 d-flex flex-row casino-list-item">
        {["mines", "aviator", "fun games", "color prediction"].map(
          (item: string, index: number) => (
            <div
              key={index}
              style={{
                maxWidth: "25%",
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
      <Grid container spacing={1} className="w-100">
        {liveCasinoGameList.map((item: CasinoGameProps, index: number) => (
          <Grid xs={3} lg={2} item key={index}>
            <Link
              to={item?.url || "#"}
              className="casino-list-item"
              onClick={() => {
                if (!item?.url) {
                  handleModal(item);
                }
              }}
            >
              <div className="w-100 d-inline-block casinoicons">
                <img
                  src={item.url_thumb || item.imgSrc}
                  alt={item.game_name || item.name || "casino icon"}
                  style={{ height: "120px", width: "100%" }}
                />
                <div className="casino-name">{item.game_name || item.name}</div>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DesktopGameList;
