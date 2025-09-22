import { ApiResponse } from "@/types/member.types"
import { apiClient } from "./apiClient"
import { Admin, LoginOtpResponse } from "@/types/admin.type"

export const adminApi = {
     adminLogin: (phone:string): Promise<ApiResponse<LoginOtpResponse>> => {
        return apiClient("/auth/otp", {
            method:"POST",
            body: JSON.stringify({phoneNumber:phone}),
                headers:{
                    'Content-Type':'application/json'
                }

        })
    },

    verifyOtp: (otp:number, staffId:number): Promise<ApiResponse<Admin>> => {
        return apiClient("/auth/otp-verify", {
            method:"POST",
            body: JSON.stringify({otp, staffId}),
            headers:{
                'Content-Type':'application/json'
            }
        })
    },

    logout: (): Promise<ApiResponse<null>> => {
        
        return apiClient("/auth/logout", {
            method:"POST",
        })
    }
}