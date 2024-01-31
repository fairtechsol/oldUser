import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { AxiosError } from "axios";
import { ApiConstants } from "../../../utils/Constants";


export const placeBet = createAsyncThunk<any, any>(
  "/placeBet",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(`${requestData.url}`, requestData.data);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getPlacedBets = createAsyncThunk<any, any>(
  "/bet",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.BET.GETPLACEDBETS}?status=PENDING&betPlaced.matchId=${id}`
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

export const getRunAmount = createAsyncThunk<any, any>(
  "/runAmount",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.BET.RUN_AMOUNT}/${id}`);
      if (resp) {
        return JSON.parse(resp?.data?.profitLoss).betPlaced;
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

export const betsSuccessReset = createAction("success/reset");
export const betPlaceSuccessReset = createAction("betPlaceSuccess/reset");
