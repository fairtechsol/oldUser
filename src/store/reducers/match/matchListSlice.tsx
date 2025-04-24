import { createSlice } from "@reduxjs/toolkit";
import { convertData, updateSessionBettingsItem } from "../../../helper";
import {
  getMatchList,
  matchDetailAction,
  matchDetailReset,
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
        state.success = true;
        if (type == "search") {
          state.searchedMatchList = data;
        } else {
          state.matchList = data;
        }
      })
      .addCase(getMatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
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
        state.error = action?.error?.message;
      })
      .addCase(matchDetailReset, (state) => {
        state.matchDetails = null;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const { apiSession, sessionBettings, tournament, scoreBoard } =
          action.payload;
        state.liveScoreBoardData = scoreBoard?.data;
        const parsedSessionBettings =
          state.matchDetails?.sessionBettings?.map(JSON.parse) || [];
        const apiParsedSessionBettings = sessionBettings?.map(JSON.parse) || [];

        apiParsedSessionBettings.forEach((apiItem: any) => {
          const index = parsedSessionBettings.findIndex(
            (parsedItem: any) => parsedItem.id === apiItem.id
          );
          if (index !== -1) {
            parsedSessionBettings[index] = {
              ...parsedSessionBettings[index],
              ...apiItem,
            };
          } else {
            parsedSessionBettings.push(apiItem);
          }
        });
        const stringifiedSessionBetting = parsedSessionBettings.map(
          JSON.stringify
        );
        state.matchDetails = {
          ...state.matchDetails,
          manualSessionActive: sessionBettings?.length >= 0 ? true : false,
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
          updatedSessionBettings: updateSessionBettingsItem(
            convertData(parsedSessionBettings),
            apiSession
          ),
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
        if (state?.matchDetails?.id === betPlaced?.placedBet?.matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetails?.profitLossDataSession?.map((item: any) => {
              if (item?.betId !== betPlaced?.placedBet?.betId) return item;
              return {
                ...item,
                maxLoss: JSON.parse(profitLossData)?.maxLoss,
                totalBet: JSON.parse(profitLossData)?.totalBet,
                profitLoss: JSON.parse(profitLossData)?.betPlaced,
              };
            });

          const betIndex = updatedProfitLossDataSession?.findIndex(
            (item: any) => item?.betId === betPlaced?.placedBet?.betId
          );
          if (betIndex === -1) {
            updatedProfitLossDataSession?.push({
              betId: betPlaced?.placedBet?.betId,
              maxLoss: JSON.parse(profitLossData)?.maxLoss,
              totalBet: 1,
              profitLoss: JSON.parse(profitLossData)?.betPlaced,
            });
          }

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
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
        if (state?.matchDetails?.id === matchId) {
          const isBetIdPresent =
            state?.matchDetails?.profitLossDataSession?.find(
              (item: any) => item?.betId === betId
            );

          const updatedProfitLossDataSession = isBetIdPresent
            ? state?.matchDetails?.profitLossDataSession?.map((item: any) =>
                item?.betId === betId
                  ? {
                      ...item,
                      maxLoss: JSON.parse(profitLoss)?.maxLoss,
                      totalBet: JSON.parse(profitLoss)?.totalBet,
                      profitLoss: JSON.parse(profitLoss)?.betPlaced,
                    }
                  : item
              )
            : [
                ...state.matchDetails?.profitLossDataSession,
                {
                  betId: betId,
                  maxLoss: JSON.parse(profitLoss)?.maxLoss,
                  totalBet: JSON.parse(profitLoss)?.totalBet,
                  profitLoss: JSON.parse(profitLoss)?.betPlaced,
                },
              ];

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
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
        let matchListFromApi = action.payload;
        if (
          state.matchList?.matches?.length > 0 &&
          matchListFromApi?.length > 0
        ) {
          state.matchList.matches = state.matchList?.matches?.map(
            (items: any) => {
              const itemToUpdate = matchListFromApi?.find(
                (item: any) =>
                  +item?.gameId === +items?.eventId ||
                  +item?.gmid === +items?.eventId
              );
              return {
                ...items,
                ...itemToUpdate,
              };
            }
          );
        }
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
