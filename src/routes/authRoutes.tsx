import { lazy } from "react";
import AuthLayout from "../layout/auth";
import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";

const Login = Loadable(lazy(() => import("../pages/auth/login")));


const AuthRoutes = {
  path: Constants.AuthPaths.root,
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={Constants.AuthPaths.login} replace />,
    },
    {
      path: Constants.AuthPaths.login,
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to={"/login"} replace />,
    },
  ],
};
export default AuthRoutes;

