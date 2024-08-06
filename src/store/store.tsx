import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authReducer";
import { userReducer } from "./reducers/user";
import { matchReducer } from "./reducers/match";
import { placedBetReducer } from "./reducers/betPlace";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    match: matchReducer,
    bets: placedBetReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
