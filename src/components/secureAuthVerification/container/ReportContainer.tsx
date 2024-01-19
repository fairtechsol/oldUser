import React from 'react';
import { Container } from 'react-bootstrap';


import isMobile from './isMobile';
import BetTableHeader from './BetTableHeader';
interface ReportContainerProps {
    title: string;
    children: React.ReactNode;
  }
const ReportContainer = ({title,children}:ReportContainerProps) => {
  return (
    <Container fluid className={`${isMobile?"p-0":""}`}>
      <div>
        <BetTableHeader customClass={`${!isMobile&&"rounded-top-1 mt-2 rounded-bottom-0"} py-1`} customTextClass={`${isMobile?"title-18 f500":"title-22 f500"}`} title={title} />
      </div>
      <div className={`${!isMobile&&"borderTable border py-3"} px-1`}>
       {children}
      </div>
    </Container>
  );
}

export default ReportContainer;
