import { Typography } from "@mui/material";
import { memo } from "react";
import ListHeader from "../../components/rules/ListHeader";
import RowComponent from "../../components/rules/RowComponent";

const Rules = ({ userPadding }: any) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: { xs: "12px", lg: "15px" },
          marginLeft: { lg: "2px", xs: "3px" },
          marginTop: "10px",
          marginBottom: "5px",
          color: "white",
          fontWeight: "bold",
          paddingTop: userPadding,
        }}
      >
        RULES
      </Typography>
      <ListHeader />
      {[1, 2, 3, 4].map((item, index) => {
        return <RowComponent key={item} index={index} />;
      })}
    </>
  );
};

export default memo(Rules);
