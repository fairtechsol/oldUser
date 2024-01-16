import { createBrowserRouter } from "react-router-dom";
// routes
import config from "../config";
import AuthRoutes from "./authRoutes";

export default function routes() {
  return createBrowserRouter([AuthRoutes], {
    basename: config.BASE_NAME,
  });
}
