import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authReducer";
import { placedBetReducer } from "./reducers/betPlace";
import { cardGamesReducer } from "./reducers/card";
import { matchReducer } from "./reducers/match";
import { userReducer } from "./reducers/user";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    match: matchReducer,
    bets: placedBetReducer,
    card: cardGamesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
