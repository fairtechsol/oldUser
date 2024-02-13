import { Box } from "@mui/material";
import SingleBox from "./SingleBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const RowComponent = ({ header, data }: any) => {
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const getTime = (date: any) => {
    const now = new Date(date);
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
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
          {/* <Box sx={{ width: "48%", minWidth: "22%" }}> */}
            <SingleBox
              color={getColor}
              data={
                data?.marketType == "MANUAL BOOKMAKER"
                  ? "Quick Bookmaker"
                  : data?.marketType
              }
              first={true}
              header={header}
              time={getTime(data.createdAt)}
            />
          {/* </Box> */}
          <Box sx={{ maxWidth: "12%" , minWidth: "14%"}}>
            <SingleBox
              color={getColor()}
              data={
                data?.username ||
                data?.userName ||
                data?.user?.userName ||
                getProfile?.userName
              }
              header={header}
              boxWidth="100%"
            />
          </Box>
          {/* <Box sx={{ width: "52%", minWidth: "19%" }}> */}
            <SingleBox
              color={getColor()}
              data={data.teamName}
              up={true}
              header={header}
              // time={data.teamName}
            />
          {/* </Box>
          <Box sx={{ width: "30%" }}> */}
            <SingleBox
              color={getColor()}
              data={data?.bet_type || data?.betType}
              header={header}
              boxWidth="50%"
            />
          {/* </Box>
          <Box sx={{ width: "30%" }}> */}
            <SingleBox 
            color={getColor()} 
            data={data?.odds} 
            header={header}
            boxWidth="50%"
             />
          {/* </Box>
          <Box sx={{ width: "41%" }}> */}
            <SingleBox
              color={getColor()}
              data={data?.rate || data?.amount}
              header={header}
              width={"50%"}
              boxWidth="100%"
            />
          {/* </Box> */}
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
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={data[2]}
            header={header}
            boxWidth="100%"
          />
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
            boxWidth="100%"
          />
        </>
      )}
    </Box>
  );
};

// const Footer = ({ currentPage, pages, callPage, currentPageNo }: any) => {
//     return (
//         <Box
//             sx={{
//                 height: "35px",
//                 display: "flex",
//                 alignItems: "center",
//                 px: { xs: "5px", lg: "10px" },
//                 justifyContent: "space-between",
//                 background: "#FAFAFA",
//                 // marginX: "0%",
//                 // marginBottom: "10px",
//             }}
//         >
//             <Typography
//                 sx={{ fontSize: { xs: "10px", lg: "12px" }, fontWeight: "600" }}
//             >
//                 Showing 1 to {pages}
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Box
//                     sx={{
//                         height: "25px",
//                         width: { xs: "60px", lg: "80px" },
//                         background: "#0B4F26",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         borderRadius: "5px",
//                     }}
//                     onClick={() => {
//                         callPage(
//                             parseInt(currentPage) - 1 === -1 ? 0 : parseInt(currentPage) - 1
//                         );
//                     }}
//                 >
//                     <Typography
//                         sx={{
//                             color: "white",
//                             fontSize: { lg: "12px", xs: "10px" },
//                         }}
//                     >
//                         Previous
//                     </Typography>
//                 </Box>
//                 <Box
//                     sx={{
//                         height: "25px",
//                         marginX: { lg: "8px", xs: "3.5px" },
//                         width: "40px",
//                         background: "#262626",
//                         display: "flex",
//                         borderRadius: "5px",
//                         justifyContent: "center",
//                         alignItems: "center",
//                     }}
//                 >
//                     <Typography
//                         sx={{
//                             color: "white",
//                             fontSize: { lg: "12px", xs: "12px" },
//                         }}
//                     >
//                         {currentPageNo + 1}
//                     </Typography>
//                 </Box>
//                 <Box
//                     sx={{
//                         height: "25px",
//                         width: { xs: "60px", lg: "80px" },
//                         background: "#0B4F26",
//                         display: "flex",
//                         borderRadius: "5px",
//                         justifyContent: "center",
//                         alignItems: "center",
//                     }}
//                     onClick={() => {
//                         callPage(
//                             parseInt(currentPage) === pages - 1
//                                 ? pages - 1
//                                 : parseInt(currentPage) + 1
//                         );
//                     }}
//                 >
//                     <Typography
//                         sx={{
//                             color: "white",
//                             fontSize: { lg: "14px", xs: "12px" },
//                         }}
//                     >
//                         Next
//                     </Typography>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

export default RowComponent;
