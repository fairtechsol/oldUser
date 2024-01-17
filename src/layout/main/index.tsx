import { memo} from "react";

import CustomHeader from "./header/CustomHeader";
import { Outlet } from "react-router-dom";
import BackgroundLayout from "../../components/Common/BackGroundLayout";
import Matches from "../../pages/match";

const MainLayout = () => {
//   const navigate = useNavigate();
//   const dispatch: AppDispatch = useDispatch();

//   useEffect(() => {
//     if (!sessionStorage.getItem("userToken")) {
//       navigate("/wallet/login");
//     }
//     dispatch(getUsersProfile());
//     dispatch(marqueeNotification());
//   }, []);

//   useEffect(() => {
//     if (sessionStorage.getItem("userToken")) {
//       socketService.connect();
//       socketService.auth.logout();
//     }
//     return () => {
//       socketService.disconnect();
//     };
//   }, [sessionStorage.getItem("userToken")]);

  return (
    <>
      <CustomHeader />
      <BackgroundLayout>
        <Outlet />
      </BackgroundLayout>
      
    </>
  );
};

export default memo(MainLayout);
