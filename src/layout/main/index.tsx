import { memo, useEffect } from "react";

import CustomHeader from "./header/CustomHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import Rules from "../../pages/rules";
import { Box } from "@mui/material";
import { BACKIMAGE } from "../../assets";
import SecureAuthVerification from "../../pages/auth/secureAuthverification";
import {
  getProfile,
  marqueeNotification,
} from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { socketService } from "../../socketManager";

const MainLayout = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userToken")) {
      navigate("/fgUser/login");
      sessionStorage.clear();
    }
    dispatch(getProfile());
    dispatch(marqueeNotification());
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("userToken")) {
      socketService.connect();
      socketService.auth.logout();
    } else {
      socketService.disconnect();
    }
    return () => {
      socketService.disconnect();
    };
  }, [sessionStorage.getItem("userToken")]);

  return (
    <>
      <CustomHeader />
      {location.pathname.includes("rules") ? (
        <Box
          sx={{
            minHeight: "100vh",
            padding: "0.2% 1% 1% 1%",
            width: "100%",
            backgroundImage: `url(${BACKIMAGE})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          <div
            style={{
              height: "120vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Rules />
          </div>
        </Box>
      ) : location.pathname.includes("secure-auth") ? (
        <Box
          sx={{
            minHeight: "100vh",
            padding: "0.2% 1% 1% 1%",
            width: "100%",
            backgroundColor: "#",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            alignContent: "center",
          }}
        >
          <div
            style={{
              height: "120vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SecureAuthVerification />
          </div>
        </Box>
      ) : (
        <BackgroundLayout>
          <Outlet />
        </BackgroundLayout>
      )}
    </>
  );
};

export default memo(MainLayout);
