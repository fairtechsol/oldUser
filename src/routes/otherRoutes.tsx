import { Navigate } from "react-router-dom";
import OtherLayout from "../layout/otherLayout";
import VideoPage from "../pages/pubic/VideoPage";

const OtherRoutes = {
  path: "/",
  element: <OtherLayout />,
  children: [
    { index: true, element: <Navigate to={"/login"} replace /> },
    {
      path: "videoPage/:vidId",
      element: <VideoPage />,
    },
    {
      path: "*",
      element: <Navigate to={"/login"} replace />,
    },
  ],
};
export default OtherRoutes;
