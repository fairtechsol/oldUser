import { createSlice } from "@reduxjs/toolkit";
import {
  getAccountStatement,
  getButtonValue,
  getProfile,
  marqueeNotification,
  setButtonValue,
  updateBalance,
} from "../../actions/user/userAction";

interface InitialState {
  transactionPassword: string;
  profileDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  marqueeNotification: any;
  getProfile: any;
  buttonValues: any;
  setButtonValue: any;
  transactions: any;
  matchDetails: any;
}

const initialState: InitialState = {
  getProfile: null,
  marqueeNotification: null,
  transactionPassword: "",
  buttonValues: [],
  matchDetails: null,
  setButtonValue: null,
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
        state.marqueeNotification = action.payload;
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
        state.getProfile = action.payload?.[0]?.[0];
      })
      .addCase(getProfile.rejected, (state, action) => {
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
        state.transactions = action.payload;
      })
      .addCase(getAccountStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(setButtonValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setButtonValue.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setButtonValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getButtonValue.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getButtonValue.fulfilled, (state, action) => {
        state.buttonValues = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getButtonValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            exposure: action.payload.newUserExposure ?? action.payload.exposure,
          },
        };
      });
  },
});

export const profileReducer = profileSlice.reducer;
