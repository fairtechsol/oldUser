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
          tournament,
          scoreBoard,
        } = action?.payload;
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
          tournament: tournament?.sort((a: any, b: any) => {
            // Primary sort by sno (ascending)
            if (a.sno !== b.sno) {
              return a.sno - b.sno;
            }
            // If sno values are equal, sort so that null parentId comes first
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
        state.selectedBet = action?.payload;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        const {
          newTeamRateData,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
          matchBetType,
          betId,
          matchId,
        } = action?.payload;
        if (matchBetType === "tournament") {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              [betId + "_profitLoss_" + matchId]:
                JSON.stringify(newTeamRateData),
            },
          };
        } else {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              [teamArateRedisKey]: newTeamRateData?.teamA,
              [teamBrateRedisKey]: newTeamRateData?.teamB,
              [teamCrateRedisKey]: newTeamRateData?.teamC,
            },
          };
        }
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
                  profitLoss: profitLoss?.betPlaced,
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
        const {
          redisObject,
          matchBetType,
          betId,
          teamRate,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
        } = action?.payload;

        if (matchBetType === "tournament") {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails.profitLossDataMatch,
              [betId + "_profitLoss_" + state.matchDetails.id]:
                JSON.stringify(teamRate),
            },
          };
        } else {
          state.matchDetails = {
            ...state.matchDetails,
            profitLossDataMatch: {
              ...state.matchDetails?.profitLossDataMatch,
              [teamArateRedisKey]: redisObject[teamArateRedisKey],
              [teamBrateRedisKey]: redisObject[teamBrateRedisKey],
              [teamCrateRedisKey]: redisObject[teamCrateRedisKey],
            },
          };
        }
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
      })
      .addCase(setCurrentPageRedux.fulfilled, (state, action) => {
        state.currentPageRedux = action.payload;
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
