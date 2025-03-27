import { createSlice } from "@reduxjs/toolkit";
import {
  betPlaceErrorCheck,
  betPlaceSuccessReset,
  placeBet,
} from "../../actions/betPlace/betPlaceActions";
import { betDataFromSocket } from "../../actions/user/userAction";

interface InitialState {
  betPlaceData: any;
  loading: boolean;
  success: boolean;
  error: any;
  betPlaceError: any;
}

const initialState: InitialState = {
  betPlaceData: [],
  loading: false,
  success: false,
  error: null,
  betPlaceError: false,
};

const betPlace = createSlice({
  name: "betPlace",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeBet.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(placeBet.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(placeBet.rejected, (state, action: any) => {
        const { data } = action?.payload;
        state.loading = false;
        if (data?.statusCode == 400) {
          state.betPlaceError = true;
        }
        state.error = data?.message;
      })
      .addCase(betDataFromSocket.fulfilled, (state, action) => {
        const betId = action?.payload?.betPlaced?.placedBet?.betId;

        if (
          !state?.betPlaceData?.some(
            (item: any) => item?.betPlaced?.placedBet?.betId === betId
          )
        ) {
          state.betPlaceData = [...state.betPlaceData, action?.payload];
        } else {
          const existingIndex = state?.betPlaceData?.findIndex(
            (item: any) => item?.betPlaced?.placedBet?.betId === betId
          );
          if (existingIndex !== -1) {
            let updatedSlice = state?.betPlaceData?.splice(existingIndex, 1);
            state.betPlaceData = [...updatedSlice, action?.payload];
          }
        }
      })
      .addCase(betPlaceSuccessReset, (state) => {
        return { ...state, success: false };
      })
      .addCase(betPlaceErrorCheck, (state) => {
        state.error = null;
        state.betPlaceError = false;
      });
  },
});

export const betPlaceReducers = betPlace.reducer;
