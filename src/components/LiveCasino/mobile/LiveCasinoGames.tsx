import { dt2020 } from "../../../assets";

const LiveCasinoGames = ({ data3, handleGame }: any) => {
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

export default LiveCasinoGames;
