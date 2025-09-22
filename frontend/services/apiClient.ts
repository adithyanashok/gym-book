import { ApiError } from "@/types/error.type";
import { STORAGE } from "@/utils/storage";
import API_URL from '@/config/env.config'
// const API_BASE_URL = 'http://192.168.1.101:3000';
const API_BASE_URL = 'http://10.0.2.2:3000';

console.log(API_URL);

// Extended options for apiClient with proper typing
interface ApiClientOptions extends RequestInit {
  headers?: HeadersInit;
}

// Generic helper function for API requests with TypeScript
export async function apiClient<T>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = await STORAGE.getData('accessToken')

  const config: RequestInit = {
    headers: {
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  };
  console.log(url)
  console.log(config)
  try {
      const response = await fetch(url, config);

    // Check if the response is successful (status 2xx)
    if (!response.ok) {
      // Try to get error data from response, but handle cases where response isn't JSON
      let errorMessage:ApiError = {error:`HTTP error!`,  statusCode: `${response.status}`, message:"Error Occured!"};
      
      
      try {
        const errorData = await response.json();
        console.log("Error", errorData)
        errorMessage = errorData || errorMessage;
      } catch (parseError) {

        console.log("ParseError", parseError)

        // If response isn't JSON, use status text
        
        errorMessage = {error:response.statusText,  statusCode: `${response.status}`, message: response.statusText};
      }
     
      throw new Error(errorMessage.message, {cause:401});
    }

      


    return await response.json() as T;
    
  } catch (error) {
    console.log("catch", error.message)
    // Re-throw the error to be handled by the caller
    if (error instanceof Error) {
      throw new Error(error.message || 'Network request failed');
    }
    throw new Error('Network request failed');
  }
}
