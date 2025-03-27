import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { Col, ModalHeader } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { transactionProviderBets } from "../../../store/actions/card/cardDetail";
import { AppDispatch } from "../../../store/store";
import Loader from "../../Loader";
import EmptyRow from "../EmptyRow";
import ListHeaderTModal from "./ListheaderTModal";
import TableRowModal from "./TableRowModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",

  boxShadow: 24,
  border: "2px solid white",
  background: "#F8C851",
  borderTopRightRadius: {
    xs: "10px",
    lg: "0px",
    md: "10px",
  },
  borderTopLeftRadius: {
    xs: "10px",
    lg: "0px",
    md: "10px",
  },
  borderRadius: "2px",
  p: 1,
  maxHeight: "80vh",
  overflow: "auto",
};

const BetsListModal = ({
  open,
  onClose,
  selected,
  liveCasinoProvider,
  updatedReport,
}: {
  open: boolean;
  onClose: () => void;
  selected: any;
  liveCasinoProvider: any;
  updatedReport: any;
}) => {
  const dispatch: AppDispatch = useDispatch();

  const [type, setType] = useState<any>({
    label: "Select Casino Type",
    value: "",
  });

  const handleLiveCasinoSubmitClick = () => {
    if (type?.value === "") {
      return false;
    }
    let payload: any = {
      id: selected?.user?.id,
      name: type?.value,
      date: selected?.createdAt,
    };
    dispatch(transactionProviderBets(payload));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <ModalHeader>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
              }}
            >
              Result
            </Typography>
            <IoClose
              size={30}
              color="red"
              cursor={"pointer"}
              onClick={() => onClose()}
            />
          </Box>
        </ModalHeader>
        <Box
          sx={[
            {
              minHeight: "100px",
              width: "100%",
            },
          ]}
        >
          <div
            className={`w-100 d-flex flex-row justify-content-start align-items-center gap-2 mb-2`}
          >
            <Col md={4} lg={2} xs={4}>
              <Autocomplete
                id="movie"
                options={liveCasinoProvider}
                onChange={(_, value: any) => setType(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Casino Type"
                    InputProps={{
                      ...params.InputProps,
                      sx: { padding: 0, display: "flex", alignItems: "center" },
                    }}
                  />
                )}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& .MuiOutlinedInput-root": {
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiAutocomplete-input": {
                    textAlign: "center",
                  },
                }}
              />
            </Col>
            <Button
              sx={{
                backgroundColor: "#0B4F26",
                alignSelf: "center",
                color: "#fff",
                "& .hover": {
                  backgroundColor: "#0B4F26",
                },
              }}
              onClick={handleLiveCasinoSubmitClick}
            >
              Submit
            </Button>
          </div>
          <hr />
          {false ? (
            <Box
              sx={{
                minHeight: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader text="" />
            </Box>
          ) : (
            <>
              <Box sx={{ overflowX: "scroll", width: "100%" }}>
                <ListHeaderTModal />
                {updatedReport?.length === 0 ? (
                  <EmptyRow containerStyle={{ background: "#FFE094" }} />
                ) : (
                  updatedReport?.map((item: any, index: number) => (
                    <TableRowModal
                      key={item?.transactionId}
                      index={index}
                      containerStyle={{ background: "#FFE094" }}
                      profit={true}
                      fContainerStyle={{ background: "#0B4F26" }}
                      fTextStyle={{ color: "white" }}
                      gameName={item?.gameName}
                      amount={parseFloat(item?.amount) > 0 ? "CREDIT" : "DEBIT"}
                      absAmount={Math.abs(item?.amount).toFixed(2)}
                      total={parseFloat(item?.total).toFixed(2)}
                      createdAt={moment(new Date(item?.createdAt)).format(
                        "YYYY-MM-DD hh:mm"
                      )}
                      roundId={item?.roundId}
                      transactionId={item?.transactionId}
                    />
                  ))
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default BetsListModal;
