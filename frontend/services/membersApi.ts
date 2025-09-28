import {
  Member,
  ApiResponse,
  GetMembersParams,
  MemberData,
} from "@/types/member.types";
import { apiClient } from "./apiClient";
import { STORAGE } from "@/utils/storage";
import { Payment } from "@/types/payment.type";

// Specific API functions with proper typing
export const membersApi = {
  getMembers: async (
    params: GetMembersParams = {}
  ): Promise<ApiResponse<Member[]>> => {
    const { page = 1, limit = 20, ...otherParams } = params;

    const searchParams = new URLSearchParams();
    searchParams.append("page", page.toString());
    searchParams.append("limit", limit.toString());

    Object.entries(otherParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    try {
      const response = await apiClient.get<ApiResponse<Member[]>>(
        `/members/search?${searchParams}`
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  getMemberById: async (id: number): Promise<ApiResponse<Member>> => {
    try {
      const response = await apiClient.get<ApiResponse<Member>>(
        `/members/${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  createMember: async (
    memberData: MemberData
  ): Promise<ApiResponse<Member>> => {
    try {
      const response = await apiClient.post<ApiResponse<Member>>(
        "/members",
        memberData
      );

      return response;
    } catch (error: any) {
      throw error;
    }
  },

  renewMembership: async ({
    memberId,
    planId,
    startDate,
  }: {
    memberId: number;
    planId: number;
    startDate: Date;
  }) => {
    try {
      const response = await apiClient.patch<ApiResponse<Member>>(
        `/membership/renew`,
        {
          memberId,
          planId,
          startDate,
        }
      );
      console.log("Membership: ", response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateMember: async (
    id: number,
    memberData: MemberData
  ): Promise<ApiResponse<Member>> => {
    try {
      const response = await apiClient.patch<ApiResponse<Member>>(
        `/members/${id}`,
        {
          memberData,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteMember: async (
    id: number
  ): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await apiClient.delete<ApiResponse<{ message: string }>>(
        `/members/${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  addMemberImage: async (
    id: number,
    formData: FormData
  ): Promise<ApiResponse<Member>> => {
    console.log(formData);
    try {
      const response = await apiClient.upload<ApiResponse<Member>>(
        `/upload/upload-member-image/${id}`,
        formData,
        "patch"
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  getPaymentHistory: async (id: number) => {
    try {
      const response = await apiClient.get<ApiResponse<Payment[]>>(
        `membership/payments/${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
