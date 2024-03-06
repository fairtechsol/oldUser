import { memo, useEffect } from "react";

import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BACKIMAGE } from "../../assets";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import SecureAuthVerification from "../../pages/auth/secureAuthverification";
import Rules from "../../pages/rules";
import { socketService } from "../../socketManager";
import {
  getProfile,
  marqueeNotification,
  updateBalanceFromSocket,
  updateBalanceOnSessionResult,
} from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import CustomHeader from "./header/CustomHeader";

const MainLayout = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem("userToken")){
      navigate("/");
    }
  },[navigate]);

  const updateLoggedUserBalance = (event: any) => {
    dispatch(updateBalanceFromSocket(event));
  };

  const sessionResultDeclared = (event: any) => {
    try {
      dispatch(updateBalanceOnSessionResult(event?.userBalanceData));
    } catch (e) {
      console.log(e);
    }
  };

  const getUserProfile = () => {
    dispatch(getProfile());
  };

  useEffect(() => {
    if (!sessionStorage.getItem("userToken")) {
      navigate("/login");
      sessionStorage.clear();
    }
    dispatch(getProfile());
    dispatch(marqueeNotification());
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("userToken")) {
      socketService.connect();
      socketService.auth.logout();
      socketService.userBalance.updateUserBalance(updateLoggedUserBalance);
      socketService.userBalance.sessionResult(sessionResultDeclared);
      socketService.userBalance.sessionResultUnDeclare(sessionResultDeclared);
      socketService.userBalance.userSessionBetPlaced(getUserProfile);
      socketService.userBalance.userMatchBetPlaced(getUserProfile);
      socketService.userBalance.matchResultDeclared(getUserProfile);
      socketService.userBalance.sessionNoResult(getUserProfile);
      socketService.userBalance.matchResultUnDeclared(getUserProfile);
      socketService.userBalance.matchDeleteBet(getUserProfile);
      socketService.userBalance.sessionDeleteBet(getUserProfile);
    } else {
      socketService.disconnect();
    }
    return () => {
      socketService.disconnect();
      socketService.userBalance.updateUserBalanceOff(updateLoggedUserBalance);
      socketService.userBalance.sessionResultOff(sessionResultDeclared);
      socketService.userBalance.sessionResultUnDeclareOff(
        sessionResultDeclared
      );
      socketService.userBalance.userSessionBetPlacedOff(getUserProfile);
      socketService.userBalance.userMatchBetPlacedOff(getUserProfile);
      socketService.userBalance.matchResultDeclaredOff(getUserProfile);
      socketService.userBalance.matchResultUnDeclaredOff(getUserProfile);
      socketService.userBalance.sessionNoResultOff(getUserProfile);
      socketService.userBalance.matchDeleteBetOff(getUserProfile);
      socketService.userBalance.sessionDeleteBetOff(getUserProfile);
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
