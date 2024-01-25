
import { Box } from "@mui/material";
import MatchValues from "../../components/ChangeValueButtons/MatchValues";
import SessionValue from "../../components/ChangeValueButtons/SessionValue";



const ChangeButtonValue = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row", md: "column" },
        }}
      >
        <MatchValues />
        <SessionValue />
      </Box>
    </>
  )


}

export default ChangeButtonValue;