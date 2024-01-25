import { useMediaQuery, useTheme } from "@mui/material"

// import AccountStatementList from "../../components/AccountStatementList";
import BackgroundLayout from "../../../components/Common/BackgroundLayout";
import AccountStatementList from "../../../components/AccountStatement/AccountStatementList";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAccountStatement } from "../../../store/actions/user/userAction";


const AccountStatement = () => {
    const theme = useTheme()

    const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"))

    return (
        // <BackgroundLayout>
            <AccountStatementList />
        // </BackgroundLayout>
    )
}
export default AccountStatement;