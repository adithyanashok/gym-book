import { Plan } from "./plan.types";


// This represents a single member object from your API
export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  address: string | null;
  planId: number;
  expiresIn: number;
  plan: Plan;
  startDate: string; 
  endDate: string;   
  createdAt: string; 
  updatedAt: string; 
  image:string | null;

}

// This represents the successful response structure from your API
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

// Parameters for the getMembers request
export interface GetMembersParams {
  page?: number;
  limit?: number;
  planId?:number;
  // Add other possible query parameters here
  [key: string]: string | number | undefined;
}

export interface MemberData {
  name: string;
  email: string;
  phone: string;
  address: string;
  planId: number;
  startDate: Date;
  image:string | null;
}