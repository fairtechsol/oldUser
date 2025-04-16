import { Box } from "@mui/material";
import { memo } from "react";
import { liveCasinoPics } from "../../../utils/Constants";

interface LiveCasinoTabProps {
  data2: any;
  type2: string;
  setGame: (val: any) => void;
  setType2: (val: any) => void;
}

const LiveCasinoTab = ({
  data2,
  type2,
  setGame,
  setType2,
}: LiveCasinoTabProps) => {
  return (
    <Box
      className="d-flex flex-row"
      sx={{
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
                alt="casino pic"
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
          );
        })}
    </Box>
  );
};

export default memo(LiveCasinoTab);
