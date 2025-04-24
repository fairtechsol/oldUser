import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import moment from "moment";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

const combineAllGames = (gameData: any) => {
  const result: any = { All: {} };

  const AllCategories = new Set();
  Object.keys(gameData).forEach((provider) => {
    if (provider === "All") return;

    Object.keys(gameData[provider]).forEach((category) => {
      if (category === "All") return;
      AllCategories.add(category);
    });
  });

  AllCategories.forEach((category: any) => {
    result.All[category] = [];
  });

  Object.keys(gameData).forEach((provider) => {
    if (provider === "All") return;

    result[provider] = { ...gameData[provider] };

    result[provider].All = [];

    Object.keys(gameData[provider]).forEach((category) => {
      if (category === "All") return;

      if (Array.isArray(gameData[provider][category])) {
        result[provider].All = result[provider].All.concat(
          gameData[provider][category]
        );

        result.All[category] = result.All[category].concat(
          gameData[provider][category]
        );
      }
    });
  });

  return result;
};

const combineGameCasino = (gameData: any) => {
  const result: any = {};

  Object.keys(gameData).forEach((provider) => {
    if (provider === "All") return;

    result[provider] = { ...gameData[provider] };

    result[provider].All = [];

    Object.keys(gameData[provider]).forEach((category) => {
      if (category === "All") return;

      if (Array.isArray(gameData[provider][category])) {
        result[provider].All = result[provider].All.concat(
          gameData[provider][category]
        );
      }
    });
  });

  return result;
};

export const liveCasinoList = createAsyncThunk<any, any>(
  "result/liveCasinoList",
  async (_, thunkApi) => {
    try {
      const resp = await service.post(ApiConstants.LiveCasinoGame);
      if (resp?.data) {
        const updateData = combineAllGames(resp?.data);
        const updateDataCasino = combineGameCasino(resp?.data);
        return { casino: updateDataCasino, intCasino: updateData };
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const liveCasinoLogin = createAsyncThunk<any, any>(
  "result/liveCasinoLogin",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.LiveCasinoGameLogin,
        requestData
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const transactionProviderName = createAsyncThunk<any, any>(
  "result/transactionProviderName",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.LiveCasinoGameProvider);
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const transactionProviderBets = createAsyncThunk<any, any>(
  "result/transactionProviderBets",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.LiveCasinoGameBets}/${requestData?.id}`,
        {
          params: {
            sort: "virtualCasinoBetPlaced.createdAt:ASC",
            providerName: `eq${requestData?.name}`,
            createdAt: `between${moment(new Date(requestData?.date))?.format(
              "YYYY-MM-DD"
            )}|${moment(
              new Date(requestData?.date).setDate(
                new Date(requestData?.date).getDate() + 1
              )
            )?.format("YYYY-MM-DD")}`,
          },
        }
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const transactionProviderBetsReset = createAction(
  "transactionProviderBetsReset/reset"
);
