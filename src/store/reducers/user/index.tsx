import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "./profileSlice";
import { profitLossReportReducers } from "./profitLossReport";
// import { userListReducers } from "./userListSlice";
// import { userUpdateReducer } from "./userUpdateSlice";

export const userReducer = combineReducers({
  profile: profileReducer,
  profitLoss: profitLossReportReducers,
  //   userUpdate: userUpdateReducer,
  //   userList: userListReducers,
});
