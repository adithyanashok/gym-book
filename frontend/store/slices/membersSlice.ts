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
import { Payment } from "@/types/subsctiption.type";

// Define the state interface
interface MembersState {
  items: Member[];
  paymentHistory: Payment[];
  member: Member | null;
  fetchMemberLoading: boolean;
  fetchPaymentLoading: boolean;
  createLoading: boolean;
  getByIdLoading: boolean;
  renewLoading: boolean;
  editLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

// Initial state
const initialState: MembersState = {
  items: [],
  paymentHistory: [],
  member: null,
  fetchMemberLoading: false,
  fetchPaymentLoading: false,
  createLoading: false,
  getByIdLoading: false,
  renewLoading: false,
  editLoading: false,
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
  async (body: { memberData: MemberData; fileData: FormData }, thunkAPI) => {
    try {
      const response = await membersApi.createMember(body.memberData);

      addMemberImage({ id: response.data.id, formData: body.fileData });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get Member By Id
export const getMemberById = createAsyncThunk(
  "members/getMemberById",
  async (body: number, thunkAPI) => {
    try {
      const response = await membersApi.getMemberById(body);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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

// Image Member
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

// Get payments
export const getPayments = createAsyncThunk(
  "members/getPayments",
  async (memberId: number, { rejectWithValue }) => {
    try {
      const response = await membersApi.getPaymentHistory(memberId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);
// Delete Member
export const deleteMember = createAsyncThunk(
  "members/deleteMember",
  async (id: number, thunkAPI) => {
    try {
      const response = await membersApi.deleteMember(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
      state.createLoading = false;
      state.getByIdLoading = false;
      state.renewLoading = false;
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
        state.fetchMemberLoading = true;
        state.error = null;
      })
      .addCase(
        fetchMembers.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member[]>>) => {
          state.fetchMemberLoading = false;
          state.error = null;
          state.items = action.payload.data;
        }
      )
      .addCase(fetchMembers.rejected, (state, action) => {
        state.fetchMemberLoading = false;
        state.error = action.payload as string;
      })

      // CREATE MEMBER cases
      .addCase(createMember.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(
        createMember.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member>>) => {
          state.createLoading = false;
          state.error = null;
          state.member = action.payload.data;
          state.items.unshift(action.payload.data);
        }
      )
      .addCase(createMember.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload as string;
      })

      // GET MEMBER BY ID
      .addCase(getMemberById.pending, (state) => {
        state.fetchMemberLoading = true;
        state.error = null;
      })
      .addCase(
        getMemberById.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member>>) => {
          state.fetchMemberLoading = false;
          state.error = null;
          state.member = action.payload.data;
        }
      )
      .addCase(getMemberById.rejected, (state, action) => {
        state.fetchMemberLoading = false;
        state.error = action.payload as string;
      })

      // RENEW MEMBER
      .addCase(renewMemberPlan.pending, (state) => {
        state.renewLoading = true;
        state.error = null;
      })
      .addCase(
        renewMemberPlan.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member>>) => {
          state.renewLoading = false;
          state.error = null;
          state.member = action.payload.data;
          state.items = [
            action.payload.data,
            ...state.items.filter((item) => item.id !== action.payload.data.id),
          ];
        }
      )
      .addCase(renewMemberPlan.rejected, (state, action) => {
        state.renewLoading = false;
        state.error = action.payload as string;
      })

      // EDIT MEMBER
      .addCase(editMember.pending, (state) => {
        state.editLoading = true;
        state.error = null;
      })
      .addCase(
        editMember.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member>>) => {
          state.editLoading = false;
          state.error = null;
          state.member = action.payload.data;
          state.items = [
            action.payload.data,
            ...state.items.filter((item) => item.id !== action.payload.data.id),
          ];
        }
      )
      .addCase(editMember.rejected, (state, action) => {
        state.editLoading = false;
        state.error = action.payload as string;
      })

      // ADD MEMBER IMAGE cases
      .addCase(addMemberImage.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(
        addMemberImage.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member>>) => {
          state.createLoading = false;
          state.error = null;
          // state.items.unshift(action.payload.data);
        }
      )
      .addCase(addMemberImage.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload as string;
      })

      // GET PAYMENTS
      .addCase(getPayments.pending, (state) => {
        state.fetchPaymentLoading = true;
        state.error = null;
      })
      .addCase(
        getPayments.fulfilled,
        (state, action: PayloadAction<ApiResponse<Payment[]>>) => {
          state.fetchPaymentLoading = false;
          state.error = null;
          state.paymentHistory = action.payload.data;
        }
      )
      .addCase(getPayments.rejected, (state, action) => {
        state.fetchPaymentLoading = false;
        state.error = action.payload as string;
      })

      //DELETE MEMBER
      .addCase(deleteMember.pending, (state) => {
        state.fetchPaymentLoading = true;
        state.error = null;
      })
      .addCase(
        deleteMember.fulfilled,
        (state, action: PayloadAction<ApiResponse<Member>>) => {
          state.fetchPaymentLoading = false;
          state.error = null;
          state.items = [
            ...state.items.filter((item) => item.id !== action.payload.data.id),
          ];
        }
      )
      .addCase(deleteMember.rejected, (state, action) => {
        state.fetchPaymentLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearError, resetMembers, addMember } = membersSlice.actions;

// Members Selectors
export const selectMembers = (state: RootState) => state.members.items;
export const selectMembersLoading = (state: RootState) =>
  state.members.fetchMemberLoading;
export const selectMembersError = (state: RootState) => state.members.error;

// Member Selectors

export const selectMember = (state: RootState) => state.members.member;
export const selectMemberLoading = (state: RootState) =>
  state.members.getByIdLoading;
export const selectMemberError = (state: RootState) => state.members.error;

export const selectMemberCreateLoading = (state: RootState) =>
  state.members.createLoading;

// Payment Selectors
export const selectPayments = (state: RootState) =>
  state.members.paymentHistory;
export const selectPaymentHistory = (state: RootState) =>
  state.members.paymentHistory;
export const selectPaymentError = (state: RootState) => state.members.error;

// Export the reducer
export default membersSlice.reducer;
