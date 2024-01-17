import { lazy } from "react";
import Loadable from "../utils/loadable";
import Matches from "../pages/match"
import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";
import Comingsoon from "../pages/comingsoon/index";
import Match from "../pages/match";

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
      path: "*",
      element: <Navigate to={"/match"} replace />,
    },
  ],
};
export default MainRoutes;
