import { Box, MenuItem, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const navigate = useNavigate();
  const classes = {
    Menusx: {
      marginTop: { xs: "15px", lg: "30px", md: "18px" },
      marginLeft: { xs: "5px", lg: "0", md: "0" },
      paddingY: "0px",
      padding: "0px",
      width: { xs: "105%", lg: "100%", md: "100%" },
      top: { xs: "-260px" },
      md: "-460px",
      lg: "-460px",
    },
    MenuListProps: { "aria-labelledby": "basic-button" },
    MenuPaperProps: {
      sx: {
        paddingY: "0px",
        padding: "0px",
        width: "100%",
        left: "1px !important",
        minHeight: "220px",
        background: "url(/static/media/back.00d2deda3616019e96ee.png)",
        boxShadow: "none",
      },
    },
    MenuItemsx: {
      width: "100%",
      fontSize: { lg: "16px", xs: "10px" },
      fontWeight: "600",
      marginX: "0px",
      // width: { lg: "140px", xs: "170px" },
      borderBottomWidth: 0,
      borderColor: "#EAEFEC",
      // paddingY: "-10px",
      marginTop: "0px",
      borderStyle: "solid",
      // marginLeft: "-10px",
      minHeight: "40px",
      lineHeight: "18px",
      color: "black",
      "&:hover": {
        backgroundColor: "#e5b744",
        // color: "white",
        border: 0,

        // transform: "scale(1.02)",
      },
    },
  };

  const menutItems1 = [
    { title: "Account Statement", link: "/account_statement" },
    { title: "Profile/Loss Report", link: "/profit_loss" },
    { title: "Bet History", link: "/bet_history" },
    { title: "Set Button Values", link: "/change_button_value" },
    { title: "Security Auth Verification", link: "/comingsoon" },
    { title: "Change Password", link: "/change_password" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        overflowY: "auto",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{}}>
          <Typography
            sx={[
              {
                fontSize: { lg: "18px", xs: "10px" },
                fontWeight: "600",
                fontFamily: "Montserrat",
                padding: "10px 13px",
                paddingBottom: "15px",
                color: "#fff",
                textTransform: "uppercase",
              },
            ]}
          >
            My Account
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#F8C851",
            marginLeft: "13px",
            marginRight: "20px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {menutItems1.map((x, index) => (
            <MenuItem
              key={index}
              dense={true}
              sx={classes.MenuItemsx}
              onClick={() => {
                navigate(x.link, {
                  state: {
                    activeTab: "MY ACCOUNT",
                  },
                });
              }}
            >
              {x.title}
            </MenuItem>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MyAccount;
