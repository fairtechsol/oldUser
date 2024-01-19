import { Box } from "@mui/material";
// import Background from "../../assets/images/new_back.webp";
import { BACKIMAGE } from "../../assets";
import EventListing from "../../layout/main/eventlist";
import SideBar from "../../layout/main/header/SideBar";
const BackgroundLayout = ({ children }: any) => {
    return (
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

                <Box
                    flex={1}
                    sx={[
                        { flex: 1, display: "flex" },
                        (theme: any) => ({
                            backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
                        }),
                    ]}
                >

                    <SideBar />
                    <Box sx={{ width: "100%" }}>
                        <Box
                            sx={{
                                display: "flex",
                                // overflowX: "hidden",
                                flexDirection: "column",
                                flex: 1,
                                width: "100%",
                                justifyContent: "flex-start",
                                // overflowY: "auto",
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