import { Box } from "@mui/material";
import Loader from "../Loader";
import ListHeaderT from "./ListheaderT";
import TableRow from "./TableRow";
import EmptyRow from "./EmptyRow";
import Footer from "./Footer";
import ListH from "./ListH";
import YellowHeader from "./YellowHeader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getAccountStatement } from "../../store/actions/user/userAction";

const AccountStatementList = () => {
  const [loading] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(15);
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const { transactions, profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  useEffect(() => {
    if (profileDetail?.id) {
      let filter = "";
      if (fromDate && toDate) {
        filter += `&createdAt=between${moment(fromDate)?.format(
          "YYYY-MM-DD"
        )}|${moment(toDate).add(1, "days")?.format("YYYY-MM-DD")}`;
      } else if (fromDate) {
        filter += `&createdAt=gte${moment(fromDate)?.format("YYYY-MM-DD")}`;
      } else if (toDate) {
        filter += `&createdAt=lte${moment(toDate)?.format("YYYY-MM-DD")}`;
      }
      dispatch(
        getAccountStatement({
          userId: profileDetail?.id,
          page: currentPage,
          limit: pageLimit,
          filter: filter,
          searchBy: "description,user.userName,actionByUser.userName",
          keyword: searchValue,
        })
      );
    }
  }, [profileDetail, currentPage, pageLimit]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ marginX: { xs: "2vw", lg: "1vw" } }}>
        <YellowHeader
          fromDate={fromDate}
          toDate={toDate}
          getAccountStatement={() => {
            let filter = "";
            if (fromDate && toDate) {
              filter += `&createdAt=between${moment(fromDate)?.format(
                "YYYY-MM-DD"
              )}|${moment(toDate).add(1, "days")?.format("YYYY-MM-DD")}`;
            } else if (fromDate) {
              filter += `&createdAt=gte${moment(fromDate)?.format(
                "YYYY-MM-DD"
              )}`;
            } else if (toDate) {
              filter += `&createdAt=lte${moment(toDate)?.format("YYYY-MM-DD")}`;
            }
            setCurrentPage(1);
            dispatch(
              getAccountStatement({
                userId: profileDetail?.id,
                page: 1,
                searchBy: "description,user.userName,actionByUser.userName",
                keyword: searchValue,
                limit: pageLimit,
                filter: filter,
              })
            );
          }}
          setToDate={setToDate}
          setFromDate={setFromDate}
        />
      </Box>

      <Box
        sx={[
          {
            marginX: { xs: "2vw", lg: "1vw" },
            minHeight: "100px",
            borderRadius: "2px",
            border: "2px solid white",
            width: "97.5%",
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
            background: "#F8C851",
          },
        ]}
      >
        <ListH
          searchFor={"accountStatement"}
          pageLimit={pageLimit}
          setPageLimit={setPageLimit}
          fromDate={fromDate}
          toDate={toDate}
          setCurrentPage={setCurrentPage}
          setSearchValue={setSearchValue}
        />

        {loading ? (
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
              <ListHeaderT />
              {transactions?.transactions?.length === 0 ? ( // Check if no records
                <EmptyRow containerStyle={{ background: "#FFE094" }} />
              ) : (
                transactions?.transactions?.map((item: any) => (
                  <TableRow
                    key={item?.id}
                    index={item?.id}
                    containerStyle={{ background: "#FFE094" }}
                    profit={true}
                    fContainerStyle={{ background: "#0B4F26" }}
                    fTextStyle={{ color: "white" }}
                    date={item?.createdAt}
                    description={item?.description}
                    closing={item?.closingBalance}
                    transType={item?.transType}
                    amount={item?.amount}
                    fromuserName={item?.actionByUser?.userName}
                    touserName={item?.user?.userName}
                  />
                ))
              )}
            </Box>
            <Footer
              currentPage={currentPage}
              pages={Math.ceil(
                parseInt(
                  transactions && transactions?.count ? transactions?.count : 1
                ) / pageLimit
              )}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default AccountStatementList;
