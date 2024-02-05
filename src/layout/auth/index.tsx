import { Box, Card, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
// import AuthBackground from "../../pages/auth/AuthBackground";
import StyledImage from "../../components/Common/StyledImages";
import { FgLogo } from "../../assets";
import AuthBackground from "../../pages/auth/AuthBackground";
const AuthLayout = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box style={{ position: "relative" }}>
      <AuthBackground />
      <Box
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "flex-end",
          position: "relative",
          justifyContent: "flex-end",
        }}
      >
        <Card
          sx={[
            {
              display: "flex",
              height: "100%",
              flexDirection: "column",
              py: "10px",
              alignItems: "center",
              justifyContent: matchesMobile ? "flex-start" : "center",
              width: { lg: "380px", md: "43%", xs: "100%" },
            },
            (theme: any) => ({
              background: `${theme.palette.primary.mainGradient}`,
            }),
          ]}
        >
          <StyledImage
            src={FgLogo}
            alt="Fairgame"
            sx={{ height: "8%", width: "300px" }}
          />
          <Outlet />
        </Card>
      </Box>
    </Box>
  );
};

export default AuthLayout;
