import { createSlice } from "@reduxjs/toolkit";
import {
  buttonValueSuccessReset,
  getAccountStatement,
  getButtonValue,
  getProfile,
  getProfileInMatchDetail,
  marqueeNotification,
  setButtonValue,
  updateBalance,
  updateBalanceFromSocket,
  updateBalanceOnBetDelete,
  updateBalanceOnSessionResult,
  updateBalanceSession,
} from "../../actions/user/userAction";

interface InitialState {
  transactionPassword: string;
  profileDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  marqueeNotification: any;
  buttonValues: any;
  setButtonValue: any;
  buttonValueSuccess: boolean;
  transactions: any;
  matchDetails: any;
}

const initialState: InitialState = {
  marqueeNotification: null,
  transactionPassword: "",
  buttonValues: [],
  matchDetails: null,
  setButtonValue: null,
  buttonValueSuccess: false,
  profileDetail: null,
  transactions: null,
  loading: false,
  success: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(marqueeNotification.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(marqueeNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.marqueeNotification = action?.payload;
      })
      .addCase(marqueeNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profileDetail = action?.payload?.[0]?.[0];
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getProfileInMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getProfileInMatchDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profileDetail = action?.payload?.[0]?.[0];
      })
      .addCase(getProfileInMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getAccountStatement.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAccountStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.transactions = action?.payload;
      })
      .addCase(getAccountStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(setButtonValue.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.buttonValueSuccess = false;
      })
      .addCase(setButtonValue.fulfilled, (state) => {
        state.loading = false;
        state.buttonValueSuccess = true;
      })
      .addCase(setButtonValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(buttonValueSuccessReset, (state) => {
        return { ...state, buttonValueSuccess: false };
      })
      .addCase(getButtonValue.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getButtonValue.fulfilled, (state, action) => {
        state.buttonValues = action?.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getButtonValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.profileDetail = {
          ...state.profileDetail,
          userBal: {
            ...state?.profileDetail?.userBal,
            exposure: action?.payload?.newUserExposure ?? action?.payload?.exposure,
            // currentBalance: action.payload.userCurrentBalance,
          },
        };
      })
      .addCase(updateBalanceOnSessionResult.fulfilled, (state, action) => {
        state.profileDetail = {
          ...state.profileDetail,
          userBal: {
            ...state?.profileDetail?.userBal,
            exposure: action?.payload?.exposure,
            currentBalance: action?.payload?.currentBalance,
          },
        };
      })
      .addCase(updateBalanceOnBetDelete.fulfilled, (state, action) => {
        state.profileDetail = {
          ...state.profileDetail,
          userBal: {
            ...state?.profileDetail?.userBal,
            exposure: action?.payload?.exposure,
            currentBalance: action?.payload?.currentBalance,
          },
        };
      })
      .addCase(updateBalanceSession.fulfilled, (state, action) => {
        state.profileDetail = {
          ...state.profileDetail,
          userBal: {
            ...state?.profileDetail?.userBal,
            exposure: action?.payload?.newUserExposure ?? action?.payload?.exposure,
            // currentBalance:
            //   action.payload.newUserCurrentBalance ??
            //   action.payload.currentBalance,
          },
        };
      })
      .addCase(updateBalanceFromSocket.fulfilled, (state, action) => {
        state.profileDetail = {
          ...state.profileDetail,
          userBal: {
            ...state?.profileDetail?.userBal,
            currentBalance: action?.payload?.currentBalance,
            profitLoss: action?.payload?.profitLoss,
          },
        };
      });
  },
});

export const profileReducer = profileSlice.reducer;
