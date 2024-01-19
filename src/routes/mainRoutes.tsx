import { lazy } from "react";
import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";
import SecureAuthVerification from "../pages/auth/secureAuthverification";





const ChangeButtonValue = Loadable(lazy(() => import("../pages/changeButtonValue")));
const Rules = Loadable(lazy(() => import("../pages/rules")));

const MyAccount = Loadable(lazy(() => import("../pages/myAccount")));
const MainLayout = Loadable(lazy(() => import("../layout/main")));
const Comingsoon = Loadable(lazy(() => import("../pages/comingsoon/index")));
const Match = Loadable(lazy(() => import("../pages/match")));
const MatchDetail = Loadable(lazy(() => import("../pages/matchDetail")));
const Inplay = Loadable(lazy(() => import("../pages/inplay")));
const ChangePassword = Loadable(lazy(() => import("../pages/changepassword")));

const MainRoutes = {
  path: Constants.MainPaths.root,
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={Constants.MainPaths.match} />,
    },
    {
      path: Constants.MainPaths.match,
      element: <Match />,
    },
    {
      path: Constants.MainPaths.comingSoon,
      element: <Comingsoon />,
    },
    {
      path: Constants.MainPaths.liveMarketMatches,
      element: <MatchDetail />,
    },
    {
      path: Constants.MainPaths.myAccount,
      element: <MyAccount />,
    },
    {
      path: Constants.MainPaths.liveMarket,
      element: <Inplay />,
    },
    {
      path: Constants.MainPaths.changePassword,
      element: <ChangePassword />,
    },
    {
      path: Constants.MainPaths.changeButtonValue,
      element: <ChangeButtonValue />,
    },
    {
      path: Constants.MainPaths.rules,
      element: <Rules />,
    },
    {
      path: Constants.MainPaths.secureAuth,
      element: <SecureAuthVerification />,
    },
    {
      path: "*",
      element: <Navigate to={"/match"} replace />,
    },
  ],
};

export default  MainRoutes;
