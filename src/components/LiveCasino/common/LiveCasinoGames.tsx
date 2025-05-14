import { Box } from "@mui/material";
import { memo } from "react";
import { dt2020 } from "../../../assets";
import { LiveCasinoGamesProps } from "../../../interface/liveCasino";

const LiveCasinoGames = ({
  data3,
  handleGame,
  width,
  gap,
}: LiveCasinoGamesProps) => {
  return (
    <Box
      className="w-100 d-flex flex-row flex-wrap mt-2 cursor-pointer"
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

export default memo(LiveCasinoGames);
