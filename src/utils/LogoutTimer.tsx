import { useState, useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer'
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth/authAction';

const LogoutTimer = () => {
  const [show, setShow] = useState(false)
  const [time, setTime] = useState(6)
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (show && time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if (show && time == 0) {
      dispatch(logout());
    }
  }, [time])

  const handleOnIdle = (event: any) => {
   const token = sessionStorage.getItem('userToken')
    console.log('user is idle', event)
    if(token){handleScreen()}
  }

  const handleOnActive = (event: any) => {
    console.log(event,'time remaining', getRemainingTime())

  }


  const { getRemainingTime } = useIdleTimer({
    timeout: 1000*60*5,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500
  })
  const handleHome = () => {
    window.location.href = '/match';
  }
  const handleScreen = () => {
    setShow(true)
    setTime(5)
  }
  return (
    <>
      {show && (
        <div style={{ position: "fixed", top: "0px", left: "0px", width: "100%", height: "100vh", zIndex: 99999999, backgroundColor: '#eeeeee', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
          <span style={{ fontSize: '20px', color: '#b52226', fontWeight: '600' }}>Your session has been expired,</span>
          <span style={{ fontSize: '20px', color: '#b52226', fontWeight: '600' }}>Redirected to Login in {time} seconds.</span>
          <button style={{ fontSize: '15px', color: '#fff', backgroundColor: '#000', borderRadius: '5px',marginTop:'5px' }} onClick={handleHome}>Back to Home</button>
        </div>
      )}
    </>
  )

}

export default LogoutTimer;
