import { memo } from "react";

import CustomHeader from "./header/CustomHeader";
import { Outlet, useLocation } from "react-router-dom";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import Rules from "../../pages/rules";
import { Box } from "@mui/material";
import { BACKIMAGE } from "../../assets";
import SecureAuthVerification from "../../pages/auth/secureAuthverification";


const MainLayout = () => {

  const location = useLocation()


  return (
    <>
    <CustomHeader />
    {location.pathname.includes("rules") ? (
      <Box
        sx={{
          minHeight: "100vh",
          padding: "0.2% 1% 1% 1%",
          width: "100%",
          backgroundImage: `url(${BACKIMAGE})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div style={{ height: "120vh", display: "flex", flexDirection: "column" }}>
          <Rules />
        </div>
      </Box>
    ) : location.pathname.includes("secure-auth") ? (
      <Box
        sx={{
          minHeight: "100vh",
          padding: "0.2% 1% 1% 1%",
          width: "100%",
          // backgroundImage: `url(${BACKIMAGE})`,
          backgroundColor: "#",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          alignContent: "center"
        }}
      >
        <div style={{ height: "120vh", display: "flex", flexDirection: "column" }}>
          <SecureAuthVerification/>
        </div>
      </Box>
    ) : (
      <BackgroundLayout>
        <Outlet />
      </BackgroundLayout>
    )}
  </>
);
};

export default memo(MainLayout);
