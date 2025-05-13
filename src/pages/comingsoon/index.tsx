import { Box } from "@mui/material";
import Loader from "../../components/Loader";

const ComingSoon = () => {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        overflowY: "auto",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          minHeight: "90vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader height="70vh" text="Coming Soon" />
      </Box>
    </Box>
  );
};
export default ComingSoon;
