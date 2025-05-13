import { Navigate } from "react-router-dom";
import SecureAuthVerification from "../pages/auth/secureAuthverification";
import { Constants } from "../utils/Constants";

import MainLayout from "../layout/main";
import BetHistory from "../pages/betHistory";
import ChangeButtonValue from "../pages/changeButtonValue";
import ChangePassword from "../pages/changepassword";
import Comingsoon from "../pages/comingsoon";
import Inplay from "../pages/inplay";
import LiveCasino from "../pages/liveCasino";
import MatchDetail from "../pages/matchDetail";
import MatchList from "../pages/matchList";
import MyAccount from "../pages/myAccount";
import AccountStatement from "../pages/reports/AccountStatement";
import ProfitLoss from "../pages/reports/ProfitLoss";
import ProfitLossCard from "../pages/reports/ProfitLossCard";
import Rules from "../pages/rules";

const MainRoutes = {
  path: Constants.MainPaths.root,
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={Constants.MainPaths.match + "/cricket"} />,
    },
    {
      path: `${Constants.MainPaths.match}/:type`,
      element: <MatchList />,
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
      path: Constants.ReportsPaths.profitLossCard,
      element: <ProfitLossCard />,
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
      element: <Navigate to={"/match/cricket"} replace />,
    },
  ],
};

export default MainRoutes;
