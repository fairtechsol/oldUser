import { Box } from "@mui/material";
import { BACKIMAGE } from "../../assets";
import EventListing from "../../layout/main/eventlist";
import SideBar from "../../layout/main/header/SideBar";

const BackgroundLayout = ({ children }: any) => {
  return (
    <Box
      sx={{
        fetchPriority: "high",
        minHeight: "100vh",
        paddingBottom: "1rem",
        width: "100%",
        backgroundImage: `url(${BACKIMAGE})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div style={{ height: "auto", display: "flex", flexDirection: "column" }}>
        <Box
          flex={1}
          sx={[
            { flex: 1, display: "flex", width: "100%", paddingBottom: "1rem" },

            (theme: any) => ({
              backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
            }),
          ]}
        >
          <SideBar />
          <Box sx={{ width: { lg: "82%", xs: "100%" } }}>
            <Box
              sx={{
                display: "flex",
                // overflowX: "hidden",
                flexDirection: "column",
                flex: 1,
                width: "100%",
                justifyContent: "flex-start",
                overflowY: "100%",
                alignItems: "flex-start",
              }}
            >
              <EventListing />
              {children}
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default BackgroundLayout;
