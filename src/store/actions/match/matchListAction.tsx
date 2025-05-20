import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const getMatchList = createAsyncThunk<any, any>(
  "/match/list",
  async ({ type, matchType, page, limit }, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.MATCH.MATCHLIST, {
        params: {
          sort: "match.startAt:ASC",
          "match.matchType": matchType,
          page: page,
          limit: limit,
        },
      });
      if (resp) {
        return { data: resp?.data, type: type };
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const matchDetailAction = createAsyncThunk<any, any>(
  "/match/details",
  async (matchId, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHDETAILS}${matchId}`
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

export const selectedBetAction = createAsyncThunk<any, any>(
  "/match/selectedBet",
  async (data) => {
    return data;
  }
);
export const selectedBetMinMax = createAsyncThunk<any, any>(
  "/match/selectedBetMinMax",
  async (data) => {
    return data;
  }
);

export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const updateMatchRatesFromApiOnList = createAsyncThunk<any, any>(
  "/updateMatchRatesFromApiOnList/rates",
  async (data) => {
    return data;
  }
);
export const setCurrentPageRedux = createAsyncThunk<any, any>(
  "/setCurrentPageRedux/rates",
  async (data) => {
    return data;
  }
);

export const matchDetailReset = createAction("matchDetail/reset");
export const matchListSuccessReset = createAction("matchListSuccess/reset");
