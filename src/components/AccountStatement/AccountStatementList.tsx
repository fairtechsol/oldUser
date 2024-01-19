import { Box } from "@mui/material";




import Loader from "../Loader";
import ListHeaderT from "./ListheaderT";
import TableRow from "./TableRow";
import EmptyRow from "./EmptyRow";
import Footer from "./Footer";
import ListH from "./ListH";
import YellowHeader from "./YellowHeader";
import { useState } from "react";


const AccountStatementList = () => {
    const [loading, setLoading] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ marginX: { xs: "2vw", lg: "1vw" } }}>
        <YellowHeader
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
        <ListH/>

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
            
                    <TableRow
                    //   key={item?.id}
                    //   index={item?.id}
                    //   containerStyle={{ background: "#FFE094" }}
                    //   profit={true}
                    //   fContainerStyle={{ background: "#0B4F26" }}
                    //   fTextStyle={{ color: "white" }}
                    //   date={item?.createAt}
                    //   closing={item?.current_amount}
                    //   trans_type={item?.trans_type}
                    //   amount={item?.amount}
                    //   description={item?.description}
                    //   fromuserName={item?.action_by?.userName}
                    //   touserName={item?.user?.userName}
                    />



                <EmptyRow containerStyle={{ background: "#FFE094" }} />

            </Box>
            <Footer
            //   currenLimit={currenLimit}
            //   currentPage={currentPage}
            //   pages={pageCount}
            //   callPage={callPage}
            />
          </>
        )}
      </Box>
    </Box>
  );
};






export default AccountStatementList;
