import { Box, Typography } from "@mui/material";
import SearchInput from "../Common/SearchInput";
import SmallDropDown from "../Common/SmallDropdown";

const ListH = ({ getLimitEntries, getAccountStatement }:any) => {
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
        <Box display={"flex"} alignItems="center" sx={{ width: "100%" }}>
          <Typography
            sx={{ fontSize: "10px", color: "black", fontWeight: "500" }}
          >
            Show
          </Typography>
          <SmallDropDown getLimitEntries={getLimitEntries} />
          <Typography
            sx={{ fontSize: "10px", color: "black", fontWeight: "500" }}
          >
            Entries
          </Typography>
        </Box>
        <SearchInput
          show={true}
          getListOfUser={getAccountStatement}
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