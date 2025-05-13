import { Box, TextField, debounce } from "@mui/material";
import moment from "moment";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../assets";
import { getAccountStatement } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import StyledImage from "./StyledImages";

interface SearchInputProps {
  inputContainerStyle: any;
  onChange: any;
  searchFor: any;
  pageLimit: any;
  fromDate: any;
  toDate: any;
  setCurrentPage: any;
}

const SearchInput = ({
  inputContainerStyle,
  onChange,
  searchFor,
  pageLimit,
  fromDate,
  toDate,
  setCurrentPage,
}: SearchInputProps) => {
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
    <Box sx={{ width: { lg: "30%", xs: "100%", position: "relative" } }}>
      <Box
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
          placeholder="Search"
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
          sx={{
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
          }}
        >
          <StyledImage
            src={Search}
            sx={{ height: "40%", width: "auto" }}
            alt="search"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default memo(SearchInput);
