import { Pagination, Box } from "@mui/material";
import { memo, useState } from "react";
import { } from "@mui/material";

import Odds from "./Odds";
import { useDispatch } from "react-redux";

import { Constants } from "../../../utils/Constants";


import CustomLoader from "../../Loader/index";

const MatchesComponent = ({
    loader,
}: any) => {
    // const classes=useStyle()
    const [matchData, setMatchData] = useState([]);
    const [pageCount, setPageCount] = useState(Constants.pageCount);
    const [currentPage, setCurrentPage] = useState(1);

    const [pageLimit, setPageLimit] = useState(Constants.customPageLimit);
    const dispatch = useDispatch();




    return (
        <>
            <Odds onClick={() => { }}
                top={true}
                blur={false} />
            <Pagination
                page={currentPage}
                className="whiteTextPagination d-flex justify-content-center"
                count={pageCount}
                color="primary"

            />

            {loader && <CustomLoader text="" />}
            {loader && (
                <Box
                    sx={{
                        minHeight: "90vh",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CustomLoader height={"70vh"} text={""} />
                </Box>
            )}
        </>
    );
};

export default memo(MatchesComponent);
