import { Box, Modal, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { Form, ModalHeader } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getPlacedBetsForAccountStatement } from "../../../store/actions/betPlace/betPlaceActions";
import { AppDispatch, RootState } from "../../../store/store";
import Loader from "../../Loader";
import EmptyRow from "../EmptyRow";
import ListHeaderTModal from "./ListheaderTModal";
import TableRowModal from "./TableRowModal";

const style = {
  position: "absolute",
  top: "30%",
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
};

const AccountStatementModal = ({
  open,
  onClose,
  show,
}: {
  open: boolean;
  onClose: () => void;
  show: any;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("all");
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const { placedBetsAccountStatement } = useSelector(
    (state: RootState) => state.bets
  );

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
              Placed Bets
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
          <div className="d-flex align-items-center">
            <Form.Check
              inline
              label="Matched"
              name="group1"
              type="radio"
              id="inline-radio-1"
              checked={selectedOption === "matched"}
              onChange={() => {
                setSelectedOption("matched");
                if (show?.betId?.length > 0) {
                  dispatch(
                    getPlacedBetsForAccountStatement({
                      betId: show?.betId,
                      status: "MATCHED",
                      userId: profileDetail?.id,
                    })
                  );
                } else if (show?.runnerId) {
                  dispatch(
                    getPlacedBetsForAccountStatement({
                      runnerId: show?.runnerId,
                      isCard: true,
                      result: `inArr${JSON.stringify(["WIN", "LOSS", "TIE"])}`,
                      userId: profileDetail?.id,
                    })
                  );
                }
              }}
            />
            <Form.Check
              inline
              label="Deleted"
              name="group1"
              type="radio"
              id="inline-radio-2"
              checked={selectedOption === "deleted"}
              onChange={() => {
                setSelectedOption("deleted");
                if (show?.betId?.length > 0) {
                  dispatch(
                    getPlacedBetsForAccountStatement({
                      betId: show?.betId,
                      status: "DELETED",
                      userId: profileDetail?.id,
                    })
                  );
                } else if (show?.runnerId) {
                  dispatch(
                    getPlacedBetsForAccountStatement({
                      runnerId: show?.runnerId,
                      status: "DELETED",
                      userId: profileDetail?.id,
                    })
                  );
                }
              }}
            />
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
                {placedBetsAccountStatement.length > 0 ? ( // Check if no records
                  <EmptyRow containerStyle={{ background: "#FFE094" }} />
                ) : (
                  placedBetsAccountStatement?.length >= 0 &&
                  placedBetsAccountStatement?.map(
                    (item: any, index: number) => (
                      <TableRowModal
                        key={index}
                        index={index}
                        containerStyle={{ background: "#FFE094" }}
                        profit={true}
                        fContainerStyle={{ background: "#0B4F26" }}
                        fTextStyle={{ color: "white" }}
                        teamName={item?.teamName}
                        betType={item?.betType}
                        odds={item?.odds}
                        amount={item?.amount}
                        result={
                          item?.result === "LOSS"
                            ? `-${parseFloat(item?.lossAmount).toFixed(2)}`
                            : item?.result === "WIN"
                            ? parseFloat(item?.winAmount).toFixed(2)
                            : 0
                        }
                        createdAt={moment(item?.createdAt).format(
                          "MM/DD/YYYY hh:mm:ss A"
                        )}
                        startAt={
                          item?.racingMatch
                            ? moment(item?.racingMatch?.startAt).format(
                                "MM/DD/YYYY hh:mm:ss A"
                              )
                            : moment(item?.match?.startAt).format(
                                "MM/DD/YYYY hh:mm:ss A"
                              )
                        }
                      />
                    )
                  )
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AccountStatementModal;
