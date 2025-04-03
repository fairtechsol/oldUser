import { Box } from "@mui/material";
import { dt2020 } from "../../../assets";

const LiveCasinoGames = ({ data3, handleGame, width, gap }: any) => {
  return (
    <Box
      className={`w-100 d-flex flex-row flex-wrap mt-2 cursor-pointer justify-content-between p-auto`}
      style={{ gap: gap }}
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
            style={{ width: width, height: "12.5vh" }}
            onClick={(e) => {
              e.stopPropagation();
              handleGame(item);
            }}
          />
        );
      })}
    </Box>
  );
};

export default LiveCasinoGames;
