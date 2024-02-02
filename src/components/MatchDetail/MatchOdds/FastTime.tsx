import { Box } from "@mui/system";
import { FASTTIME } from "../../../assets";

import { memo } from "react";
import Match from "./Match";

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
      {!data && (
        <img style={{ width: "30px", height: "30px" }} src={FASTTIME} />
      )}
    </Box>
  );
};

export default memo(FastTime);
