import { Button, Modal } from 'react-bootstrap';
import { IoCloseCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { changePasswordReset } from '../../store/actions/auth/authAction';
import { useDispatch } from 'react-redux';

const NavigateModal = ({
 
  setShowModal,
  closeBtn,
  functionDispatch,
  navigateTo,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Modal
      show={true}
      onHide={() => {
        setShowModal(false);
        dispatch(changePasswordReset());
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton={closeBtn}>
        {closeBtn && (
          <IoCloseCircle
            style={{
              position: 'absolute',
              right: '10px',
              top: '10px',
              color: '#fff',
              fontSize: '28px',
            }}
          />
        )}
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        
          <Button
            variant="success"
            onClick={() => {
              setShowModal(false);
              functionDispatch();
              navigate(navigateTo);
            }}
          >
           
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NavigateModal;
