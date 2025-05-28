import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchList,
  matchDetailAction,
  matchDetailReset,
  matchListSuccessReset,
  selectedBetAction,
  selectedBetMinMax,
  setCurrentPageRedux,
  updateMatchRates,
  updateMatchRatesFromApiOnList,
} from "../../actions/match/matchListAction";
import {
  updateBalance,
  updateBetDataOnDeclare,
  updateBetDataOnUndeclare,
  updateMaxLossForBet,
  updateProfitLossOnDeleteSession,
  updateTeamRateOnUndeclare,
  updateTeamRatesOnDeleteMatch,
} from "../../actions/user/userAction";

interface InitialState {
  success: boolean;
  matchListSuccess: boolean;
  loading: boolean;
  matchDetailloading: boolean;
  error: any;
  matchList: any;
  matchDetails: any;
  selectedBet: any;
  searchedMatchList: any;
  minMax: any;
  liveScoreBoardData?: any;
  currentPageRedux: number;
}

const initialState: InitialState = {
  matchList: null,
  loading: false,
  matchDetailloading: false,
  success: false,
  matchListSuccess: false,
  error: null,
  matchDetails: null,
  selectedBet: null,
  searchedMatchList: null,
  minMax: null,
  liveScoreBoardData: null,
  currentPageRedux: 1,
};

const matchListSlice = createSlice({
  name: "match",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchList.fulfilled, (state, action) => {
        const { type, data } = action.payload;
        state.loading = false;
        state.matchListSuccess = true;
        if (type == "search") {
          state.searchedMatchList = data;
        } else {
          state.matchList = data;
        }
      })
      .addCase(getMatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(matchListSuccessReset, (state) => {
        state.matchListSuccess = false;
      })
      .addCase(matchDetailAction.pending, (state) => {
        state.matchDetailloading = true;
        state.success = false;
        state.matchDetails = null;
        state.error = null;
      })
      .addCase(matchDetailAction.fulfilled, (state, action) => {
        state.matchDetailloading = false;
        state.success = true;
        state.matchDetails = action.payload;
      })
      .addCase(matchDetailAction.rejected, (state, action) => {
        state.matchDetailloading = false;
        state.error = action.error?.message;
      })
      .addCase(matchDetailReset, (state) => {
        state.matchDetails = null;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const { apiSession, sessionBettings, tournament, scoreBoard } =
          action.payload;
        state.liveScoreBoardData = scoreBoard?.data;

        const parsedSessionBettings = new Map(
          (state.matchDetails?.sessionBettings || []).map((item: any) => {
            const parsed = JSON.parse(item);
            return [parsed.id, parsed];
          })
        );

        (sessionBettings || []).forEach((item: any) => {
          const parsed = JSON.parse(item);
          const existing = parsedSessionBettings.get(parsed.id);
          parsedSessionBettings.set(
            parsed.id,
            existing ? { ...existing, ...parsed } : parsed
          );
        });

        const stringifiedSessionBetting = Array.from(
          parsedSessionBettings.values()
        ).map((item) => JSON.stringify(item));

        state.matchDetails = {
          ...state.matchDetails,
          manualSessionActive: sessionBettings?.length > 0 ? true : false,
          gmid: action.payload?.gmid,
          apiSession: apiSession,
          sessionBettings: stringifiedSessionBetting,
          tournament: tournament?.sort((a: any, b: any) => {
            if (a.sno !== b.sno) {
              return a.sno - b.sno;
            }
            if (a.parentBetId === null && b.parentBetId !== null) return -1;
            if (a.parentBetId !== null && b.parentBetId === null) return 1;
            return 0;
          }),
        };
      })
      .addCase(selectedBetAction.fulfilled, (state, action) => {
        state.selectedBet = action.payload;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        const { newTeamRateData, betId, matchId } = action.payload;
        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails.profitLossDataMatch,
            [betId + "_profitLoss_" + matchId]: JSON.stringify(newTeamRateData),
          },
        };
      })
      .addCase(updateTeamRateOnUndeclare.fulfilled, (state, action) => {
        const { profitLoss, betId, matchId } = action.payload;
        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails.profitLossDataMatch,
            [betId + "_profitLoss_" + matchId]: JSON.stringify(profitLoss),
          },
        };
      })
      .addCase(updateMaxLossForBet.fulfilled, (state, action) => {
        const { betPlaced, profitLossData } = action.payload;
        const placedBet = betPlaced?.placedBet;
        const parsedProfitLoss = profitLossData || {};

        if (!placedBet || state?.matchDetails?.id !== placedBet.matchId) return;

        const existingData = state.matchDetails.profitLossDataSession || [];

        let found = false;
        const updatedProfitLossDataSession = existingData.map((item: any) => {
          if (item.betId === placedBet.betId) {
            found = true;
            return {
              ...item,
              maxLoss: parsedProfitLoss.maxLoss,
              totalBet: parsedProfitLoss.totalBet,
              profitLoss: parsedProfitLoss.betPlaced,
            };
          }
          return item;
        });

        if (!found) {
          updatedProfitLossDataSession.push({
            betId: placedBet.betId,
            maxLoss: parsedProfitLoss.maxLoss,
            totalBet: 1,
            profitLoss: parsedProfitLoss.betPlaced,
          });
        }

        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataSession: updatedProfitLossDataSession,
        };
      })
      .addCase(updateProfitLossOnDeleteSession.fulfilled, (state, action) => {
        const { betId, profitLoss, matchId } = action.payload;
        if (state?.matchDetails?.id === matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetails?.profitLossDataSession?.map((item: any) => {
              if (item?.betId !== betId) return item;
              return {
                ...item,
                maxLoss: profitLoss?.maxLoss,
                profitLoss: profitLoss?.betPlaced,
                totalBet: profitLoss?.totalBet,
              };
            });

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateBetDataOnDeclare.fulfilled, (state, action) => {
        const { betId, matchId } = action.payload;
        if (state?.matchDetails?.id === matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetails?.profitLossDataSession?.filter(
              (item: any) => item?.betId !== betId
            );

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateBetDataOnUndeclare.fulfilled, (state, action) => {
        const { betId, profitLoss, matchId } = action.payload;

        if (!state.matchDetails || state.matchDetails.id !== matchId) {
          return;
        }

        const parsedProfitLoss = JSON.parse(profitLoss || "{}");
        const currentSession = state.matchDetails.profitLossDataSession || [];

        const existingBetIndex = currentSession.findIndex(
          (item: any) => item?.betId === betId
        );

        let updatedSession;
        if (existingBetIndex >= 0) {
          updatedSession = currentSession.map((item: any, index: number) =>
            index === existingBetIndex
              ? {
                  ...item,
                  maxLoss: parsedProfitLoss?.maxLoss,
                  totalBet: parsedProfitLoss?.totalBet,
                  profitLoss: parsedProfitLoss?.betPlaced,
                }
              : item
          );
        } else {
          updatedSession = [
            ...currentSession,
            {
              betId,
              maxLoss: parsedProfitLoss?.maxLoss,
              totalBet: parsedProfitLoss?.totalBet,
              profitLoss: parsedProfitLoss?.betPlaced,
            },
          ];
        }

        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataSession: updatedSession,
        };
      })
      .addCase(updateTeamRatesOnDeleteMatch.fulfilled, (state, action) => {
        const { betId, teamRate } = action.payload;

        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails.profitLossDataMatch,
            [betId + "_profitLoss_" + state.matchDetails.id]:
              JSON.stringify(teamRate),
          },
        };
      })
      .addCase(updateMatchRatesFromApiOnList.fulfilled, (state, action) => {
        const matchListFromApi = action.payload;
        if (!state.matchList?.matches?.length || !matchListFromApi?.length)
          return;

        const apiMatchMap = new Map();
        matchListFromApi?.forEach((item: any) => {
          const id = Number(item.beventId || item.gmid);
          apiMatchMap.set(id, item);
        });

        state.matchList.matches = state.matchList.matches.map((match: any) => {
          const eventId = Number(match.eventId);
          const apiMatch = apiMatchMap.get(eventId);
          return apiMatch ? { ...match, ...apiMatch } : match;
        });
      })
      .addCase(selectedBetMinMax.fulfilled, (state, action) => {
        const { data } = action.payload;

        state.minMax = {
          min: data?.min,
          max: data?.max,
        };
      })
      .addCase(setCurrentPageRedux.fulfilled, (state, action) => {
        state.currentPageRedux = action.payload;
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
