import { createSlice } from "@reduxjs/toolkit";
import {
  betPlaceSuccessReset,
  placeBet,
} from "../../actions/betPlace/betPlaceActions";
import { betDataFromSocket } from "../../actions/user/userAction";

interface InitialState {
  betPlaceData: any;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  betPlaceData: [],
  loading: false,
  success: false,
  error: null,
};

const betPlace = createSlice({
  name: "betPlace",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeBet.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(placeBet.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(placeBet.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(betDataFromSocket.fulfilled, (state, action) => {
        const betId = action.payload?.betPlaced?.placedBet?.betId;

        if (
          !state.betPlaceData.some(
            (item: any) => item.betPlaced.placedBet.betId === betId
          )
        ) {
          state.betPlaceData = [...state.betPlaceData, action.payload];
        } else {
          const existingIndex = state.betPlaceData.findIndex(
            (item: any) => item.betPlaced.placedBet.betId === betId
          );
          if (existingIndex !== -1) {
            let updatedSlice = state.betPlaceData.splice(existingIndex, 1);
            state.betPlaceData = [...updatedSlice, action.payload];
          }
        }
      })
      .addCase(betPlaceSuccessReset, (state) => {
        return { ...state, success: false };
      });
  },
});

export const betPlaceReducers = betPlace.reducer;
