import { Box } from "@mui/material";
import { memo } from "react";
import NumberDropDown from "../Common/NumberDropDown";
import SearchInput from "../Common/SearchInput";

interface ListHProps {
  searchFor: string;
  pageLimit: number;
  setPageLimit: (val: number) => void;
  fromDate: any;
  toDate: any;
  setCurrentPage: (val: number) => void;
  setSearchValue: (val: string) => void;
}

const ListH = ({
  searchFor,
  pageLimit,
  setPageLimit,
  fromDate,
  toDate,
  setCurrentPage,
  setSearchValue,
}: ListHProps) => {
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
        setPageLimit={setPageLimit}
        pageLimit={pageLimit}
        textColor="#000"
      />
      <SearchInput
        searchFor={searchFor}
        setCurrentPage={setCurrentPage}
        pageLimit={pageLimit}
        fromDate={fromDate}
        toDate={toDate}
        onChange={setSearchValue}
        inputContainerStyle={{
          width: { xs: "50vw", lg: "17vw" },
          marginLeft: "auto",
        }}
      />
    </Box>
  );
};

export default memo(ListH);
