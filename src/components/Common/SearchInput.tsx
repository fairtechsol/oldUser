import { Box, TextField, Typography, debounce } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../assets";
import { getAccountStatement } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import StyledImage from "./StyledImages";

const SearchInput = ({
  title,
  inputContainerStyle,
  setShowSearch,
  onChange,
  searchFor,
  pageLimit,
  search,
  data,
  containerStyle,
  fromDate,
  toDate,
  setCurrentPage,
}: any) => {
  const [open, setOpen] = useState(false);

  const Item = ({ item }: any) => {
    return (
      <Typography
        onClick={() => {
          setShowSearch(item);
          setOpen(false);
        }}
        sx={{
          paddingY: "5px",
          paddingLeft: "10px",
          fontSize: "10px",
          fontWeight: "500",
          color: "black",
          "&:hover": {
            cursor: "pointer",
            background: "#3498ff33",
          },
        }}
      >
        {item?.userName}
      </Typography>
    );
  };
  const Block = ({ i }: any) => {
    return <Item item={i} />;
  };

  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = debounce(async (event: any) => {
    const value = event.target.value;
    if (onChange && typeof onChange === "function") {
      onChange(value);
    }
    try {
      if (searchFor === "accountStatement") {
        let filter = "";
        if (fromDate && toDate) {
          filter += `&createdAt=between${moment(fromDate)?.format(
            "YYYY-MM-DD"
          )}|${moment(toDate).add(1, "days")?.format("YYYY-MM-DD")}`;
        } else if (fromDate) {
          filter += `&createdAt=gte${moment(fromDate)?.format("YYYY-MM-DD")}`;
        } else if (toDate) {
          filter += `&createdAt=lte${moment(toDate)?.format("YYYY-MM-DD")}`;
        }
        setCurrentPage(1);
        dispatch(
          getAccountStatement({
            userId: profileDetail?.id,
            page: 1,
            limit: pageLimit,
            keyword: value,
            searchBy: "description,user.userName,actionByUser.userName",
            filter: filter,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, 500);

  return (
    <Box
      sx={[
        { width: { lg: "30%", xs: "100%", position: "relative" } },
        containerStyle,
      ]}
      onClick={setShowSearch}
    >
      <Typography
        sx={{ fontSize: "12px", fontWeight: "600", marginBottom: ".3vh" }}
      >
        {title}
      </Typography>
      <Box
        onClick={() => {
          setOpen(!open);
        }}
        sx={[
          {
            width: "100%",
            height: "37px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            background: "white",
            borderRadius: "50px",
            border: "2px solid #DEDEDE",
            paddingX: "7px",
          },
          inputContainerStyle,
        ]}
      >
        <TextField
          variant="standard"
          placeholder={"Search"}
          value={search?.userName}
          onChange={handleInputChange}
          InputProps={{
            disableUnderline: true,
            style: { fontSize: "11px", fontWeight: "500" },
          }}
          sx={{
            textTransform: "lowercase",
            borderColor: "white",
            display: "flex",
            flex: 1,
            fontSize: { lg: "10px", xs: "8px" },
          }}
        />
        <Box
          sx={[
            {
              height: "30px",
              width: "30px",
              borderRadius: "50px",
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "primary.main",
              marginRight: -0.3,
              cursor: "pointer",
            },
          ]}
        >
          <StyledImage
            src={Search}
            sx={{ height: "40%", width: "auto" }}
            alt="search"
          />
        </Box>
      </Box>
      {search && search.length > 0 && open && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            width: "100%",
            alignSelf: "center",
            borderRadius: "2px",
            marginTop: "2px",
            position: "absolute",
            border: "2px solid #DEDEDE",
            zIndex: 9999,
          }}
        >
          {data
            ?.filter((k: any) =>
              k?.userName?.toLowerCase().includes(search.toLowerCase())
            )
            .map((i: any, idx: any) => {
              return <Block key={idx} i={i} />;
            })}
        </Box>
      )}
    </Box>
  );
};
export default SearchInput;
