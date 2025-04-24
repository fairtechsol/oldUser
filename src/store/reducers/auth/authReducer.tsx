import { createReducer } from "@reduxjs/toolkit";
import {
  authReset,
  checkOldPassword,
  login,
  logout,
} from "../../actions/auth/authAction";

const initialState = {
  success: false,
  loading: false,
  forceChangePassword: false,
  isTransPasswordCreated: false,
  userRole: "",
  oldPasswordMatched: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      const { roleName, forceChangePassword, isTransPasswordCreated } =
        action.payload;
      state.loading = false;
      state.success = true;
      state.userRole = roleName;
      state.forceChangePassword = forceChangePassword;
      state.isTransPasswordCreated = isTransPasswordCreated;
    })
    .addCase(login.rejected, (state) => {
      state.loading = false;
    })
    .addCase(logout.pending, (state) => {
      state.loading = true;
    })
    .addCase(logout.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(logout.rejected, (state) => {
      state.loading = false;
    })
    .addCase(checkOldPassword.pending, (state) => {
      state.loading = true;
      state.oldPasswordMatched = false;
    })
    .addCase(checkOldPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.oldPasswordMatched = action.payload;
    })
    .addCase(checkOldPassword.rejected, (state) => {
      state.loading = false;
    })
    .addCase(authReset, (state) => {
      state.success = false;
      state.forceChangePassword = false;
    });
});
