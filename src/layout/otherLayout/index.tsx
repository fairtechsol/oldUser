import { memo } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";

const OtherLayout = () => {
  return (
    <div className="main-container">
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default memo(OtherLayout);
