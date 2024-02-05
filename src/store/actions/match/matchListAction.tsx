import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const getMatchList = createAsyncThunk<any, any>(
  "/match/list",
  async ({ type, searchKeyword, matchType }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHLIST}?sort=match.startAt:ASC${
          type == "search"
            ? `&searchBy=title&keyword=${searchKeyword || ""}`
            : ""
        }${matchType ? `&match.matchType=${matchType}` : ""}`
      );
      if (resp) {
        return { data: resp?.data?.matches, type: type };
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const SearchList = createAsyncThunk<any, any>(
  "/match/searchlist",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHLIST}?searchBy=title&keyword=${
          requestData?.title ? requestData?.title : ""
        }`
      );
      if (resp) {
        return resp?.data?.matches;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

// export const userChangePassword = createAsyncThunk<any, any>(
//   "user/changePassword",
//   async (requestData) => {
//     try {
//       const resp = await service.post("/user/changePassword", requestData);
//       if (resp) {
//         return resp?.data;
//       }
//     } catch (error: any) {
//       const err = error as AxiosError;
//       throw err;
//     }
//   }
// );

export const matchDetailAction = createAsyncThunk<any, any>(
  "/match/details",
  async (matchId, thunkApi) => {
    try {
      // console.log("API Request: Start");
      const resp = await service.get(
        `${ApiConstants.MATCH.MATCHDETAILS}${matchId}`
      );
      // console.log("API Request: Success", resp.data);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      // console.error("API Request: Error", error);

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
        `${ApiConstants.USER.SET_BTN_VALUE}`,
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

export const SearchListReset = createAction("searchList/reset");
export const selectedBetAction = createAsyncThunk<any, any>(
  "/match/selectedBet",
  async (data) => {
    return data;
  }
);

export const getCompetitionList = createAsyncThunk<any, any>(
  "competition/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONLIST}${requestData}`
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
export const betReportList = createAsyncThunk<any, any>(
  "/bet/",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.CURRENTBET}?status=${
          requestData.status
        }&keyword=${requestData?.keyword || ""}${requestData?.filter || ""}`
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
export const settleUnsettleMatch = createAsyncThunk<any, any>(
  "/bet/",
  // async (requestData, thunkApi) => {
  //   try {
  //     const resp = await service.get(
  //       `${ApiConstants.MATCH.CURRENTBET}?status=${requestData.status}&keyword=${requestData?.keyword || ""}${requestData?.filter || ""}`
  //       ?status MATCHED(bet history) pending(current bet) DELETED(UNSETTLED) gameType(FOR ALL BETS) UNmATCHED(PENDING)
  //     );
  async ({ status, page, limit }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.CURRENTBET}/?page=${page || 1}&limit=${
          limit || 15
        }&status=${status}`
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
export const getCompetitionDates = createAsyncThunk<any, any>(
  "competition/dates",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONDATES}${requestData}`
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
export const getCompetitionMatches = createAsyncThunk<any, any>(
  "competition/matches",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONMATCHES}${requestData?.id}/${requestData?.date}`
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

export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const updateMatchOddRates = createAsyncThunk<any, any>(
  "/matchOdd/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const searchListReset = createAction("search/list");
export const matchListReset = createAction("matchList/reset");
