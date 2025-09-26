// store/slices/membersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { membersApi } from "../../services/membersApi";
import {
  ApiResponse,
  GetMembersParams,
  Member,
  MemberData,
} from "@/types/member.types";
import { RootState } from "../store";
import { ApiError } from "@/types/error.type";

// Define the state interface
interface MembersState {
  items: Member[];
  member: Member | null;
  fetchLoading: "idle" | "pending" | "succeeded" | "failed";
  createLoading: "idle" | "pending" | "succeeded" | "failed";
  getByIdLoading: "idle" | "pending" | "succeeded" | "failed";
  renewLoading: "idle" | "pending" | "succeeded" | "failed";
  editLoading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
}

// Initial state
const initialState: MembersState = {
  items: [],
  member: null,
  fetchLoading: "idle",
  createLoading: "idle",
  getByIdLoading: "idle",
  renewLoading: "idle",
  editLoading: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
};

// Fetch Members
export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async (params: GetMembersParams = {}, { rejectWithValue }) => {
    try {
      const response = await membersApi.getMembers(params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Add new Member
export const createMember = createAsyncThunk(
  "members/createMember",
  async (
    body: { memberData: MemberData; fileData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await membersApi.createMember(body.memberData);
      addMemberImage({ id: response.data.id, formData: body.fileData });
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Get Member By Id
export const getMemberById = createAsyncThunk(
  "members/getMemberById",
  async (body: number, { rejectWithValue }) => {
    try {
      const response = await membersApi.getMemberById(body);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Renew Member
export const renewMemberPlan = createAsyncThunk(
  "members/renewMemberPlan",
  async (
    body: { memberId: number; planId: number; startDate: Date },
    { rejectWithValue }
  ) => {
    try {
      const response = await membersApi.renewMembership(body);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Edit Member
export const editMember = createAsyncThunk(
  "members/editMember",
  async (
    { id, memberData }: { id: number; memberData: MemberData },
    { rejectWithValue }
  ) => {
    try {
      const response = await membersApi.updateMember(id, memberData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Edit Member
export const addMemberImage = createAsyncThunk(
  "members/addMemberImage",
  async (
    { id, formData }: { id: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await membersApi.addMemberImage(id, formData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

// Create the slice
const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetMembers: (state) => {
      state.items = [];
      state.fetchLoading = "idle";
      state.createLoading = "idle";
      state.getByIdLoading = "idle";
      state.renewLoading = "idle";
      state.error = null;
      state.currentPage = 1;
      state.totalPages = 1;
    },
    addMember: (state, action: PayloadAction<Member>) => {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.fetchLoading = "pending";
        state.error = null;
      })
      .addCase(
        fetchMembers.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member[]>>) => {
          state.fetchLoading = "succeeded";
          state.error = null;
          state.items = action.payload.data;
        }
      )
      .addCase(fetchMembers.rejected, (state, action) => {
        state.fetchLoading = "failed";
        state.error = action.payload as string;
      })

      // CREATE MEMBER cases
      .addCase(createMember.pending, (state) => {
        state.createLoading = "pending";
        state.error = null;
      })
      .addCase(
        createMember.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member>>) => {
          state.createLoading = "succeeded";
          state.error = null;
          state.member = action.payload.data;
          state.items.unshift(action.payload.data);
        }
      )
      .addCase(createMember.rejected, (state, action) => {
        state.createLoading = "failed";
        state.error = action.payload as string;
      })

      // GET MEMBER BY ID
      .addCase(getMemberById.pending, (state) => {
        state.getByIdLoading = "pending";
        state.error = null;
      })
      .addCase(
        getMemberById.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member>>) => {
          state.getByIdLoading = "succeeded";
          state.error = null;
          state.member = action.payload.data;
        }
      )
      .addCase(getMemberById.rejected, (state, action) => {
        state.getByIdLoading = "failed";
        state.error = action.payload as string;
      })

      // RENEW MEMBER
      .addCase(renewMemberPlan.pending, (state) => {
        state.renewLoading = "pending";
        state.error = null;
      })
      .addCase(
        renewMemberPlan.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member>>) => {
          state.renewLoading = "succeeded";
          state.error = null;
          state.member = action.payload.data;
          state.items = [
            action.payload.data,
            ...state.items.filter((item) => item.id !== action.payload.data.id),
          ];
        }
      )
      .addCase(renewMemberPlan.rejected, (state, action) => {
        state.renewLoading = "failed";
        state.error = action.payload as string;
      })

      // EDIT MEMBER
      .addCase(editMember.pending, (state) => {
        state.editLoading = "pending";
        state.error = null;
      })
      .addCase(
        editMember.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member>>) => {
          state.editLoading = "succeeded";
          state.error = null;
          state.member = action.payload.data;
          state.items = [
            action.payload.data,
            ...state.items.filter((item) => item.id !== action.payload.data.id),
          ];
        }
      )
      .addCase(editMember.rejected, (state, action) => {
        state.editLoading = "failed";
        state.error = action.payload as string;
      })

      // ADD MEMBER IMAGE cases
      .addCase(addMemberImage.pending, (state) => {
        state.createLoading = "pending";
        state.error = null;
      })
      .addCase(
        addMemberImage.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member>>) => {
          state.createLoading = "succeeded";
          state.error = null;
          // state.items.unshift(action.payload.data);
        }
      )
      .addCase(addMemberImage.rejected, (state, action) => {
        state.createLoading = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearError, resetMembers, addMember } = membersSlice.actions;

// Selectors (useful for accessing state in components)
export const selectMembers = (state: RootState) => state.members.items;
export const selectMembersLoading = (state: RootState) =>
  state.members.fetchLoading;
export const selectMembersError = (state: RootState) => state.members.error;

export const selectMember = (state: RootState) => state.members.member;
export const selectMemberLoading = (state: RootState) =>
  state.members.getByIdLoading;
export const selectMemberError = (state: RootState) => state.members.error;

export const selectMemberCreateLoading = (state: RootState) =>
  state.members.createLoading;

// Export the reducer
export default membersSlice.reducer;
