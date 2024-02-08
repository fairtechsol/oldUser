import { Box } from "@mui/system";
import { FASTTIME } from "../../../assets";
import { memo } from "react";
import LiveMarket from "../Common/LiveMarket";




const FastTime = ({
  data,
  setShowFastTimeBox,
  session,
  setFastAmount,
  setPlaceBetData,
  typeOfBet,
  data1,
  setSelectedItem,
  selectedItem,
}:any) => {
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
          onClick={() => {
            if (setPlaceBetData !== undefined) {
              setPlaceBetData(null);
            }
            if (selectedItem == data1?.id) {
              setShowFastTimeBox((prev: any) => !prev);
            } else {
              setShowFastTimeBox(true);
              setSelectedItem(data1?.id);
            }
          }}
        />
      )}
    </Box>
  );
};

export default memo(FastTime);

