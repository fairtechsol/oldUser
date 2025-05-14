import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchWiseProfitLoss,
  getMatchWiseProfitLossCard,
  getSessionProfitLoss,
  getTotalBetProfitLoss,
  getTotalBetProfitLossCard,
  getUserTotalProfitLoss,
  getUserTotalProfitLossCard,
  updateLogoutModal,
  updateUserSearchId,
} from "../../actions/user/userAction";

interface InitialState {
  matchWiseProfitLoss: [];
  matchWiseProfitLossCount: any;
  matchWiseProfitLossCard: [];
  userTotalProfitLoss: [];
  userTotalProfitLossCard: [];
  totalBetProfitLoss: [];
  totalBetProfitLossCard: [];
  totalSessionProfitLoss: [];
  success: boolean;
  loading: boolean;
  error: any;
  userData: any;
  logoutModal: boolean;
}

const initialState: InitialState = {
  matchWiseProfitLoss: [],
  matchWiseProfitLossCount: 0,
  matchWiseProfitLossCard: [],
  userTotalProfitLoss: [],
  userTotalProfitLossCard: [],
  totalBetProfitLoss: [],
  totalBetProfitLossCard: [],
  totalSessionProfitLoss: [],
  loading: false,
  success: false,
  error: null,
  userData: {},
  logoutModal: false,
};

const profitLossReportSlice = createSlice({
  name: "profitLossReport",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchWiseProfitLoss.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.matchWiseProfitLoss = [];
      })
      .addCase(getMatchWiseProfitLoss.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchWiseProfitLoss = action.payload?.result;
        state.matchWiseProfitLossCount = action.payload?.count;
      })
      .addCase(getMatchWiseProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getMatchWiseProfitLossCard.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.matchWiseProfitLossCard = [];
      })
      .addCase(getMatchWiseProfitLossCard.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchWiseProfitLossCard = action.payload;
      })
      .addCase(getMatchWiseProfitLossCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getUserTotalProfitLoss.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.userTotalProfitLoss = [];
      })
      .addCase(getUserTotalProfitLoss.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userTotalProfitLoss = action.payload;
      })
      .addCase(getUserTotalProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getUserTotalProfitLossCard.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.userTotalProfitLossCard = [];
      })
      .addCase(getUserTotalProfitLossCard.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userTotalProfitLossCard = action.payload;
      })
      .addCase(getUserTotalProfitLossCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getTotalBetProfitLoss.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.totalBetProfitLoss = [];
      })
      .addCase(getTotalBetProfitLoss.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.totalBetProfitLoss = action.payload;
      })
      .addCase(getTotalBetProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getTotalBetProfitLossCard.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.totalBetProfitLossCard = [];
      })
      .addCase(getTotalBetProfitLossCard.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.totalBetProfitLossCard = action.payload;
      })
      .addCase(getTotalBetProfitLossCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getSessionProfitLoss.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.totalSessionProfitLoss = [];
      })
      .addCase(getSessionProfitLoss.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.totalSessionProfitLoss = action.payload;
      })
      .addCase(getSessionProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateUserSearchId.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.userData = action.payload?.search;
      })
      .addCase(updateLogoutModal.fulfilled, (state, action) => {
        state.logoutModal = action.payload?.modal;
      });
  },
});

export const profitLossReportReducers = profitLossReportSlice.reducer;
