import { Box } from "@mui/material";
import { Col, Container, Ratio, Row } from "react-bootstrap";
import { liveStreamCricketPageUrl } from "../../../utils/Constants";

const LiveMatchHome = ({ eventId }: any) => {
  return (
    <>
      <Box
        sx={[
          {
            width: {
              md: "98%",
              xs: "98%",
              lg: "100%",
            },
            display: "flex",
            flexDirection: "column",
            // alignSelf: "center",
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
          },
        ]}
      >
        {/* <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "13px", md: "10px", xs: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              Live Match
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
              // '#262626'
            }}
          >
            <div className="slanted"></div>
          </Box>

          <Box
            sx={{
              flex: 1,
              background: "#262626",
              // '#262626' ,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <img
              onClick={() => {
                setVisible(!visible);
              }}
              src={ARROWUP}
              style={{
                transform: !visible ? "rotate(180deg)" : "rotate(0deg)",
                width: "16px",
                height: "16px",
                marginRight: "3px",
                marginLeft: "5px",
              }}
              alt={"Banner"}
            />
          </Box>
        </Box> */}
        {/* {!visible && ( */}
        <Container>
          <Row className="justify-content-md-center">
            <Col md={12} className="p-0">
              <Ratio aspectRatio="16x9">
                <iframe
                  src={`${liveStreamCricketPageUrl}${eventId}`}
                  title="Live Stream"
                  referrerPolicy={"strict-origin-when-cross-origin"}
                ></iframe>
              </Ratio>
            </Col>
          </Row>
        </Container>
        {/* )} */}
      </Box>
    </>
  );
};

export default LiveMatchHome;
