import { Box } from "@mui/material";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import MatchValues from "../../components/ChangeValueButtons/MatchValues";
import SessionValue from "../../components/ChangeValueButtons/SessionValue";
import { getButtonValue } from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";

const ChangeButtonValue = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("jwtUser")) {
      dispatch(getButtonValue());
    }
  }, [sessionStorage]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row", md: "column" },
      }}
    >
      <MatchValues />
      <SessionValue />
    </Box>
  );
};

export default memo(ChangeButtonValue);
