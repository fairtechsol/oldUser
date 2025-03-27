import { Box } from "@mui/material";
import SearchInput from "../Common/SearchInput";

import { ApiConstants } from "../../utils/Constants";
import NumberDropDown from "../Common/NumberDropDown";

const ListH = ({
  getLimitEntries,
  getAccountStatement,
  searchFor,
  pageLimit,
  setPageLimit,
  fromDate,
  toDate,
  setCurrentPage,
  setSearchValue,
}: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "row",
          md: "row",
        },
        justifyContent: "space-between",
        px: "10px",
        gap: 1,
        py: "6px",
      }}
    >
      <NumberDropDown
        getLimitEntries={getLimitEntries}
        setPageLimit={setPageLimit}
        pageLimit={pageLimit}
        textColor={"000"}
      />

      <SearchInput
        show={true}
        searchFor={searchFor}
        endpoint={ApiConstants.USER.LIST}
        getListOfUser={getAccountStatement}
        setCurrentPage={setCurrentPage}
        pageLimit={pageLimit}
        fromDate={fromDate}
        toDate={toDate}
        onChange={setSearchValue}
        width={"100%"}
        placeholder={"Search..."}
        inputContainerStyle={{
          width: { xs: "50vw", lg: "17vw" },
          marginLeft: "auto",
        }}
      />
    </Box>
  );
};

export default ListH;
