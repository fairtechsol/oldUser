import { createSlice } from "@reduxjs/toolkit";
import {
  liveCasinoList,
  liveCasinoLogin,
  transactionProviderBets,
  transactionProviderBetsReset,
  transactionProviderName,
} from "../../actions/card/cardDetail";

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
  liveCasinoData: any;
  liveCasinoGame: any;
  liveCasinoProvider: any;
  liveCasinoProviderBets: any;
}

const initialState: InitialState = {
  loading: false,
  success: false,
  error: null,
  liveCasinoData: [],
  liveCasinoGame: {},
  liveCasinoProvider: [],
  liveCasinoProviderBets: [],
};

const cardDetail = createSlice({
  name: "match",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(liveCasinoList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.liveCasinoData = null;
      })
      .addCase(liveCasinoList.fulfilled, (state, action) => {
        state.loading = false;
        state.liveCasinoData = action.payload;
      })
      .addCase(liveCasinoList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(liveCasinoLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.liveCasinoGame = null;
      })
      .addCase(liveCasinoLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.liveCasinoGame = action.payload;
      })
      .addCase(liveCasinoLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(transactionProviderName.pending, (state) => {
        state.error = null;
      })
      .addCase(transactionProviderName.fulfilled, (state, action) => {
        state.liveCasinoProvider = action.payload.map((provider: any) => ({
          label: provider,
          value: provider,
        }));
      })
      .addCase(transactionProviderName.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(transactionProviderBets.pending, (state) => {
        state.error = null;
      })
      .addCase(transactionProviderBets.fulfilled, (state, action) => {
        state.liveCasinoProviderBets = action.payload;
      })
      .addCase(transactionProviderBets.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(transactionProviderBetsReset, (state) => {
        state.liveCasinoProviderBets = [];
      });
  },
});

export const cardDetailReducers = cardDetail.reducer;
