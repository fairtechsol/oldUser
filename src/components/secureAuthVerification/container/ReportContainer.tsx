import { useMediaQuery, useTheme } from "@mui/material";
import React, { memo } from "react";
import { Container } from "react-bootstrap";
import BetTableHeader from "./BetTableHeader";
interface ReportContainerProps {
  title: string;
  children: React.ReactNode;
}
const ReportContainer = ({ title, children }: ReportContainerProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Container fluid className={`${matchesMobile ? "p-0" : ""}`}>
      <div>
        <BetTableHeader
          customClass={`${
            !matchesMobile && "rounded-top-1 mt-2 rounded-bottom-0"
          } py-1`}
          customTextClass={`${
            matchesMobile ? "title-18 f500" : "title-22 f500"
          }`}
          title={title}
        />
      </div>
      <div className={`${!matchesMobile && "borderTable border py-3"} px-1`}>
        {children}
      </div>
    </Container>
  );
};

export default memo(ReportContainer);
