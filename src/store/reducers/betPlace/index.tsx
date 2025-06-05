import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentBets,
  getPlacedBets,
  getPlacedBetsForAccountStatement,
  getRunAmount,
  resetRunAmount,
  updateBetsPlaced,
  updateDeleteReasonBet,
  updateEditDeleteReasonBet,
} from "../../actions/betPlace/betPlaceActions";
import {
  updateRunAmount,
  updateRunAmountOnDeleteBet,
} from "../../actions/user/userAction";

interface InitialState {
  placedBetsAccountStatement: any;
  placedBets: any;
  runAmount: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  placedBetsAccountStatement: [],
  placedBets: [],
  runAmount: {},
  loading: false,
  success: false,
  error: null,
};

const placedBet = createSlice({
  name: "placedBet",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlacedBets.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.placedBets = [];
      })
      .addCase(getPlacedBets.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.placedBets = action.payload;
      })
      .addCase(getPlacedBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getCurrentBets.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.placedBets = [];
      })
      .addCase(getCurrentBets.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.placedBets = action.payload;
      })
      .addCase(getCurrentBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getRunAmount.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.runAmount = {};
      })
      .addCase(getRunAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.runAmount = action.payload;
      })
      .addCase(getRunAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getPlacedBetsForAccountStatement.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.placedBetsAccountStatement = [];
      })
      .addCase(getPlacedBetsForAccountStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.placedBetsAccountStatement = action.payload;
      })
      .addCase(getPlacedBetsForAccountStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetRunAmount, (state) => {
        state.runAmount = {};
      })
      .addCase(updateRunAmount.fulfilled, (state, action) => {
        const { betId, profitLossData } = action.payload;
        if (betId === state?.runAmount?.betId) {
          state.runAmount = {
            ...state.runAmount,
            runAmount: profitLossData?.betPlaced,
          };
        }
      })
      .addCase(updateRunAmountOnDeleteBet.fulfilled, (state, action) => {
        const { betId, profitLoss } = action.payload;
        if (betId === state?.runAmount?.betId) {
          state.runAmount = {
            ...state.runAmount,
            runAmount: profitLoss?.betPlaced,
          };
        }
      })
      .addCase(updateDeleteReasonBet.fulfilled, (state, action) => {
        const { betPlacedId, deleteReason, isPermanentDelete } = action.payload;
        const updateDeleteReason = (bet: any) => {
          if (betPlacedId.includes(bet?.id)) {
            bet.deleteReason = deleteReason;
          }
          return bet;
        };
        if (isPermanentDelete) {
          const updatedBetPlaced = state?.placedBets?.filter(
            (item: any) => !betPlacedId?.includes(item?.id)
          );
          state.placedBets = Array.from(new Set(updatedBetPlaced));
        } else {
          const updatedBetPlaced = state?.placedBets?.map(updateDeleteReason);
          state.placedBets = Array.from(new Set(updatedBetPlaced));
        }
      })
      .addCase(updateEditDeleteReasonBet.fulfilled, (state, action) => {
        const { betIds, deleteReason } = action.payload;
        const updateDeleteReason = (bet: any) => {
          if (betIds.includes(bet?.id)) {
            bet.deleteReason = deleteReason;
          }

          return bet;
        };

        const updatedBetPlaced = state?.placedBets?.map(updateDeleteReason);

        state.placedBets = Array.from(new Set(updatedBetPlaced));
      })
      .addCase(updateBetsPlaced.fulfilled, (state, action) => {
        state.placedBets = Array.from(
          new Set([action.payload, ...state.placedBets])
        );
      });
  },
});

export const placedBetReducer = placedBet.reducer;
