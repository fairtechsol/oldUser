import { useMediaQuery, useTheme } from "@mui/material"

// import AccountStatementList from "../../components/AccountStatementList";
import BackgroundLayout from "../../../components/Common/BackgroundLayout";
import AccountStatementList from "../../../components/AccountStatement/AccountStatementList";


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