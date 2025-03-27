import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";

import MainLayout from "../layout/main";
import BetHistory from "../pages/betHistory";
import AccountStatement from "../pages/reports/AccountStatement";
import ProfitLoss from "../pages/reports/ProfitLoss";

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
