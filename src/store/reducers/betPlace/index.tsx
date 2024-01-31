import { createSlice } from "@reduxjs/toolkit";
import {
  betsSuccessReset,
  getPlacedBets,
  getRunAmount,
  updateBetsPlaced,
} from "../../actions/betPlace/betPlaceActions";

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
      .addCase(getRunAmount.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
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
      .addCase(updateBetsPlaced.fulfilled, (state, action) => {
        const betId = action.payload.betId;

        if (!state.placedBets.some((item: any) => item.id === betId)) {
          state.placedBets = [action.payload, ...state.placedBets];
        }
      })
      .addCase(betsSuccessReset, (state) => {
        return { ...state, success: false };
      });
  },
});

export const placedBetReducer = placedBet.reducer;
