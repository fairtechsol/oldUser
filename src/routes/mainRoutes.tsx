import { lazy } from "react";
import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";
import Comingsoon from "../pages/comingsoon/index";
import Match from "../pages/match";
import MatchDetail from "../pages/matchDetail";
import ProfitLoss from "../pages/reports/ProfitLoss";
import Inplay from "../pages/inplay";
const MyAccount = Loadable(lazy(() => import("../pages/myAccount")));
const MainLayout = Loadable(lazy(() => import("../layout/main")));


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
      path: Constants.ReportsPaths.profitLoss,
      element: <ProfitLoss />,
    },
    {
      path: Constants.MainPaths.liveMarket,
      element: <Inplay />,
    },
    {
      path: "*",
      element: <Navigate to={"/match"} replace />,
    },
  ],
};
export default MainRoutes;
