import { Box } from "@mui/material";
import MUIModal from "@mui/material/Modal";

// import { BETPLACED, NOT } from "../../assets";
import SmallCustomLoader from "../Loader/smallLoader";

const NotificationModal = () => {
  try {
    // useEffect(() => {
    //   let TimeVal = (time * 1000) + 2000;
    //   if (open.value) {
    //     setTimeout(() => {
    //       handleClose();
    //     }, TimeVal);
    //   }
    // }, [open.value]);
    // console.log("open", open);
    return (
      <MUIModal
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          outline: "none",
        }}
        open={true}
        // onClose={handleClose}
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
          {/* {open?.loading ? ( */}
          <SmallCustomLoader />
          {/* ) : (
            <>
              <img
                onClick={() => {
                  if (!open.type) {
                    handleClose();
                  }
                }}
                src={open.type ? BETPLACED : NOT}
                style={{ width: "60px", height: "60px", marginTop: "3px" }}
              />

              <Typography
                sx={{
                  fontSize: { xs: "10px", lg: "14px", md: "14px" },
                  fontWeight: "500",
                  marginY: ".7vh",
                  width: "70%",
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                {open.msg}
              </Typography>
            </>
          )} */}
        </Box>
      </MUIModal>
    );
  } catch (e: any) {
    console.log(e.message);
  }
};

export default NotificationModal;
