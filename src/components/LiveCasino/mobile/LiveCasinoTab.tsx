import { liveCasinoPics } from "../../../utils/Constants";

const LiveCasinoTab = ({ data2, type2, setGame, setType2 }: any) => {
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

export default LiveCasinoTab;
