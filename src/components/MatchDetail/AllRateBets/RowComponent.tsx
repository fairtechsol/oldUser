import { Box } from "@mui/material";
import moment from "moment";
import { memo } from "react";
import { useLocation } from "react-router-dom";
import { formatToINR } from "../../../helper";
import SingleBox from "./SingleBox";

interface RowComponentProps {
  header: boolean;
  data: any;
}

const RowComponent = ({ header, data }: RowComponentProps) => {
  const { state } = useLocation();

  const getTime = (date: any) => {
    const timeString = moment
      .utc(date)
      .utcOffset("+05:30")
      .format("hh:mm:ss A");
    return timeString;
  };
  const getColor = () => {
    if (header) {
      return "black";
    } else if (data?.betType === "BACK" || data?.betType === "YES") {
      return "#CEEBFF";
    } else if (data?.betType === "LAY" || data?.betType === "NO") {
      return "#F2CBCB";
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: header ? "25px" : "40px",
        background: "white",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        gap: "1px",
        marginBottom: { xs: "1px", lg: "1px" },
      }}
    >
      {!header && (
        <>
          <div style={{ width: !state?.matchId ? "23.5%" : "33.137%" }}>
            <SingleBox
              color={getColor}
              data={data?.bettingName || data?.marketType}
              first={true}
              header={header}
              isCommissionActive={data?.isCommissionActive}
            />
          </div>
          <div style={{ width: !state?.matchId ? "17%" : "23.137%" }}>
            <SingleBox
              time={getTime(data.createdAt)}
              color={getColor()}
              data={data.teamName}
              up={true}
              header={header}
            />
          </div>
          {!state?.matchId && (
            <div style={{ width: "23.5%" }}>
              <SingleBox
                color={getColor()}
                data={data?.match?.title || data?.eventName}
                header={header}
              />
            </div>
          )}
          <div style={{ width: !state?.matchId ? "12%" : "16.55%" }}>
            <SingleBox
              color={getColor()}
              data={data?.bet_type || data?.betType}
              header={header}
            />
          </div>
          <div style={{ width: !state?.matchId ? "12%" : "16.55%" }}>
            <SingleBox color={getColor()} data={data?.odds} header={header} />
          </div>
          <div style={{ width: !state?.matchId ? "12%" : "16.55%" }}>
            <SingleBox
              color={getColor()}
              data={formatToINR(data?.amount)}
              header={header}
            />
          </div>
        </>
      )}
      {header && (
        <>
          <SingleBox
            color={getColor}
            data={data[0]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data[1]}
            header={header}
            boxWidth="70%"
          />
          {!state?.matchId && (
            <SingleBox
              color={getColor()}
              data={data[2]}
              header={header}
              boxWidth="100%"
            />
          )}
          <SingleBox
            color={getColor()}
            data={data[3]}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={data[4]}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={data[5]}
            header={header}
            boxWidth="50%"
          />
        </>
      )}
    </Box>
  );
};

export default memo(RowComponent);
