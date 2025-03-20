// import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";
import SecureAuthVerification from "../pages/auth/secureAuthverification";
import { Constants } from "../utils/Constants";

import MainLayout from "../layout/main";
// import { lazy } from "react";
import BetHistory from "../pages/betHistory";
import ChangeButtonValue from "../pages/changeButtonValue";
import ChangePassword from "../pages/changepassword";
import Comingsoon from "../pages/comingsoon";
import GameList from "../pages/gameList";
import Inplay from "../pages/inplay";
import LiveCasino from "../pages/liveCasino";
import Match from "../pages/match";
import MatchDetail from "../pages/matchDetail";
import MyAccount from "../pages/myAccount";
import AccountStatement from "../pages/reports/AccountStatement";
import ProfitLoss from "../pages/reports/ProfitLoss";
import Rules from "../pages/rules";

// const ChangeButtonValue = Loadable(
//   lazy(() => import("../pages/changeButtonValue"))
// );
// const Rules = Loadable(lazy(() => import("../pages/rules")));
// const MyAccount = Loadable(lazy(() => import("../pages/myAccount")));
// const Comingsoon = Loadable(lazy(() => import("../pages/comingsoon/index")));
// const Match = Loadable(lazy(() => import("../pages/match")));
// const MatchDetail = Loadable(lazy(() => import("../pages/matchDetail")));
// const Inplay = Loadable(lazy(() => import("../pages/inplay")));
// const ChangePassword = Loadable(lazy(() => import("../pages/changepassword")));
// const ProfitLoss = Loadable(lazy(() => import("../pages/reports/ProfitLoss")));
// const BetHistory = Loadable(lazy(() => import("../pages/betHistory")));
// const AccountStatement = Loadable(
//   lazy(() => import("../pages/reports/AccountStatement"))
// );

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
      // path: Constants.MainPaths.match,
      path: `${Constants.MainPaths.match}/:type`,
      element: <GameList />,
    },
    // {
    //   path: "game-list/:type",
    //   element: <GameList />,
    // },
    {
      path: Constants.MainPaths.comingSoon,
      element: <Comingsoon />,
    },
    {
      path: Constants.MainPaths.liveMarketMatches,
      element: <MatchDetail />,
    },
    {
      path: Constants.MainPaths.liveMarketSport,
      element: <MatchDetail />,
    },
    {
      path: `${Constants.MainPaths.match}/:type/matchDetail`,
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
      path: Constants.ReportsPaths.profitLoss,
      element: <ProfitLoss />,
    },
    {
      path: Constants.ReportsPaths.betHistory,
      element: <BetHistory />,
    },
    {
      path: Constants.ReportsPaths.accountStatement,
      element: <AccountStatement />,
    },
    {
      path: Constants.MainPaths.casino,
      element: <LiveCasino />,
    },
    {
      path: Constants.MainPaths.liveCasino,
      element: <LiveCasino />,
    },
    {
      path: "*",
      element: <Navigate to={"/match"} replace />,
    },
  ],
};

export default MainRoutes;
