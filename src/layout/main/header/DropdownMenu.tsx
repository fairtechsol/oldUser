import { Box, CircularProgress, MenuItem } from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logout from "../../../assets/images/logout.webp";
import StyledImage from "../../../components/Common/StyledImages";
import { logout } from "../../../store/actions/auth/authAction";
import { AppDispatch, RootState } from "../../../store/store";

const DropdownMenu = ({ handleClose }: any) => {
  const { loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const menutItems = [{ title: "Rules", link: "/rules" }];
  return (
    <Box
      sx={{
        position: "absolute",
        background: "white",
        top: { lg: "60px", xs: "35px" },
        right: 0,
        paddingY: "10px",
        paddingX: "2px",
        borderRadius: "5px",
        marginTop: "2px",
        marginRight: "10px",
        zIndex: "999",
      }}
    >
      {menutItems.map((x, idx) => (
        <MenuItem
          key={idx}
          dense={true}
          sx={{
            fontSize: { lg: "12px", xs: "10px" },
            fontWeight: "500",
            marginX: "5px",

            width: { lg: "200px", xs: "200px" },
            borderBottomWidth: 1,
            color: "black",
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
            handleClose();
            if (x.link) {
              navigate(x.link);
            }
          }}
        >
          {x.title}
        </MenuItem>
      ))}
      <Box
        onClick={() => {
          if (!loading) {
            dispatch(logout());
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
            alt="logout"
          />
        )}
      </Box>
    </Box>
  );
};

export default memo(DropdownMenu);
