import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "./profileSlice";
import { profitLossReportReducers } from "./profitLossReport";

export const userReducer = combineReducers({
  profile: profileReducer,
  profitLoss: profitLossReportReducers,
});
