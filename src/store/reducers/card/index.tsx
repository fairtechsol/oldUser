import { combineReducers } from "@reduxjs/toolkit";
import { cardDetailReducers } from "./cardDetailSlice";

export const cardGamesReducer = combineReducers({
  cardDetail: cardDetailReducers,
});
