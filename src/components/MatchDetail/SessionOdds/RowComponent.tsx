import { Box } from "@mui/material";
import SingleBox from "./SingleBox";
// import { RootState } from "../../../store/store";
// import { useSelector } from "react-redux";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { formatToINR } from "../../../helper";

const RowComponent = ({ header, data, match }: any) => {
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
    } else if (data?.betType === "BACK" || data?.betType == "YES") {
      // return "#00C0F9";
      return "#CEEBFF";
    } else if (data?.betType === "LAY" || data?.betType == "NO") {
      // return "#FF9292";
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
        // marginTop: "1px"
        marginBottom: { xs: "1px", lg: "1px" },
      }}
    >
      {!header && (
        <>
          <SingleBox
            color={getColor}
            data={data?.teamName}
            first={true}
            header={header}
            time={getTime(data.createdAt)}
            isCommissionActive={data?.isCommissionActive}
          />
          {!state?.matchId && (
            <SingleBox
              color={getColor()}
              data={data?.match?.title || match}
              header={header}
            />
          )}
          <SingleBox
            color={getColor()}
            data={+data?.odds}
            rate={+data?.rate}
            header={header}
            isPercent={true}
          />
          <SingleBox
            color={getColor()}
            data={
              data?.marketType === "oddEven"
                ? data?.teamName
                    ?.match(/[-_](odd|even)$/i)?.[1]
                    ?.toUpperCase() || data?.betType
                : data?.betType
            }
            header={header}
          />
          <SingleBox
            color={getColor()}
            data={formatToINR(data?.amount)}
            header={header}
          />
        </>
      )}
      {header && (
        <>
          <SingleBox
            color={getColor}
            data={data[0]}
            first={true}
            header={header}
          />
          {!state?.matchId && (
            <SingleBox color={getColor()} data={data[1]} header={header} />
          )}
          <SingleBox color={getColor()} data={data[2]} header={header} />
          <SingleBox color={getColor()} data={data[3]} header={header} />
          <SingleBox color={getColor()} data={data[4]} header={header} />
          {/* <SingleBox color={getColor()} data={data[4]} header={header} /> */}
        </>
      )}
    </Box>
  );
};

export default RowComponent;
