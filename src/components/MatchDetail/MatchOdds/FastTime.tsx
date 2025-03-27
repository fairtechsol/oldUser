import { Box } from "@mui/system";
import { memo } from "react";
import { FASTTIME } from "../../../assets";
import LiveMarket from "../Common/LiveMarket";

const FastTime = ({
  data,
  setShowFastTimeBox,
  session,
  setFastAmount,
  typeOfBet,
}: any) => {
  return (
    <Box
      title="Faster Bet"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        cursor: "pointer",
        width: "60%",
      }}
    >
      {data ? (
        <LiveMarket
          onClick={() => {
            if (session === "sessionOdds") {
              setFastAmount((prev: any) => ({ ...prev, sessionOdds: 0 }));
            } else if (session === "manualBookMaker") {
              setFastAmount((prev: any) => ({ ...prev, [typeOfBet]: 0 }));
            } else if (session === "bookmaker") {
              setFastAmount((prev: any) => ({ ...prev, bookMaker: 0 }));
            }
          }}
          title={data}
          boxStyle={{
            backgroundColor: "transparent",
            borderRadius: "3px",
            fontSize: "22px",
            justifyContent: "center",
            cursor: "pointer",
            alignItems: "center",
          }}
        />
      ) : (
        " "
      )}
      {!data && (
        <img
          style={{ width: "30px", height: "30px" }}
          src={FASTTIME}
          alt=""
          onClick={() => {
            setShowFastTimeBox((prev: boolean) => !prev);
          }}
        />
      )}
    </Box>
  );
};

export default memo(FastTime);
