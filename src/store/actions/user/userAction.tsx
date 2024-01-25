import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const marqueeNotification = createAsyncThunk<any>(
  "user/notification",
  async () => {
    try {
      const resp = await service.get(`${ApiConstants.USER.MARQUEE}`);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const getProfile = createAsyncThunk<any>("/user/profile", async () => {
  try {
    const resp = await service.get(`${ApiConstants.USER.GET_PROFILE}`);
    // console.log("API Request user: Success", resp.data);
    if (resp) {
      return resp?.data;

      
    }
   
  } catch (error: any) {
    const err = error as AxiosError;
    throw err;
  }
});

export const updateBalance = createAsyncThunk<any, any>(
  "/user/balance",
  async (balance) => {
    return balance;
  }
);

export const betDataFromSocket = createAsyncThunk<any, any>(
  "/betData/update",
  async (data) => {
    return data;
  }
);

export const getAccountStatement = createAsyncThunk<any, any>(
  "user/account/statement",
  async ({ userId, page, limit, searchBy, keyword, filter }) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.ACCOUNT_STATEMENT}${userId}?page=${
          page || 1
        }&limit=${limit || 15}&searchBy=${searchBy}&keyword=${
          keyword || ""
        }${filter}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const getButtonValue = createAsyncThunk<any>(
  "user/getButtonValue",
  async () => {
    try {
      const resp = await service.get(`${ApiConstants.USER.GET_BTN_VALUE}`);
      console.log()
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const setButtonValue = createAsyncThunk<any, any>(
  "/setButtonValues",
  async (requestData) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.SET_BTN_VALUE}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const changePasswordReset = createAction("changePassword/reset");
export const profileReset = createAction("profile/reset");
export const updateReset = createAction("update/reset");
