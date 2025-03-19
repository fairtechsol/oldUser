import { Box, Modal, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { Form, ModalHeader } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getBetAccountStatementModal } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import Loader from "../../Loader";
import EmptyRow from "../EmptyRow";
import Footer from "../Footer";
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
  selected,
}: {
  open: boolean;
  onClose: () => void;
  selected: any;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState<number>(15);
  const { betAccountStatementModal } = useSelector(
    (state: RootState) => state.user.profile
  );

  const transactions: any = {};

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
          <div className="d-flex align-items-center">
            <Form.Check
              inline
              label="All"
              name="group1"
              type="radio"
              id="all"
              checked={selectedOption === "all"}
              onChange={() => {
                const match = selected?.description.match(/Rno\. (\d+\.\d+)/);
                setSelectedOption("all");
                if (selected?.betId) {
                  dispatch(
                    getBetAccountStatementModal({
                      id: selected?.user?.id,
                      betId: selected?.betId,
                      sort: "betPlaced.createdAt:DESC",
                    })
                  );
                } else if (match && match[1]) {
                  dispatch(
                    getBetAccountStatementModal({
                      id: selected?.user?.id,
                      isCard: true,
                      runnerId: match[1],
                      result: `inArr${JSON.stringify(["WIN", "LOSS", "TIE"])}`,
                      sort: "betPlaced.createdAt:DESC",
                    })
                  );
                }
              }}
            />
            <Form.Check
              color="secondary"
              inline
              label="Matched"
              name="group1"
              type="radio"
              id="matched"
              checked={selectedOption === "matched"}
              onChange={() => {
                const match = selected?.description.match(/Rno\. (\d+\.\d+)/);
                setSelectedOption("matched");
                if (selected?.betId) {
                  dispatch(
                    getBetAccountStatementModal({
                      id: selected?.user?.id,
                      betId: selected?.betId,
                      status: "MATCHED",
                      sort: "betPlaced.createdAt:DESC",
                    })
                  );
                } else if (match && match[1]) {
                  dispatch(
                    getBetAccountStatementModal({
                      id: selected?.user?.id,
                      isCard: true,
                      runnerId: match[1],
                      result: `inArr${JSON.stringify(["WIN", "LOSS", "TIE"])}`,
                      sort: "betPlaced.createdAt:DESC",
                    })
                  );
                }
              }}
            />
            <Form.Check
              color="secondary"
              inline
              label="Delete"
              name="group1"
              type="radio"
              id="delete"
              checked={selectedOption === "delete"}
              onChange={() => {
                const match = selected?.description.match(/Rno\. (\d+\.\d+)/);
                setSelectedOption("delete");
                if (selected?.betId) {
                  dispatch(
                    getBetAccountStatementModal({
                      id: selected?.user?.id,
                      betId: selected?.betId,
                      status: "DELETED",
                      sort: "betPlaced.createdAt:DESC",
                    })
                  );
                } else if (match && match[1]) {
                  dispatch(
                    getBetAccountStatementModal({
                      id: selected?.user?.id,
                      runnerId: match[1],
                      isCard: true,
                      status: "DELETED",
                      sort: "betPlaced.createdAt:DESC",
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
                {!betAccountStatementModal ? ( // Check if no records
                  <EmptyRow containerStyle={{ background: "#FFE094" }} />
                ) : (
                  betAccountStatementModal?.rows?.map(
                    (item: any, index: number) => (
                      <TableRowModal
                        key={item?.transactionId}
                        index={index}
                        containerStyle={{ background: "#FFE094" }}
                        profit={true}
                        fContainerStyle={{ background: "#0B4F26" }}
                        fTextStyle={{ color: "white" }}
                        gameName={item?.gameName}
                        amount={
                          parseFloat(item?.amount) > 0 ? "CREDIT" : "DEBIT"
                        }
                        absAmount={Math.abs(item?.amount).toFixed(2)}
                        total={parseFloat(item?.total).toFixed(2)}
                        createdAt={moment(new Date(item?.createdAt)).format(
                          "YYYY-MM-DD hh:mm"
                        )}
                        roundId={item?.roundId}
                        transactionId={item?.transactionId}
                      />
                    )
                  )
                )}
              </Box>
              <Footer
                currentPage={currentPage}
                pages={Math.ceil(
                  parseInt(
                    transactions && transactions?.count
                      ? transactions?.count
                      : 1
                  ) / pageLimit
                )}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AccountStatementModal;
