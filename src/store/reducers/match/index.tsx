import { combineReducers } from "@reduxjs/toolkit";
import { matchListReducer } from "./matchListSlice";
// import { sidebarListReducer } from "./sidebarListSlice";
// import { betPlaceReducers } from "./placeBetSlice";

export const matchReducer = combineReducers({
  matchList: matchListReducer,
//   sidebarList: sidebarListReducer,
//   bet: betPlaceReducers,
});
