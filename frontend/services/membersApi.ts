

import { Member,ApiResponse ,GetMembersParams, MemberData} from "@/types/member.types";
import { apiClient } from "./apiClient";
import { STORAGE } from "@/utils/storage";


// Specific API functions with proper typing
export const membersApi = {
  getMembers: (params: GetMembersParams = {}): Promise<ApiResponse<Member[]>> => {
    const { page = 1, limit = 20,  ...otherParams } = params;
    
    const searchParams = new URLSearchParams();
    searchParams.append('page', page.toString());
    searchParams.append('limit', limit.toString());
    
    Object.entries(otherParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    
    return apiClient<ApiResponse<Member[]>>(`/members/search?${searchParams}`);
  },

  getMemberById: (id: number): Promise<ApiResponse<Member>> => {
    return apiClient<ApiResponse<Member>>(`/members/${id}`);
  },


  createMember: async (memberData: MemberData): Promise<ApiResponse<Member>> => {
    const token = await STORAGE.getData('accessToken')
    return apiClient<ApiResponse<Member>>('/members', {
      method: 'POST',
      body: JSON.stringify(memberData),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,

      }
    });
  },

  renewMembership: ({id, planId, startDate}:{id:number, planId:number, startDate:Date}): Promise<ApiResponse<Member>> => {
    return apiClient<ApiResponse<Member>>(`/members/renew/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({planId, startDate}),
    });
  },

  updateMember: (id: number, memberData: MemberData): Promise<ApiResponse<Member>> => {
    return apiClient<ApiResponse<Member>>(`/members/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(memberData),
    });
  },

  deleteMember: (id: number): Promise<ApiResponse<{ message: string }>> => {
    return apiClient<ApiResponse<{ message: string }>>(`/members/${id}`, {
      method: 'DELETE',
    });
  },

  addMemberImage: async (id: number, formData: FormData): Promise<ApiResponse<Member>> => {
    const token = await STORAGE.getData('accessToken')
    console.log(formData);
    return apiClient<ApiResponse<Member>>(`/upload/upload-member-image/${id}`, {
      method: 'PATCH',
      body: formData,
       headers:{
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'Content-Type':'multipart/form-data'
      }
      
    });
  },
};
