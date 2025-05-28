import { memo, useEffect } from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BACKIMAGE } from "../../assets";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import SecureAuthVerification from "../../pages/auth/secureAuthverification";
import Rules from "../../pages/rules";
import { socketService } from "../../socketManager";
import { getMatchList, setCurrentPageRedux } from "../../store/actions/match/matchListAction";
import {
  getProfile,
  marqueeNotification,
  updateBalanceFromSocket,
  updateBalanceOnSessionResult,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { Constants } from "../../utils/Constants";
import CustomHeader from "./header/CustomHeader";

const MainLayout = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPageRedux } = useSelector(
    (state: RootState) => state.match.matchList
  );

  useEffect(() => {
    if (!sessionStorage.getItem("jwtUser")) {
      navigate("/");
    }
  }, [navigate]);

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

  const handleMatchResult = (event: any) => {
    dispatch(getProfile());
    dispatch(setCurrentPageRedux(1));
    if (event?.isMatchDeclare || !event?.betId) {
      if (location.pathname.includes("inplay")) {
        setTimeout(() => {
          dispatch(getMatchList({}));
        }, 1000);
      } else if (location.pathname.includes("match")) {
        setTimeout(() => {
          dispatch(
            getMatchList({
              matchType: event?.gameType || location.pathname.split("/").pop(),
              page: currentPageRedux,
              limit: Constants.pageLimit,
            })
          );
        }, 1000);
      }
    }
  };

  const getUserProfile = () => {
    dispatch(getProfile());
  };

  useEffect(() => {
    if (!sessionStorage.getItem("jwtUser")) {
      navigate("/login");
      sessionStorage.clear();
    } else {
      dispatch(getProfile());
      dispatch(marqueeNotification());
    }
  }, [sessionStorage.getItem("jwtUser")]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("jwtUser")) {
        socketService.connect();
        socketService.auth.logout();
        socketService.userBalance.updateUserBalance(updateLoggedUserBalance);
        socketService.userBalance.sessionResult(sessionResultDeclared);
        socketService.userBalance.sessionResultUnDeclare(sessionResultDeclared);
        socketService.userBalance.sessionNoResult(getUserProfile);
        socketService.userBalance.declaredMatchResultAllUser(handleMatchResult);
        socketService.userBalance.unDeclaredMatchResultAllUser(
          handleMatchResult
        );
        socketService.userBalance.matchDeleteBet(getUserProfile);
        socketService.userBalance.sessionDeleteBet(getUserProfile);
        return () => {
          socketService.userBalance.sessionResultOff();
          socketService.userBalance.sessionResultUnDeclareOff();
          socketService.userBalance.userSessionBetPlacedOff();
          socketService.userBalance.userMatchBetPlacedOff();
          socketService.userBalance.matchResultDeclaredOff();
          socketService.userBalance.matchResultUnDeclaredOff();
          socketService.userBalance.declaredMatchResultAllUserOff();
          socketService.userBalance.unDeclaredMatchResultAllUserOff();
          socketService.userBalance.sessionNoResultOff();
          socketService.userBalance.matchDeleteBetOff();
          socketService.userBalance.sessionDeleteBetOff();
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [sessionStorage]);

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
