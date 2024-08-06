import { Box, Card, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FgLogo } from "../../assets";
import StyledImage from "../../components/Common/StyledImages";
import AuthBackground from "../../pages/auth/AuthBackground";
const AuthLayout = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("jwtUser")) {
      navigate("/match");
    }
  }, [navigate]);

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
            sx={{
              height: "10%",
              width: { xs: "85%", lg: "69%" },
              fetchPriority: "high",
            }}
          />
          <Outlet />
        </Card>
      </Box>
    </Box>
  );
};

export default AuthLayout;
