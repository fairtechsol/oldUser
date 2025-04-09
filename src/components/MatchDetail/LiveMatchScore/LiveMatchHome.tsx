import { Box } from "@mui/material";
import { Col, Container, Ratio, Row } from "react-bootstrap";
import { liveStreamUrl } from "../../../utils/Constants";

interface LiveMatchHomeProps {
  eventId: string | number;
}

const LiveMatchHome = ({ eventId }: LiveMatchHomeProps) => {
  return (
    <Box
      sx={{
        width: {
          md: "98%",
          xs: "98%",
          lg: "100%",
        },
        display: "flex",
        flexDirection: "column",
        marginX: { lg: "0vw", xs: "0px", md: "0px" },
        marginY: { lg: ".5vh", xs: "0px" },
        marginTop: { xs: "0px" },
        borderRadius: "2px",
        background: "white",
        padding: "1px",
        alignSelf: {
          xs: "center",
          md: "center",
          lg: "flex-start",
        },
      }}
    >
      <Container>
        <Row className="justify-content-md-center">
          <Col md={12} className="p-0">
            <Ratio aspectRatio="16x9">
              <iframe
                src={`${liveStreamUrl}${eventId}/cricket`}
                title="Live Stream"
                referrerPolicy={"strict-origin-when-cross-origin"}
              ></iframe>
            </Ratio>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default LiveMatchHome;
