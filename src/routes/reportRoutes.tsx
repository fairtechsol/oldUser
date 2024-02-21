import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";

const MainLayout = Loadable(() => import("../layout/main"));
const ProfitLoss = Loadable(() => import("../pages/reports/ProfitLoss"));
const BetHistory = Loadable(() => import("../pages/betHistory"));
const AccountStatement = Loadable(
  () => import("../pages/reports/AccountStatement")
);

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
