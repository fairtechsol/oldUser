import { createSlice } from "@reduxjs/toolkit";
import { convertData, updateSessionBettingsItem } from "../../../helper";
import {
  SearchList,
  SearchListReset,
  getMatchList,
  matchDetailAction,
  matchDetailReset,
  matchDetailSuccessReset,
  matchListReset,
  searchListReset,
  selectedBetAction,
  selectedBetMinMax,
  updateMatchOddRates,
  updateMatchRates,
} from "../../actions/match/matchListAction";
import {
  updateBalance,
  updateBetDataOnDeclare,
  updateBetDataOnUndeclare,
  updateMaxLossForBet,
  updateProfitLossOnDeleteSession,
  updateTeamRatesOnDeleteMatch,
} from "../../actions/user/userAction";

interface InitialState {
  success: boolean;
  loading: boolean;
  matchDetailloading: boolean;
  error: any;
  matchList: any;
  getMatchListBySearch: any;
  matchDetails: any;
  selectedBet: any;
  searchedMatchList: any;
  minMax: any;
}

const initialState: InitialState = {
  matchList: null,
  getMatchListBySearch: [],
  loading: false,
  matchDetailloading: false,
  success: false,
  error: null,
  matchDetails: null,
  selectedBet: null,
  searchedMatchList: null,
  minMax: null,
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
        if (action?.payload?.type == "search") {
          state.searchedMatchList = action?.payload?.data;
        } else {
          state.matchList = action?.payload?.data;
        }
      })
      .addCase(getMatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(SearchList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.getMatchListBySearch = action?.payload;
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
        state.success = false;
        state.getMatchListBySearch = [];
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
        state.matchDetails = action?.payload;
      })
      .addCase(matchDetailAction.rejected, (state, action) => {
        state.matchDetailloading = false;
        state.error = action?.error?.message;
      })
      .addCase(matchDetailReset, (state) => {
        state.matchDetails = null;
      })
      .addCase(matchDetailSuccessReset, (state) => {
        state.success = false;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const {
          apiSession,
          apiTiedMatch,
          bookmaker,
          bookmaker2,
          marketCompleteMatch,
          marketCompleteMatch1,
          matchOdd,
          sessionBettings,
          manualTideMatch,
          quickbookmaker,
          completeManual,
          apiTiedMatch2,
          other,
        } = action?.payload;

        // let parsedSessionBettings = state?.matchDetails?.sessionBettings?.map(
        //   (item: any) => {
        //     let parsedItem = JSON.parse(item);
        //     return parsedItem;
        //   }
        // );

        // let updatedFormat = convertData(parsedSessionBettings);

        // let updatedSessionBettings = updateSessionBettingsItem(
        //   updatedFormat,
        //   apiSession
        // );
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
          // manualSessionActive: sessionBettings?.length >= 0 ? true : false,
          apiSession: apiSession,
          apiTideMatch: apiTiedMatch,
          apiTideMatch2: apiTiedMatch2,
          bookmaker: bookmaker,
          marketBookmaker2: bookmaker2,
          manualTiedMatch: manualTideMatch,
          marketCompleteMatch: marketCompleteMatch,
          marketCompleteMatch1: marketCompleteMatch1,
          matchOdd: matchOdd,
          quickBookmaker: quickbookmaker,
          manualCompleteMatch: completeManual,
          sessionBettings: stringifiedSessionBetting,
          other: other,
          updatedSessionBettings: updateSessionBettingsItem(
            convertData(parsedSessionBettings),
            apiSession
          ),
        };
      })
      .addCase(updateMatchOddRates.fulfilled, (state, action) => {
        const { id, matchOdd } = action?.payload;
        const indexOfItemToUpdate = state?.matchList?.matches?.findIndex(
          (item: any) => item?.id === id
        );
        if (indexOfItemToUpdate !== -1) {
          state.matchList.matches[indexOfItemToUpdate].matchOdds[0] = matchOdd;
        }
      })
      .addCase(matchListReset, (state) => {
        return { ...state, matchList: null };
      })
      .addCase(selectedBetAction.fulfilled, (state, action) => {
        state.selectedBet = action?.payload;
      })
      .addCase(searchListReset, (state) => {
        state.searchedMatchList = null;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        const {
          newTeamRateData,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
        } = action?.payload;

        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails.profitLossDataMatch,
            [teamArateRedisKey]: newTeamRateData?.teamA,
            [teamBrateRedisKey]: newTeamRateData?.teamB,
            [teamCrateRedisKey]: newTeamRateData?.teamB,
          },
        };
      })
      .addCase(updateMaxLossForBet.fulfilled, (state, action) => {
        const { betPlaced, profitLossData } = action?.payload;
        if (state?.matchDetails?.id === betPlaced?.placedBet?.matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetails?.profitLossDataSession?.map((item: any) => {
              if (item?.betId === betPlaced?.placedBet?.betId) {
                return {
                  ...item,
                  maxLoss: JSON.parse(profitLossData)?.maxLoss,
                  totalBet: JSON.parse(profitLossData)?.totalBet,
                  profitLoss: JSON.parse(profitLossData)?.betPlaced,
                };
              }
              return item;
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
              // Add other properties as necessary
            });
          }

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateProfitLossOnDeleteSession.fulfilled, (state, action) => {
        const { betId, profitLoss, matchId } = action?.payload;
        if (state?.matchDetails?.id === matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetails?.profitLossDataSession?.map((item: any) => {
              if (item?.betId === betId) {
                return {
                  ...item,
                  maxLoss: profitLoss?.maxLoss,
                  totalBet: profitLoss?.totalBet,
                };
              }
              return item;
            });

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateBetDataOnDeclare.fulfilled, (state, action) => {
        const { betId, matchId } = action?.payload;
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
        const { betId, profitLoss, matchId } = action?.payload;
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
                    }
                  : item
              )
            : [
                ...state.matchDetails?.profitLossDataSession,
                {
                  betId: betId,
                  maxLoss: JSON.parse(profitLoss)?.maxLoss,
                  totalBet: JSON.parse(profitLoss)?.totalBet,
                },
              ];

          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateTeamRatesOnDeleteMatch.fulfilled, (state, action) => {
        const {
          redisObject,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
        } = action?.payload;
        state.matchDetails = {
          ...state.matchDetails,
          profitLossDataMatch: {
            ...state.matchDetails?.profitLossDataMatch,
            [teamArateRedisKey]: redisObject[teamArateRedisKey],
            [teamBrateRedisKey]: redisObject[teamBrateRedisKey],
            [teamCrateRedisKey]: redisObject[teamCrateRedisKey],
          },
        };
      })
      .addCase(selectedBetMinMax.fulfilled, (state, action) => {
        const { team, data } = action?.payload;
        let value = {};
        if (team?.matchBetType === "matchOdd") {
          value = {
            min: data?.minBet,
            max: data?.maxBet,
          };
        } else if (team?.matchBetType === "bookmaker") {
          value = {
            min: data?.minBet,
            max: data?.maxBet,
          };
        } else if (team?.matchBetType === "quickbookmaker1") {
          const index = data?.quickBookmaker?.findIndex(
            (obj: any) => obj["type"] === "quickbookmaker1"
          );
          value = {
            min: data?.quickBookmaker[index]?.minBet,
            max: data?.quickBookmaker[index]?.maxBet,
          };
        } else if (team?.matchBetType === "quickbookmaker2") {
          const index = data?.quickBookmaker?.findIndex(
            (obj: any) => obj["type"] === "quickbookmaker2"
          );
          value = {
            min: data?.quickBookmaker[index]?.minBet,
            max: data?.quickBookmaker[index]?.maxBet,
          };
        } else if (team?.matchBetType === "quickbookmaker3") {
          const index = data?.quickBookmaker?.findIndex(
            (obj: any) => obj["type"] === "quickbookmaker3"
          );
          value = {
            min: data?.quickBookmaker[index]?.minBet,
            max: data?.quickBookmaker[index]?.maxBet,
          };
        } else if (team?.matchBetType === "tiedMatch2") {
          value = {
            min: data?.manualTiedMatch?.minBet,
            max: data?.manualTiedMatch?.maxBet,
          };
        } else if (team?.matchBetType === "tiedMatch1") {
          value = {
            min: data?.minBet,
            max: data?.maxBet,
          };
        } else if (team?.matchBetType === "completeMatch") {
          value = {
            min: data?.minBet,
            max: data?.maxBet,
          };
        } else if (
          !team?.matchBetType &&
          data?.isManual &&
          team?.betId === data?.id
        ) {
          value = {
            min: data?.minBet,
            max: data?.maxBet,
          };
        } else if (
          !team?.matchBetType &&
          !data?.isManual &&
          team?.betId === data?.id
        ) {
          value = {
            min: data?.min,
            max: data?.max,
          };
        }
        state.minMax = value;
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
