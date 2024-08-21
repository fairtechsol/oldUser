import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  AppBar,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import MobileSideBar from "./MobileSideBar";
import StyledImage from "../../../components/Common/StyledImages";

import { memo } from "react";
import NewBoxData from "./NewBoxData";
import { Draw, logo } from "../../../assets";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const CustomHeader = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { profileDetail, marqueeNotification } = useSelector(
    (state: RootState) => state.user.profile
  );
  const navigate = useNavigate();
  const [showSideBarMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const marqueeTextRef = useRef<HTMLDivElement | null>(null);

  
  useEffect(() => {
    if (!matchesMobile) {
      setMobileOpen(false);
    }
  }, [matchesMobile]);

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
      window.location.reload();
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);


  useEffect(() => {
    const marqueeText = marqueeTextRef.current;
    if (marqueeText && marqueeText.parentElement) {
      const containerWidth = marqueeText.parentElement.offsetWidth;
      const textWidth = marqueeText.scrollWidth;
      const animationDuration = (textWidth / containerWidth) * 15;
      marqueeText.style.animationDuration = `${animationDuration}s`;
    }
  }, [marqueeNotification]);
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
              {!isOnline && "You are currently offline"}
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
              {!isOnline && "You are currently offline"}
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
                  height: { lg: "55px", xs: "45px" },
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
                value={profileDetail?.userBal?.exposure}
              />
              <NewBoxData
                showDropDown={true}
                title={profileDetail?.userName}
                valueStyle={{ color: "white" }}
                titleStyle={{ color: "white" }}
                value={profileDetail?.userBal?.currentBalance}
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
            overflow: "hidden",
          }}
        >
          <div className="marquee-container">
            <Typography
              ref={marqueeTextRef}
              className="marquee-text"
              sx={{
                color: "white",
                fontSize: "10px",
                fontStyle: "italic",
                letterSpacing: "1px",
                // overflow: "hidden",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                // textOverflow: "ellipsis",
                display: "inline-block",
              }}
            >
              {marqueeNotification?.value}
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
// function dispatch(arg0: any) {
//   throw new Error("Function not implemented.");
// }
