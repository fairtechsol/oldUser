import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const placeBet = createAsyncThunk<any, any>(
  "/placeBet",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(requestData.url, requestData.data);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response);
    }
  }
);

export const getPlacedBets = createAsyncThunk<any, any>(
  "/bet",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.BET.GETPLACEDBETS, {
        params: {
          result: `inArr${JSON.stringify(["PENDING", "UNDECLARE"])}`,
          "betPlaced.matchId": id,
          sort: "betPlaced.createdAt:DESC",
        },
      });
      if (resp) {
        return resp?.data?.rows;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getCurrentBets = createAsyncThunk<any>(
  "current/bet",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.BET.GETPLACEDBETS);
      if (resp) {
        return resp?.data?.rows;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getRunAmount = createAsyncThunk<any, any>(
  "/runAmount",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.BET.RUN_AMOUNT + "/" + id);
      if (resp) {
        return {
          betId: id,
          runAmount:
            resp?.data?.profitLoss[0] !== null
              ? JSON.parse(resp?.data?.profitLoss).betPlaced
              : [],
        };
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getPlacedBetsForAccountStatement = createAsyncThunk<any, any>(
  "placed/betForAccountStatement",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.BET.GETPLACEDBETS}?${
          requestData.betId
            ? `&betId=inArr${JSON.stringify(requestData.betId)}`
            : requestData.runnerId
            ? requestData.isCard
              ? `&betPlaced.runnerId=${requestData.runnerId}`
              : `runnerId=eq${requestData.runnerId}`
            : ""
        }${
          requestData.result
            ? `&result=${requestData.result}`
            : requestData.status
            ? `&status=${requestData.status}`
            : ""
        }${requestData.isCard ? "" : "&isCurrentBets=true"}`,
        {
          params: {
            createBy: `eq${requestData.userId}`,
            sort: "betPlaced.createdAt:DESC",
          },
        }
      );
      if (resp) {
        return resp?.data?.rows;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateBetsPlaced = createAsyncThunk<any, any>(
  "/placed/bets",
  async (placedBets) => {
    return placedBets;
  }
);
export const updateDeleteReasonBet = createAsyncThunk<any, any>(
  "/deleteReason/bets",
  async (placedBets) => {
    return placedBets;
  }
);
export const updateEditDeleteReasonBet = createAsyncThunk<any, any>(
  "/editDeleteReason/bets",
  async (placedBets) => {
    return placedBets;
  }
);

export const betsSuccessReset = createAction("success/reset");
export const betPlaceSuccessReset = createAction("betPlaceSuccess/reset");
export const resetRunAmount = createAction("resetRunAmount/reset");
export const betPlaceErrorCheck = createAction("betPlaceErrorCheck/bet");
