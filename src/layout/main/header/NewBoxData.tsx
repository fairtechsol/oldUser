import { memo, useEffect, useRef, useState } from "react";

import StyledImage from "../../../components/Common/StyledImages";
import DownIcon from "../../../assets/images/down.svg";
import { Box, Typography } from "@mui/material";
import DropDownMenu from "./DropdownMenu";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateLogoutModal } from "../../../store/actions/user/userAction";
import { handleDecimalAmount } from "../../../helper";

const NewBoxData = ({
  title,
  value,
  showDropDown,
  containerStyle,
  valueStyle,
  titleStyle,
  color,
}: any) => {
  const [anchorEl, setAnchorEl] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const { logoutModal } = useSelector(
    (state: RootState) => state.user.profitLoss
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!logoutModal) {
      setOpen(false);
    }
  }, [logoutModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleClickOutsideBox = () => {
      if (!dropdownRef.current) {
        setOpen(false);
      }
    };

    const handleScroll = () => {
      setOpen(false);
      dispatch(updateLogoutModal({ modal: false }));
    };

    window.addEventListener("click", handleClickOutside);
    document.addEventListener("click", handleClickOutsideBox);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleClickOutsideBox);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleClick = (event: any) => {
    if (title !== "Exposure") {
      setOpen((prevOpen) => !prevOpen);
      dispatch(updateLogoutModal({ modal: !open }));
      setAnchorEl(event.currentTarget);
    }
  };
  // const handleNumber=(num:any)=>{
  //   let value: any = parseFloat(num)?.toFixed(2)?.toString()?.split('.');
  //   return(
  //     value?.length > 0 ?
  //       <>
  //        <span style={{color:color}}>{new Intl.NumberFormat("en-IN").format(value[0])}.</span>
  //        <span  style={{fontSize:"0.8em",color:color}}>{value[1]}</span>
  //       </> : null
  //   )
  // }
  return (
    <Box>
      <Box
        onClick={(event) => {
          if (title != "Exposure") {
            handleClick(event);
          }
        }}
        ref={dropdownRef}
        sx={[
          {
            backgroundColor: "white",
            minWidth: { lg: "120px", xs: "110px" },
            marginLeft: "1vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 3px 10px #B7B7B726",
            height: { lg: "35px", xs: "33px" },
            overflow: "hidden",
            paddingX: "3px",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: "999",
          },
          containerStyle,
        ]}
      >
        <Box
          sx={{
            marginLeft: { lg: "5px", xs: "5px" },
            justifyContent: { xs: "center" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            // sx={[
            //   {
            //     fontSize: { lg: "8px", xs: "8px" },
            //     fontWeight: { xs: "bold", lg: "500px" },
            //     textTransform: showDropDown && "capitalize",
            //     whiteSpace: showDropDown && "nowrap",
            //     textOverflow: showDropDown && "ellipsis",
            //     maxWidth: showDropDown && "54px",
            //     overflow: showDropDown && "hidden",
            //     marginLeft: 0.5,
            //     color: "black",
            //   },
            //   titleStyle,
            // ]}
            sx={[
              {
                fontSize: { lg: "8px", xs: "8px" },
                fontWeight: { xs: "bold", lg: "500" },
                textTransform: showDropDown ? "capitalize" : "none",
                whiteSpace: showDropDown && "nowrap",
                maxWidth: "none",
                overflow: showDropDown && "hidden",
                marginLeft: "0.5px",
                color: "black",
              },
              titleStyle,
            ]}
          >
            {title}
          </Typography>
          <Typography
            sx={[
              {
                fontWeight: "bold",
                color: "#27AC1E",
                fontSize: { xs: "12px", lg: "12px" },
                marginLeft: 0.5,
              },
              valueStyle,
            ]}
          >
            {handleDecimalAmount(parseFloat(value || 0), color)}
          </Typography>
        </Box>
        {showDropDown && (
          <Box>
            <StyledImage
              src={DownIcon}
              sx={{ height: "10px", width: "10px", marginRight: "5px" }}
              alt=""
            />
          </Box>
        )}
      </Box>
      {open && (
        <DropDownMenu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
};

export default memo(NewBoxData);
