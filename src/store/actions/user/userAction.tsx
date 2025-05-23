import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const marqueeNotification = createAsyncThunk<any>(
  "user/notification",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.USER.MARQUEE);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getProfile = createAsyncThunk<any>(
  "/user/profile",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.USER.GET_PROFILE);
      if (resp) {
        if (resp?.data[0][0]?.loginAt === null) {
          window.location.replace("/login");
          sessionStorage.clear();
        } else {
          return resp?.data[0][0];
        }
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getProfileInMatchDetail = createAsyncThunk<any>(
  "/user/profileInMatchDetail",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.USER.GET_PROFILE);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateBalance = createAsyncThunk<any, any>(
  "/user/balance",
  async (balance) => {
    return balance;
  }
);
export const updateTeamRateOnUndeclare = createAsyncThunk<any, any>(
  "/user/updateTeamRateOnUndeclare",
  async (balance) => {
    return balance;
  }
);
export const updateProfitLossOnDeleteSession = createAsyncThunk<any, any>(
  "/user/profitLoss/deleteSession",
  async (balance) => {
    return balance;
  }
);
export const updateBetDataOnDeclare = createAsyncThunk<any, any>(
  "/user/betData/declare",
  async (balance) => {
    return balance;
  }
);
export const updateBetDataOnUndeclare = createAsyncThunk<any, any>(
  "/user/betData/undeclare",
  async (balance) => {
    return balance;
  }
);
export const updateTeamRatesOnDeleteMatch = createAsyncThunk<any, any>(
  "/user/profitLoss/deleteMatch",
  async (balance) => {
    return balance;
  }
);
export const updateBalanceOnBetDelete = createAsyncThunk<any, any>(
  "/user/balanceOnBetDelete",
  async (balance) => {
    return balance;
  }
);
export const updateBalanceOnSessionResult = createAsyncThunk<any, any>(
  "/user/balanceOnSessionResult",
  async (balance) => {
    return balance;
  }
);
export const updateBalanceSession = createAsyncThunk<any, any>(
  "/user/balanceSession",
  async (balance) => {
    return balance;
  }
);
export const updateBalanceFromSocket = createAsyncThunk<any, any>(
  "/user/balanceFromSocket",
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
export const updateMaxLossForBet = createAsyncThunk<any, any>(
  "/maxLoss/update",
  async (data) => {
    return data;
  }
);
export const updateRunAmount = createAsyncThunk<any, any>(
  "/runAmount/update",
  async (data) => {
    return data;
  }
);
export const updateRunAmountOnDeleteBet = createAsyncThunk<any, any>(
  "/runAmount/updateOnDeleteSessionBet",
  async (data) => {
    return data;
  }
);
export const updateProfitLossForBet = createAsyncThunk<any, any>(
  "/profitLoss/update",
  async (data) => {
    return data;
  }
);
export const getAccountStatement = createAsyncThunk<any, any>(
  "user/account/statement",
  async ({ userId, page, limit, searchBy, keyword, filter }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.ACCOUNT_STATEMENT}${userId}?${filter ?? ""}`,
        {
          params: {
            sort: "transaction.createdAt:DESC,transaction.uniqueId:DESC",
            page: page || 1,
            limit,
            searchBy,
            keyword,
          },
        }
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getButtonValue = createAsyncThunk<any>(
  "user/getButtonValue",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.USER.GET_BTN_VALUE);

      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const setButtonValue = createAsyncThunk<any, any>(
  "/setButtonValues",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.USER.SET_BTN_VALUE,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMatchWiseProfitLoss = createAsyncThunk<any, any>(
  "/matchWiseProfitLoss",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.USER.MATCH_WISE_PROFITLOSS,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMatchWiseProfitLossCard = createAsyncThunk<any, any>(
  "/matchWiseProfitLossCard",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.CARDS.REPORT.GET_GAME_WISE_PROFIT_LOSS,
        requestData
      );
      if (resp) {
        return resp?.data?.result;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getUserTotalProfitLoss = createAsyncThunk<any, any>(
  "/usrTotalProfitLoss",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.USER.TOTAL_PROFITLOSS,
        requestData?.filter ? requestData?.filter : requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getUserTotalProfitLossCard = createAsyncThunk<any, any>(
  "/usrTotalProfitLossCard",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.CARDS.REPORT.GET_TOTAL_PROFIT_LOSS,
        requestData?.filter ? requestData?.filter : requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getTotalBetProfitLoss = createAsyncThunk<any, any>(
  "/totalBetProfitLoss",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.USER.TOTAL_BET_PROFITLOSS,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getTotalBetProfitLossCard = createAsyncThunk<any, any>(
  "/totalBetProfitLossCard",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.CARDS.REPORT.GET_TOTAL_BET_PROFIT_LOSS,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getSessionProfitLoss = createAsyncThunk<any, any>(
  "/sessionProfitLoss",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.USER.TOTAL_SESSION_PROFITLOSS,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateUserSearchId = createAsyncThunk<any, any>(
  "/maxLoss/updateUserSearchId",
  async (data) => {
    return data;
  }
);
export const updateLogoutModal = createAsyncThunk<any, any>(
  "/modal/updateLogoutModal",
  async (data) => {
    return data;
  }
);
export const changePasswordReset = createAction("changePassword/reset");
export const profileReset = createAction("profile/reset");
export const updateReset = createAction("update/reset");
