import { useMediaQuery, useTheme } from "@mui/material";
import { Modal } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FgLogo } from "../../../assets";
import { RootState } from "../../../store/store";

const LiveCasinoModal = ({ isShow, setIsShow }: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const { liveCasinoGame } = useSelector(
    (state: RootState) => state.card.cardDetail
  );

  return (
    <Modal show={isShow} fullscreen={true} onHide={() => setIsShow(false)}>
      <Modal.Header style={{ color: "#fff", backgroundColor: "#004A25" }}>
        <Modal.Title className="w-100">
          <div className="w-100 d-flex justify-content-between align-items-center">
            <div
              className="d-flex flex-row align-items-center"
              onClick={() => {
                setIsShow(false);
              }}
            >
              <FaHome color="#fff" size={matchesMobile ? 20 : 40} />
              <img
                src={FgLogo}
                width={"auto"}
                alt="fairGame"
                style={{
                  margin: "5px 5px 0",
                  maxWidth: matchesMobile ? "150px" : "250px",
                  display: "inline-block",
                  cursor: "pointer",
                }}
              />
            </div>

            <div
              style={{
                fontSize: "14px",
              }}
            >
              <div>
                Balance:
                <b>
                  {parseFloat(
                    profileDetail?.userBal?.currentBalance || 0
                  ).toFixed(2)}
                </b>
              </div>
              <div>
                <span className="white-text cursor-pointer">
                  Exposure:
                  <b>
                    {parseInt(profileDetail?.userBal?.exposure) === 0
                      ? 0
                      : -parseFloat(
                          profileDetail?.userBal?.exposure || 0
                        ).toFixed(2)}
                  </b>
                </span>
              </div>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="w-100 h-100">
          <iframe
            src={liveCasinoGame?.url}
            title="Live Stream"
            referrerPolicy="strict-origin-when-cross-origin"
            width="100%"
            height="100%"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LiveCasinoModal;
