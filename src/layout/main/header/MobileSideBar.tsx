import { Box, Drawer } from "@mui/material";
import SideBar from "./SideBar";


const MobileSideBar = ({ mobileOpen, setMobileOpen, showSideBarMobile, }: any) => {
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
        const container =
        window !== undefined ? () => window.document.body : undefined;

        return (
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            PaperProps={{
                sx: {
                    top: "114px",
                },
            }}
            ModalProps={{
                keepMounted: true, // Better open performance on xs.
            }}
            sx={{
                display: { xs: "block", sm: "block", md: "block" },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: { lg: "300px", xs: "190px" },
                                    },
            }}
        >
            <Box
                sx={{
                    minHeight: {
                        lg: showSideBarMobile ? 50 + 32 + 40 : 90 + 32 + 40,
                        // xs: 60 + 32 + 21,
                    },
                }}
            />
            <Box sx={{ height: "100vh" }}>
                <SideBar mobileShow={true} handleDrawerToggle={handleDrawerToggle} />
            </Box>
        </Drawer>
    );
};

export default MobileSideBar;