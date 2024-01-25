import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  AppBar,
} from "@mui/material";
import { useState, useEffect } from "react";
import "./index.css"
import { useNavigate } from "react-router-dom";
import MobileSideBar from "./MobileSideBar";
import StyledImage from "../../../components/Common/StyledImages";



import { memo } from "react";
import NewBoxData from "./NewBoxData";
import { Draw, logo } from "../../../assets";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";


const CustomHeader = ({match}:any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const navigate = useNavigate();
  const [notificationData, setNotificationData] = useState("Hello, this is a notification!");
  const [showSideBarMobile, setShowSideBarMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);


  useEffect(() => {
    if (!matchesMobile) {
      setMobileOpen(false);
    }
  }, [matchesMobile]);



  return (
    <>
      <Box sx={{ position: "relative", width: "100%" }}>
        {!isOnline && (
          <Box
            sx={{
              position: "absolute",
              height: "32px",
              display: "flex",
              width: "100%",
              background: !isOnline ? "red" : "green",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "text.white",
                fontSize: "13px",
                fontWeight: "bold",
                textAlign: "center",

              }}
            >
              {!isOnline && "Your are currently offline"}
            </Typography>
          </Box>
        )}
        {/* <CustomLoader height={"100%"} /> */}
      </Box>

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer }}>
        {/* <IdleTimer role="user" /> */}
        {!isOnline && (
          <Box
            sx={{
              height: "32px",
              display: "flex",
              background: !isOnline && "red",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "text.white",
                fontSize: "13px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {!isOnline && "Your are currently offline"}
            </Typography>
          </Box>
        )}
        <Box
          sx={[
            {
              width: "100%",
              minHeight: { lg: 90, md: 80, xs: 40 },
              display: "flex",
              flexDirection: matchesMobile ? "column" : "row",
              alignItems: !matchesMobile ? "center" : "flex-start",
              justifyContent: "space-between",
              // paddingLeft: { lg: "6.5%" },
              paddingRight: { lg: "1%" },
              paddingX: { xs: "2%", lg: "1%" },
              paddingY: matchesMobile ? "5px" : "0px",
              paddingBottom: matchesMobile ? "5px" : "0px",
            },
            (theme: any) => ({
              backgroundImage: `${theme.palette.primary.headerGradient}`,
            }),
          ]}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flex: 1,
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <StyledImage
                onClick={() => {
                  if (matchesMobile || showSideBarMobile) {
                    setMobileOpen(!mobileOpen);
                  }
                }}
                src={Draw}
                sx={{
                  height: { lg: "24px", xs: "20px" },
                  width: "auto",
                }}
              />
              <StyledImage
                onClick={(e) => {
                  navigate("/match", { state: { activeTab: "CRICKET" } });
                  e.stopPropagation();
                }}
                src={logo}
                sx={{
                  height: { lg: "45px", xs: "30px" },
                  width: "auto",
                  marginLeft: { lg: "20px", xs: "10px" },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", lg: "row" },
                alignItems: "center",
              }}
            >
              <NewBoxData
                showDropDown={false}
                containerStyle={{ marginTop: matchesMobile ? "5px" : "0px" }}
                valueStyle={{}}
                title={"Exposure"}
                value={getProfile?.userBal?.exposure}
              />
              <NewBoxData
                showDropDown={true}
                title={getProfile?.userName}

                valueStyle={{ color: "white" }}
                titleStyle={{ color: "white" }}
                value={getProfile?.userBal?.currentBalance}
                containerStyle={{ background: "#0B4F26" }}
              />

            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            height: "32px",
            display: "flex",
            background: "#202020",
            alignItems: "center",
          }}
        >
          {/* <marquee loop={true} scrollamount="3">
            <Typography
              sx={{
                color: "text.white",
                fontSize: "10px",
                fontStyle: "italic",
                letterSpacing: "1px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                textOverflow: "ellipsis",
              }}
            >
              {notificationData}
            </Typography>
          </marquee> */}
          <div className="marquee-container">
            <Typography
              sx={{
                color: "white",
                fontSize: "10px",
                fontStyle: "italic",
                letterSpacing: "1px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                textOverflow: "ellipsis",
              }}
            >
              {notificationData}
            </Typography>
          </div>
        </Box>
        {(matchesMobile || showSideBarMobile) && (
          <MobileSideBar
            showSideBarMobile={showSideBarMobile}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        )}
      </AppBar>
      <Box sx={{ minHeight: { lg: 90 + 32, xs: 60 + 32 + 21 } }} />
    </>
  );
};




export default memo(CustomHeader);
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

