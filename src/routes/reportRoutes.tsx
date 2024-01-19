import { lazy } from "react";
import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";


const BetHistory = Loadable(lazy(() => import("../pages/betHistory")));
const AccountStatement = Loadable(lazy(() => import("../pages/reports/AccountStatement")));

const MainLayout = Loadable(lazy(() => import("../layout/main")));
const ProfitLoss = Loadable(
  lazy(() => import("../pages/reports/ProfitLoss"))
);
// const AccountStatement = Loadable(
//   lazy(() => import("../pages/reports/AccountStatement"))
// );


const ReportRoutes = {
  path: Constants.ReportsPaths.root,
  element: <MainLayout />,
  children: [
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
      path: "*",
      element: <Navigate to={"/reports"} replace />,
    },
  ],
};

export default ReportRoutes;
