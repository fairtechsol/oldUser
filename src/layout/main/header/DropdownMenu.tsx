import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StyledImage from "../../../components/Common/StyledImages";
import Logout from "../../../assets/images/logout.png";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { memo } from "react";

import { useState } from "react";
import { logout } from "../../../store/actions/auth/authAction";
import { AppDispatch } from "../../../store/store";

const DropdownMenu = ({ anchorEl, open, handleClose }: any) => {
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const menutItems = [{ title: "Rules", link: "/rules" }];
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      sx={{
        marginLeft: matchesMobile ? "7px" : "2px",
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {menutItems?.map((x, idx) => (
        <MenuItem
          key={idx}
          dense={true}
          sx={{
            fontSize: { lg: "12px", xs: "10px" },
            fontWeight: "500",
            marginX: "5px",
            width: { lg: "200px", xs: "200px" },
            borderBottomWidth: 1,
            borderColor: "#EAEFEC",
            paddingY: "2px",
            borderStyle: "solid",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
              borderColor: "white",
              borderRadius: "5px",
              transform: "scale(1.02)",
            },
          }}
          onClick={() => {
            if (x.link) {
              navigate(x.link);
            }
            handleClose();
          }}
        >
          {x.title}
        </MenuItem>
      ))}
      <Box
        onClick={() => {
          if (!loading) {
          } else {
            return false;
          }
        }}
        sx={{
          borderRadius: "5px",
          height: { lg: "38px", xs: "34px" },
          width: "200px",
          marginLeft: "5px",
          marginTop: "10px",
          backgroundColor: "#F1C550",
          display: "flex",
          border: "2px solid #2626264D",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{
              color: "#FFF",
            }}
            size={20}
            thickness={4}
            value={60}
          />
        ) : (
          <StyledImage
            src={Logout}
            sx={{ width: "35%", height: "auto" }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(logout());
              navigate("/fgUser/login");
            }}
          />
        )}
      </Box>
    </Menu>
  );
};

export default memo(DropdownMenu);
