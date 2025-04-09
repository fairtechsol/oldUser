import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

interface LoginData {
  userName: string;
  password: string;
  loginType: string;
}

interface ChangePassword {
  userId?: string;
  newPassword: string;
  confirmPassword: string;
}

export const login = createAsyncThunk<any, LoginData>(
  "auth/login",
  async (requestData, thunkApi) => {
    try {
      const { data } = await service.post(ApiConstants.AUTH.LOGIN, requestData);
      const { token } = data;
      sessionStorage.setItem("jwtUser", token);
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const changePassword = createAsyncThunk<any, ChangePassword>(
  "user/changePassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.AUTH.CHANGEPASSWORD,
        requestData
      );
      if (resp) {
        sessionStorage.clear();
        window.location.replace("/login");
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const checkOldPassword = createAsyncThunk<any, any>(
  "check/oldPassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.AUTH.OLD_PASSWORD,
        requestData
      );
      if (resp) {
        return resp?.data?.isPasswordMatch;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const logout = createAsyncThunk<any>(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const response = await service.post(ApiConstants.AUTH.LOGOUT);
      sessionStorage.clear();
      window.location.replace("/login");
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const authReset = createAction("auth/reset");
export const changePasswordReset = createAction("changePasswordReset/reset");
