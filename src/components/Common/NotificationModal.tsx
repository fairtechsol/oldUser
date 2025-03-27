import { Box } from "@mui/material";
import MUIModal from "@mui/material/Modal";
import SmallCustomLoader from "../Loader/smallLoader";

const NotificationModal = () => {
  try {
    return (
      <MUIModal
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          outline: "none",
        }}
        open={true}
        slotProps={{
          backdrop: {
            onClick: (event) => event.stopPropagation(),
          },
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "190px",
            minHeight: "150px",
            borderRadius: "6px",
            paddingY: "10px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            alignSelf: "center",
            display: "flex",
            position: "absolute",
            top: "40%",
            zIndex: 999,
          }}
        >
          <SmallCustomLoader />
        </Box>
      </MUIModal>
    );
  } catch (e: any) {
    console.log(e.message);
  }
};

export default NotificationModal;
