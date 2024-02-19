import { createSlice } from "@reduxjs/toolkit";
import {
  SearchList,
  SearchListReset,
  getMatchList,
  matchDetailAction,
  matchListReset,
  searchListReset,
  selectedBetAction,
  updateMatchOddRates,
  updateMatchRates,
} from "../../actions/match/matchListAction";
import {
  updateBalance,
  updateMaxLossForBet,
} from "../../actions/user/userAction";

interface InitialState {
  success: boolean;
  loading: boolean;
  error: any;
  matchList: any;
  getMatchListBySearch: any;
  matchDetails: any;
  selectedBet: any;
  searchedMatchList: any;
}

const initialState: InitialState = {
  matchList: null,
  getMatchListBySearch: [],
  loading: false,
  success: false,
  error: null,
  matchDetails: null,
  selectedBet: null,
  searchedMatchList: null,
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
        state.loading = false;
        state.success = true;
        if (action.payload?.type == "search") {
          state.searchedMatchList = action.payload.data;
        } else {
          state.matchList = action.payload.data;
        }
      })
      .addCase(getMatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(SearchList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.getMatchListBySearch = action.payload;
      })
      .addCase(SearchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(SearchList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(SearchListReset, (state) => {
        // Reset the state to initial state
        return { ...state, success: false, getMatchListBySearch: [] };
      })
      .addCase(matchDetailAction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.matchDetails = null;
        state.error = null;
      })
      .addCase(matchDetailAction.fulfilled, (state, action) => {
        // console.log("Fulfilled action payload:", action.payload);
        state.loading = false;
        state.success = true;
        state.matchDetails = action.payload;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const {
          apiSession,
          apiTiedMatch,
          bookmaker,
          marketCompleteMatch,
          matchOdd,
          sessionBettings,
          manualTideMatch,
          quickbookmaker,
        } = action.payload;
        let newSessionBettings = sessionBettings;
        state.matchDetails = {
          ...state.matchDetails,
          manualSessionActive: sessionBettings?.length >= 0 ? true : false,
          apiSessionActive: apiSession?.length >= 0 ? true : false,
          apiSession: apiSession,
          apiTideMatch: apiTiedMatch,
          bookmaker: bookmaker,
          manualTiedMatch: manualTideMatch,
          marketCompleteMatch: marketCompleteMatch,
          matchOdd: matchOdd,
          quickBookmaker: quickbookmaker,
          sessionBettings: newSessionBettings?.map((item: any) => {
            if (!JSON.parse(item)?.selectionId) {
              const parsedItem = JSON.parse(item);
              let id = parsedItem?.id;
              const matchingSession = sessionBettings.find(
                (sessionItem: any) => JSON.parse(sessionItem).id === id
              );
              const parsedSession = JSON.parse(matchingSession);
              if (parsedSession) {
                return JSON.stringify({
                  ...parsedItem,
                  ...parsedSession,
                });
              } else return JSON.stringify(parsedItem);
            } else {
              const parsedItem = JSON.parse(item);
              let id = parsedItem?.id;
              const matchingApiSession = apiSession.find(
                (sessionItem: any) => sessionItem.id === id
              );
              if (matchingApiSession) {
                return JSON.stringify({
                  ...parsedItem,
                  noRate: matchingApiSession.BackPrice1,
                  noPercent: matchingApiSession.BackSize1,
                  yesRate: matchingApiSession.LayPrice1,
                  yesPercent: matchingApiSession.LaySize1,
                  activeStatus: "live",
                  status: matchingApiSession?.status,
                });
              } else {
                return JSON.stringify({
                  ...parsedItem,
                  noRate: 0,
                  yesRate: 0,
                  yesPercent: 0,
                  noPercent: 0,
                  activeStatus:
                    parsedItem.activeStatus === "live"
                      ? "save"
                      : parsedItem.activeStatus,
                });
              }
            }
          }),
        };
      })
      .addCase(updateMatchOddRates.fulfilled, (state, action) => {
        const { id, matchOdd } = action.payload;
        const indexOfItemToUpdate = state.matchList.matches.findIndex(
          (item: any) => item?.id === id
        );
        if (indexOfItemToUpdate !== -1) {
          state.matchList.matches[indexOfItemToUpdate].matchOdds[0] = matchOdd;
        } else {
          return state.matchList;
        }
      })
      .addCase(matchListReset, (state) => {
        return { ...state, matchList: null };
      })
      .addCase(matchDetailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(selectedBetAction.fulfilled, (state, action) => {
        state.selectedBet = action.payload;
      })
      .addCase(searchListReset, (state) => {
        state.searchedMatchList = null;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        const { matchBetType, newTeamRateData } = action.payload;
        if (["tiedMatch1", "tiedMatch2"].includes(matchBetType)) {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              yesRateTie: newTeamRateData.teamA,
              noRateTie: newTeamRateData.teamB,
            },
          };
        } else if (["completeMatch"].includes(matchBetType)) {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              yesRateComplete: newTeamRateData.teamA,
              noRateComplete: newTeamRateData.teamB,
            },
          };
        } else {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              teamARate: newTeamRateData.teamA,
              teamBRate: newTeamRateData.teamB,
              teamCRate: newTeamRateData.teamC,
            },
          };
        }
      })
      .addCase(updateMaxLossForBet.fulfilled, (state, action) => {
        const { betPlaced, profitLossData } = action.payload;
        if (state?.matchDetails?.id === betPlaced?.placedBet?.matchId) {
          const updatedProfitLossDataSession =
            state.matchDetails?.profitLossDataSession.map((item: any) => {
              if (item?.betId === betPlaced?.placedBet?.betId) {
                return {
                  ...item,
                  maxLoss: JSON.parse(profitLossData)?.maxLoss,
                  totalBet: +item?.totalBet + 1,
                };
              }
              return item;
            });

          const betIndex = updatedProfitLossDataSession.findIndex(
            (item: any) => item?.betId === betPlaced?.placedBet?.betId
          );
          if (betIndex === -1) {
            updatedProfitLossDataSession.push({
              betId: betPlaced?.placedBet?.betId,
              maxLoss: JSON.parse(profitLossData)?.maxLoss,
              totalBet: 1,
              // Add other properties as necessary
            });
          }

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        } else {
          return state.matchDetails;
        }
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
