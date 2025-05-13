import { combineReducers } from "@reduxjs/toolkit";
import { matchListReducer } from "./matchListSlice";
import { betPlaceReducers } from "./placeBetSlice";

export const matchReducer = combineReducers({
  matchList: matchListReducer,
  bet: betPlaceReducers,
});
