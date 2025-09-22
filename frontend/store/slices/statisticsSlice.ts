import { statisticsApi } from "@/services/statisticsApi";
import { RevanueData, Statistics } from "@/types/statistics.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PlanDistribution } from "@/types/planDistribution.type";

// Define the state interface
interface StatisticsState {
  items: Statistics;
  planDistribution:PlanDistribution[];
  revanueData:RevanueData;
 statisticsLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  planDistributionLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  revenueLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;

}

// Initial state
const initialState: StatisticsState = {
  items: {activeMembers:0,  newMembers:0,currentMonth:"", memberIncrease:0, prevMonthMembersCount:0, prevMonthRevenue:0,revanue:0, revenueIncrease:0, totalMembers:0,},
  planDistribution:[],
  revanueData:{monthlyRevenues:[], totalRevanue:0},
  statisticsLoading: 'idle',
  planDistributionLoading: 'idle',
  revenueLoading: 'idle',
  error: null,
};

interface GetStatisticsParams {
    startDate: string;
}

export const getStatistics = createAsyncThunk<
    Statistics,
    GetStatisticsParams
>(
    "statistics/getStatistics",
    async ({startDate}, { rejectWithValue }) => {
        try {
            const response = await statisticsApi.getStatistics({ startDate });
            return response.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occured");
        }
    }
)

export const getPlanDistribution = createAsyncThunk(
    "statistics/getPlanDistribution",
    async ({ startDate }:{startDate:string}, { rejectWithValue }) => {
        try {
            const response = await statisticsApi.getPlanDistribution({startDate});
            return response.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occured");
        }
    }
)

export const getMonthlyRevanues = createAsyncThunk<
    RevanueData,
    GetStatisticsParams
>(
    "statistics/getMonthlyRevanues",
    async ({startDate}, { rejectWithValue }) => {
        try {
            const response = await statisticsApi.getMonthlyRevanues({ startDate });
            return response.data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occured");
        }
    }
)

const statisticsSlice = createSlice({
    name:'statistics',
    initialState,
    reducers: {
    clearError: (state) => {
      state.error = null;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.statisticsLoading = 'pending';
        state.error = null;
      })
      .addCase(getStatistics.fulfilled, (state, action: PayloadAction<Statistics>) => {
        state.statisticsLoading = 'succeeded';
        state.error = null;
        state.items = action.payload;
    
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.statisticsLoading = 'failed';
        state.error = action.payload as string;
      })

      // PLAN DISTRIBUTION
      .addCase(getPlanDistribution.pending, (state) => {
        state.planDistributionLoading = 'pending';
        state.error = null;
      })
      .addCase(getPlanDistribution.fulfilled, (state, action: PayloadAction<PlanDistribution[]>) => {
        state.planDistributionLoading = 'succeeded';
        state.error = null;
        state.planDistribution = action.payload;
    
      })
      .addCase(getPlanDistribution.rejected, (state, action) => {
        state.planDistributionLoading = 'failed';
        state.error = action.payload as string;
      })

      // GET REVANUES MONTHLY
      .addCase(getMonthlyRevanues.pending, (state) => {
        state.revenueLoading = 'pending';
        state.error = null;
      })
      .addCase(getMonthlyRevanues.fulfilled, (state, action: PayloadAction<RevanueData>) => {
        state.revenueLoading = 'succeeded';
        state.error = null;
        state.revanueData = action.payload;
    
      })
      .addCase(getMonthlyRevanues.rejected, (state, action) => {
        state.revenueLoading = 'failed';
        state.error = action.payload as string;
      })
  },
})

// Export actions
export const { clearError } = statisticsSlice.actions;

// Selectors (useful for accessing state in components)
export const selectedStatistics = (state: RootState) => state.statistics.items;
export const selectStatisticsLoading = (state: RootState) => state.statistics.statisticsLoading;
export const selectStatisticsError = (state: RootState) => state.statistics.error;

export const selectedPlanDistribution = (state: RootState) => state.statistics.planDistribution;
export const selectPlanDistributionLoading = (state: RootState) => state.statistics.planDistributionLoading;
export const selectPlanDistributionError = (state: RootState) => state.statistics.error;

export const selectedRevanue = (state: RootState) => state.statistics.revanueData;
export const selectedRevanueLoading = (state: RootState) => state.statistics.revenueLoading;
export const selectedRevanueError = (state: RootState) => state.statistics.error;

// Export the reducer
export default statisticsSlice.reducer;