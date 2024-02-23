import { createSlice } from "@reduxjs/toolkit";
import {
  betsSuccessReset,
  getCurrentBets,
  getPlacedBets,
  getRunAmount,
  updateBetsPlaced,
} from "../../actions/betPlace/betPlaceActions";
import { updateRunAmount } from "../../actions/user/userAction";

interface InitialState {
  placedBets: any;
  runAmount: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  placedBets: [],
  runAmount: [],
  loading: false,
  success: false,
  error: null,
};

const placedBet = createSlice({
  name: "placedBet",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlacedBets.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.placedBets = [];
      })
      .addCase(getPlacedBets.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.placedBets = action.payload;
      })
      .addCase(getPlacedBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getCurrentBets.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.placedBets = [];
      })
      .addCase(getCurrentBets.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.placedBets = action.payload;
      })
      .addCase(getCurrentBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getRunAmount.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.runAmount = [];
      })
      .addCase(getRunAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.runAmount = action.payload;
      })
      .addCase(getRunAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateRunAmount.fulfilled, (state, action) => {
        state.runAmount = JSON.parse(action.payload).betPlaced;
      })
      .addCase(updateBetsPlaced.fulfilled, (state, action) => {
        const betId = action.payload.betId;
        const isBetAlreadyPlaced = state.placedBets.find(
          (item: any) => item.id === betId
        );
        if (!isBetAlreadyPlaced) {
          state.placedBets = [action.payload, ...state.placedBets];
        }
      })
      .addCase(betsSuccessReset, (state) => {
        return { ...state, success: false };
      });
  },
});

export const placedBetReducer = placedBet.reducer;
